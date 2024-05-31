"use client";

// Final Version
import React, { useEffect, useState } from "react";
import { useChat } from "ai/react";
import { start } from "repl";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes"
// import Nav from "@/components/nav";
// import Hero from "@/components/hero";
// import AnimatedLogoCloud from "@/components/logo";
// import Features from "@/components/features";

// export const maxDuration = 300;

export default function ChatbotPage() {
  const { messages, input, handleInputChange, handleSubmit, stop, isLoading } =
    useChat();

  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);

  const { theme } = useTheme(); // Use the theme

  useEffect(() => {
    // Simply toggle the state to show the welcome message without altering the useChat messages.
    setShowWelcomeMessage(true);
  }, []);

  

  return (
    <>
    <div className="absolute top-[10%] left-0 w-full items-center justify-center min-h-screen bg-transparent">
      
      <div className="flex flex-col items-center w-full px-4">
        <div className="w-full max-w-4xl lg:max-w-6xl sm:max-w-2xl md:max-w-2xl shadow-2xl rounded-lg bg-white">
          {/* <div className="flex items-center justify-between p-6 bg-black rounded-t-lg shadow"> */}
          <div className={`flex items-center justify-between p-6 ${theme === 'dark' ? 'bg-white' : 'bg-black'} rounded-t-lg shadow`}> 
            {/* <h1 className="text-xl md:text-2xl lg:text-xl font-bold"> */}
            <h1 className={`text-xl md:text-2xl lg:text-xl font-bold ${theme === 'dark' ? 'text-black' : 'text-white'}`}>
              Chatbot
            </h1>
          </div>
          <div className="flex flex-col p-6 space-y-4 overflow-y-auto h-96 md:h-auto md:max-h-96 text-black">
            {showWelcomeMessage && (
              <div className="max-w-2xl px-4 py-2 rounded-2xl shadow bg-black mr-auto text-white">
                <span>Hii</span>
              </div>
            )}
            {messages.map((m) => (
              <div
                key={m.id}
                className={`max-w-full px-4 py-2 rounded-2xl shadow ${
                  m.role === "user"
                    ? "bg-blue-500 text-white self-end"
                    : "bg-black self-start text-white"
                }`}
              >
                <span>{m.content}</span>
              </div>
            ))}
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex p-6 border-t items-center bg-gray-50 rounded-b-lg w-full flex-wrap"
          >
            <input
              className="flex-1 p-2 mr-4 text-gray-700 border border-gray-300 rounded-2xl shadow-sm focus:ring-blue-500 focus:border-blue-500 w-full md:w-auto bg-white"
              value={input}
              placeholder="Type your message..."
              onChange={handleInputChange}
            />
            <Button
              type="submit"
              className="px-6 py-2 text-white bg-black rounded-2xl shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-black-500 focus:ring-opacity-50 mt-2 w-full md:w-auto md:mt-0"
            >
              Send
            </Button>
            {isLoading && (
              <button
                type="button"
                onClick={stop}
                className="ml-2 text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white rounded-2xl px-6 py-2 transition-colors duration-150 mt-2 w-full md:w-auto md:mt-0"
              >
                Stop
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
    </>
  );
}

