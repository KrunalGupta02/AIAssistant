import { useState } from "react";
import { createApiClient } from "./useApi";

// The useConversation hook manages sending and receiving messages in a chat interface. It handles API communication, loading state, and returns AI responses to be displayed in the chat.

export const useConversation = () => {
  const [apiClient] = useState(() => createApiClient());
  const [loading, setLoading] = useState(false);

  const sendMessage = async (currentChat, setChats) => {
    if (!apiClient) {
      return {
        id: Date.now().toString(),
        content:
          "Unable to connect to AI service. Please check your API configuration.",
        isUser: false,
        timestamp: new Date(),
      };
    }

    setLoading(true);

    try {
      // Get all messages from the current chat for context
      const messages = currentChat.messages;
      // Only send the last 10 messages to avoid token limits
      const recentMessages = messages.slice(-10);
      // Get AI response
      const responseText = await apiClient.sendMessage(recentMessages);

      return {
        id: (Date.now() + 1).toString(),
        content: responseText,
        isUser: false,
        timestamp: new Date(),
      };
    } catch (error) {
      console.error("Error sending message:", error);
      return {
        id: (Date.now() + 1).toString(),
        content:
          "Sorry, there was an error communicating with the AI. Please try again.",
        isUser: false,
        timestamp: new Date(),
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    sendMessage,
    loading,
  };
};
