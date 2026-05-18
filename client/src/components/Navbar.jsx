import { Link } from "react-router-dom";
import { Zap, UserCircle, LogOut } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

export default function Navbar() {
  const { authUser, logout } = useAuthStore();

  return (
    <header className="h-14 border-b border-[#1e2d40] bg-[#0a0f1c] flex items-center px-5 shrink-0">
      <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity mr-auto">
        <div className="w-7 h-7 bg-sky-500 rounded-md flex items-center justify-center">
          <Zap className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="font-semibold text-slate-200 text-sm">Message</span>
      </Link>

      {authUser && (
        <div className="flex items-center gap-1">
          <Link
            to="/profile"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-500 hover:text-slate-300 hover:bg-[#131f30] rounded-lg transition-colors duration-150"
          >
            <UserCircle className="w-4 h-4" />
            Profile
          </Link>
          <button
            onClick={logout}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-500 hover:text-slate-300 hover:bg-[#131f30] rounded-lg transition-colors duration-150"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
