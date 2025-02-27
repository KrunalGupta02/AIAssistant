import React from "react";
import { MessageSquare, X, Plus } from "lucide-react";

function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  chats,
  activeChat,
  onChatSelect,
  onNewChat,
}) {
  return (
    <>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static inset-y-0 left-0 w-full md:w-72 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-30`}
      >
        <div className="flex flex-col h-full bg-gray-800 text-white shadow-xl">
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <button
              onClick={onNewChat}
              className="flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <Plus size={20} className="mr-2" />
              New Chat
            </button>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-2 hover:bg-gray-700 rounded-lg"
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => onChatSelect(chat.id)}
                className={`w-full p-4 text-left hover:bg-gray-700 transition-colors ${
                  activeChat === chat.id ? "bg-gray-700" : ""
                }`}
              >
                <div className="flex items-center">
                  <MessageSquare size={20} className="mr-3" />
                  <span className="truncate">{chat.title}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
