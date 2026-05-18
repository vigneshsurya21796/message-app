import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { Loader2 } from "lucide-react";

const formatTime = (dateStr) =>
  new Date(dateStr).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

export default function ChatWindow() {
  const { messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages } =
    useChatStore();
  const { authUser } = useAuthStore();
  const bottomRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToMessages();
    }
    return () => unsubscribeFromMessages();
  }, [selectedUser?._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col bg-[#070b14]">
        <ChatHeader />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-5 h-5 text-sky-500 animate-spin" />
        </div>
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#070b14]">
      <ChatHeader />

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <p className="text-xs text-slate-600">No messages yet — say hello!</p>
          </div>
        )}

        {messages.map((msg) => {
          const isSent = msg.senderId === authUser._id;
          return (
            <div key={msg._id} className={`flex gap-2.5 ${isSent ? "flex-row-reverse" : "flex-row"}`}>
              {/* Avatar */}
              <img
                src={
                  isSent
                    ? authUser.profilePic ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(authUser.fullName)}&background=0ea5e9&color=fff&size=64`
                    : selectedUser.profilePic ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedUser.fullName)}&background=0ea5e9&color=fff&size=64`
                }
                alt="avatar"
                className="w-7 h-7 rounded-full object-cover shrink-0 mt-1"
              />

              {/* Content */}
              <div className={`flex flex-col gap-1 max-w-[65%] ${isSent ? "items-end" : "items-start"}`}>
                {msg.image && (
                  <img
                    src={msg.image}
                    alt="attachment"
                    className="max-w-xs rounded-xl border border-[#1e2d40]"
                  />
                )}
                {msg.text && (
                  <div
                    className={`px-4 py-2.5 text-sm leading-relaxed ${
                      isSent
                        ? `rounded-2xl rounded-br-none text-white ${msg._pending ? "bg-sky-500/50" : "bg-sky-500"}`
                        : "bg-[#131f30] text-slate-200 rounded-2xl rounded-bl-none border border-[#1e2d40]"
                    }`}
                  >
                    {msg.text}
                  </div>
                )}
                <p className="text-[11px] text-slate-600 px-1">{formatTime(msg.createdAt)}</p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <MessageInput />
    </div>
  );
}
