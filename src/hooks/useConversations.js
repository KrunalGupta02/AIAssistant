import { useState, useCallback } from "react";
import { createApiClient } from "./useApi";

export const useConversation = () => {
  const [apiClient] = useState(() => createApiClient());
  const [loading, setLoading] = useState(false);

  const sendMessage = useCallback(
    async (currentChat, setChats) => {
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

        const aiResponse = {
          id: (Date.now() + 1).toString(),
          content: responseText,
          isUser: false,
          timestamp: new Date(),
        };

        return aiResponse;
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
    },
    [apiClient]
  );

  return {
    sendMessage,
    loading,
  };
};
