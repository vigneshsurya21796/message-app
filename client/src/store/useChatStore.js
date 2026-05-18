import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load contacts");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();

    // Optimistic update — add a temp message immediately
    const tempId = `temp-${Date.now()}`;
    const optimisticMsg = {
      _id: tempId,
      senderId: useAuthStore.getState().authUser._id,
      receiverId: selectedUser._id,
      text: messageData.text,
      image: messageData.image || null,
      createdAt: new Date().toISOString(),
      _pending: true,   // flag so we can style it differently
    };

    set({ messages: [...messages, optimisticMsg] });

    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      // Replace the optimistic message with the real one from server
      set({
        messages: get().messages.map((m) => (m._id === tempId ? res.data : m)),
      });
    } catch (error) {
      // Revert — remove the optimistic message and show error
      set({ messages: get().messages.filter((m) => m._id !== tempId) });
      toast.error(error.response?.data?.message || "Failed to send — check your connection");
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    socket?.on("newMessage", (message) => {
      if (message.senderId !== selectedUser._id) return;
      set({ messages: [...get().messages, message] });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket?.off("newMessage");
  },

  setSelectedUser: (user) => set({ selectedUser: user }),
}));
