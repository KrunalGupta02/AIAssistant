import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ChatMessages from "./components/ChatMessage";
import ChatInput from "./components/ChatInput";
import { useConversation } from "./hooks/useConversations";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");

  const [chats, setChats] = useState([
    {
      id: "1",
      title: "Getting Started",
      messages: [
        {
          id: "1",
          content: "Hello! How can I help you today?",
          isUser: false,
          timestamp: new Date(),
        },
      ],
      timestamp: new Date(),
    },
  ]);

  const [activeChat, setActiveChat] = useState(chats[0].id);
  const { sendMessage, loading } = useConversation();

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      content: currentMessage,
      isUser: true,
      timestamp: new Date(),
    };

    // First, update UI with user message
    const updatedChats = chats.map((chat) =>
      chat.id === activeChat
        ? {
            ...chat,
            messages: [...chat.messages, newMessage],
            timestamp: new Date(),
          }
        : chat
    );

    setChats(updatedChats);
    setCurrentMessage("");

    // Get current chat with the new user message
    const currentChat = updatedChats.find((chat) => chat.id === activeChat);

    // Then, get AI response
    const aiResponse = await sendMessage(currentChat, setChats);

    // Update chats with AI response
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === activeChat
          ? {
              ...chat,
              messages: [...chat.messages, aiResponse],
            }
          : chat
      )
    );
  };

  const createNewChat = () => {
    const newChat = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [
        {
          id: Date.now().toString(),
          content: "Hello! How can I help you today?",
          isUser: false,
          timestamp: new Date(),
        },
      ],
      timestamp: new Date(),
    };
    setChats((prev) => [newChat, ...prev]);
    setActiveChat(newChat.id);
    setSidebarOpen(false);
  };

  const handleChatSelect = (chatId) => {
    setActiveChat(chatId);
    setSidebarOpen(false);
  };

  const getCurrentChat = () => chats.find((chat) => chat.id === activeChat);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        chats={chats}
        activeChat={activeChat}
        onChatSelect={handleChatSelect}
        onNewChat={createNewChat}
      />

      <div className="flex-1 flex flex-col h-screen">
        <Header setSidebarOpen={setSidebarOpen} />
        <ChatMessages messages={getCurrentChat()?.messages} loading={loading} />
        <ChatInput
          currentMessage={currentMessage}
          setCurrentMessage={setCurrentMessage}
          onSendMessage={handleSendMessage}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default App;
