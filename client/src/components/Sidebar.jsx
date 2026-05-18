import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

export default function Sidebar() {
  const { users, getUsers, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers, authUser } = useAuthStore();
  const [search, setSearch] = useState("");

  useEffect(() => { getUsers(); }, [getUsers]);

  const filtered = users.filter((u) =>
    u?.fullName?.toLowerCase().includes(search.toLowerCase())
  );

  const onlineCount = onlineUsers.filter((id) => id !== authUser?._id).length;

  return (
    <aside className="w-64 border-r border-[#1e2d40] bg-[#0a0f1c] flex flex-col shrink-0">
      {/* Header */}
      <div className="p-4 border-b border-[#1e2d40]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-slate-200">Contacts</span>
          <span className="text-xs text-slate-600">{onlineCount} online</span>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-600" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#131f30] border border-[#1e2d40] rounded-lg pl-8 pr-3 py-2 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-sky-500 transition-colors duration-150"
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto py-2">
        {isUsersLoading ? (
          <div className="space-y-1 px-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg animate-pulse">
                <div className="w-9 h-9 bg-[#1e2d40] rounded-full shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-2.5 bg-[#1e2d40] rounded w-24" />
                  <div className="h-2 bg-[#1e2d40] rounded w-14" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-xs text-slate-600 text-center mt-6">No contacts found</p>
        ) : (
          filtered.map((user) => {
            const isOnline = onlineUsers.includes(user._id);
            const isSelected = selectedUser?._id === user._id;

            return (
              <button
                key={user._id}
                onClick={() => setSelectedUser(user)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 mx-1 rounded-lg transition-colors duration-150 text-left ${
                  isSelected
                    ? "bg-[#131f30] border-l-2 border-sky-500 pl-2.5"
                    : "hover:bg-[#0e1623]"
                }`}
                style={{ width: "calc(100% - 8px)" }}
              >
                {/* Avatar */}
                <div className="relative shrink-0">
                  <img
                    src={
                      user.profilePic ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&background=0ea5e9&color=fff&size=64`
                    }
                    alt={user.fullName}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  {isOnline && (
                    <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full ring-2 ring-[#0a0f1c]" />
                  )}
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-200 truncate">{user.fullName}</p>
                  <p className={`text-xs truncate ${isOnline ? "text-green-500" : "text-slate-600"}`}>
                    {isOnline ? "Online" : "Offline"}
                  </p>
                </div>
              </button>
            );
          })
        )}
      </div>

      {/* Current user footer */}
      {authUser && (
        <div className="p-3 border-t border-[#1e2d40] flex items-center gap-2.5">
          <img
            src={
              authUser.profilePic ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(authUser.fullName)}&background=0ea5e9&color=fff&size=64`
            }
            alt="You"
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-slate-300 truncate">{authUser.fullName}</p>
            <p className="text-xs text-green-500">You</p>
          </div>
        </div>
      )}
    </aside>
  );
}
