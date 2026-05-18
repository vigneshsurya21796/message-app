import { X, Phone, Video } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

export default function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser?._id);

  return (
    <div className="h-14 px-5 border-b border-[#1e2d40] flex items-center gap-3 bg-[#0a0f1c] shrink-0">
      {/* Avatar */}
      <div className="relative">
        <img
          src={
            selectedUser?.profilePic ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedUser?.fullName)}&background=0ea5e9&color=fff&size=64`
          }
          alt={selectedUser?.fullName}
          className="w-8 h-8 rounded-full object-cover"
        />
        {isOnline && (
          <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full ring-2 ring-[#0a0f1c]" />
        )}
      </div>

      {/* Name */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-200 truncate">{selectedUser?.fullName}</p>
        <p className={`text-xs ${isOnline ? "text-green-500" : "text-slate-600"}`}>
          {isOnline ? "Active now" : "Offline"}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        <button className="p-2 text-slate-600 hover:text-slate-300 hover:bg-[#131f30] rounded-lg transition-colors duration-150">
          <Phone className="w-4 h-4" />
        </button>
        <button className="p-2 text-slate-600 hover:text-slate-300 hover:bg-[#131f30] rounded-lg transition-colors duration-150">
          <Video className="w-4 h-4" />
        </button>
        <button
          onClick={() => setSelectedUser(null)}
          className="p-2 text-slate-600 hover:text-slate-300 hover:bg-[#131f30] rounded-lg transition-colors duration-150"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
