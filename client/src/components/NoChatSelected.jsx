import { MessageSquare } from "lucide-react";

export default function NoChatSelected() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-[#070b14] gap-3">
      <div className="w-16 h-16 rounded-2xl bg-[#0e1623] border border-[#1e2d40] flex items-center justify-center">
        <MessageSquare className="w-7 h-7 text-slate-700" />
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-slate-400">No conversation selected</p>
        <p className="text-xs text-slate-600 mt-1">Pick a contact from the sidebar to start chatting</p>
      </div>
    </div>
  );
}
