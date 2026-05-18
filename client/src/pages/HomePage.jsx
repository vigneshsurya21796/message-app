import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import NoChatSelected from "../components/NoChatSelected";
import ConnectionBanner from "../components/ConnectionBanner";
import { useChatStore } from "../store/useChatStore";

export default function HomePage() {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen flex flex-col bg-[#070b14]">
      <Navbar />
      <ConnectionBanner />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        {selectedUser ? <ChatWindow /> : <NoChatSelected />}
      </div>
    </div>
  );
}
