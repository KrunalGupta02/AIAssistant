import React, { useEffect, useRef } from "react";
import { Send } from "lucide-react";

function ChatInput({
  currentMessage,
  setCurrentMessage,
  onSendMessage,
  loading,
}) {
  const textareaRef = useRef(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "60px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = Math.min(scrollHeight, 200) + "px";
    }
  }, [currentMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentMessage.trim() || loading) return;
    onSendMessage(currentMessage);
    setCurrentMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="p-4 border-t border-gray-200 bg-white shadow-lg">
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <textarea
          ref={textareaRef}
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="w-full p-4 pr-12 border border-gray-300 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent min-h-[60px] max-h-[200px] text-gray-700"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={!currentMessage.trim() || loading}
          className={`absolute right-3 p-2 rounded-full flex items-center justify-center transition-all duration-200 ${
            currentMessage.trim() && !loading
              ? "bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105"
              : "bg-gray-200 text-gray-400"
          }`}
          aria-label="Send message"
        >
          <Send size={20} className={loading ? "animate-pulse" : ""} />
        </button>

        {/* {loading && (
          <div className="absolute left-4 -top-6 text-sm text-indigo-600 font-medium">
            AI is typing...
          </div>
        )} */}
      </form>
    </div>
  );
}

export default ChatInput;
