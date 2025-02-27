import { GoogleGenerativeAI } from "@google/generative-ai";

export const createApiClient = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    console.error(
      "API key not found. Please check your environment variables."
    );
    return null;
  }

  // Initialize the Google Generative AI client
  const genAI = new GoogleGenerativeAI(apiKey);

  // Get the generative model instance
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });

  // Generation config matches what you had in your NodeJS example
  const generationConfig = {
    temperature: 0.7,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 1024,
  };

  let chatSession = null;

  return {
    // Send a message to the Gemini API
    sendMessage: async (messages) => {
      try {
        // If this is the first message, we need to start a chat
        if (!chatSession) {
          // Convert the messages array to the format needed for history
          // Important: The first message must be from the user (role: "user")
          const history = [];

          // Only add to history if we have previous messages
          if (messages.length > 1) {
            // Skip any leading model messages to avoid the error
            let startIdx = 0;
            while (
              startIdx < messages.length - 1 &&
              !messages[startIdx].isUser
            ) {
              startIdx++;
            }

            // Add messages to history starting with a user message
            for (let i = startIdx; i < messages.length - 1; i++) {
              history.push({
                role: messages[i].isUser ? "user" : "model",
                parts: [{ text: messages[i].content }],
              });
            }
          }

          // Start a new chat session with any existing history
          chatSession = model.startChat({
            generationConfig,
            history: history.length > 0 ? history : undefined,
          });
        }

        // Get the latest message (the one we're sending now)
        const latestMessage = messages[messages.length - 1];

        // Send the message
        const result = await chatSession.sendMessage(latestMessage.content);

        // Extract the response text
        const responseText = result.response.text();

        return responseText;
      } catch (error) {
        console.error("API Error:", error);

        // Return a user-friendly error message
        if (error.message?.includes("API key")) {
          return "Invalid API key. Please check your API key and try again.";
        } else if (error.status === 429) {
          return "Rate limit exceeded. Please try again later.";
        } else {
          return (
            "Sorry, there was an error communicating with the AI service. " +
            "Details: " +
            (error.message || "Unknown error")
          );
        }
      }
    },

    // Reset the chat session (useful for starting a new conversation)
    resetChat: () => {
      chatSession = null;
    },
  };
};
