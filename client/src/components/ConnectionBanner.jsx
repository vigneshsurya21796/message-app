import { useAuthStore } from "../store/useAuthStore";
import { WifiOff } from "lucide-react";

export default function ConnectionBanner() {
  const { socket, socketConnected, authUser } = useAuthStore();

  // Only show when logged in and socket exists but is disconnected
  if (!authUser || !socket || socketConnected) return null;

  return (
    <div className="flex items-center justify-center gap-2 px-4 py-2 bg-amber-500/10 border-b border-amber-500/20 text-amber-400 text-xs">
      <WifiOff className="w-3.5 h-3.5 shrink-0" />
      <span>Connection lost — attempting to reconnect...</span>
      <div className="w-3 h-3 border border-amber-400 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
