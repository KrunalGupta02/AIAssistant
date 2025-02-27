import React, { useRef, useEffect } from "react";
import { MarkdownRenderer } from "../utils/markdownUtils";

function ChatMessages({ messages, loading }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages?.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-[80%] p-4 rounded-lg ${
              message.isUser
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-800"
            } shadow`}
          >
            {message.isUser ? (
              <div className="whitespace-pre-wrap">{message.content}</div>
            ) : (
              <div className="markdown-content">
                <MarkdownRenderer content={message.content} />
              </div>
            )}
          </div>
        </div>
      ))}

      {loading && (
        <div className="flex justify-start">
          <div className="max-w-[80%] p-4 rounded-lg bg-white text-gray-800 shadow">
            <div className="flex space-x-2">
              <div
                className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                style={{ animationDelay: "0ms" }}
              ></div>
              <div
                className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                style={{ animationDelay: "200ms" }}
              ></div>
              <div
                className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                style={{ animationDelay: "400ms" }}
              ></div>
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}

export default ChatMessages;
