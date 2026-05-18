import { useRef, useState } from "react";
import { Paperclip, Send, X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";

export default function MessageInput() {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file?.type.startsWith("image/")) { toast.error("Select an image file"); return; }
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    await sendMessage({ text: text.trim(), image: imagePreview });
    setText("");
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="px-5 py-4 border-t border-[#1e2d40] bg-[#0a0f1c] shrink-0">
      {/* Image preview */}
      {imagePreview && (
        <div className="mb-3 relative inline-block">
          <img src={imagePreview} alt="Preview" className="h-16 w-16 object-cover rounded-lg border border-[#1e2d40]" />
          <button
            onClick={removeImage}
            className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#0a0f1c] border border-[#1e2d40] rounded-full flex items-center justify-center hover:bg-[#131f30] transition-colors"
          >
            <X className="w-3 h-3 text-slate-400" />
          </button>
        </div>
      )}

      <form onSubmit={handleSend} className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-2 text-slate-600 hover:text-sky-400 hover:bg-[#131f30] rounded-lg transition-colors duration-150 shrink-0"
        >
          <Paperclip className="w-4 h-4" />
        </button>
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />

        <input
          type="text"
          placeholder="Write a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) handleSend(e); }}
          className="flex-1 bg-[#131f30] border border-[#1e2d40] rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-sky-500 transition-colors duration-150"
        />

        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className="p-2.5 bg-sky-500 hover:bg-sky-400 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-150 shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
