'use client';

import React, { useState } from 'react';
import { Bot, X } from 'lucide-react';
import ChatbotWidget from "./ChatbotWidget";

export const ChatbotFAB = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleWidget = () => setIsOpen((prev) => !prev);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end space-y-2">
      {/* Chat widget */}
      {isOpen && (
        <div
          className="
            mb-3 w-[90vw] max-w-[380px] 
            sm:w-80 
            transition-all duration-300
          "
        >
          <ChatbotWidget />
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={toggleWidget}
        className={`p-4 rounded-full shadow-lg flex items-center justify-center transition-all duration-300
          ${isOpen
            ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
            : 'bg-accent text-accent-foreground hover:bg-accent/80'
          }`}
        aria-label={isOpen ? 'Close Chatbot' : 'Open Chatbot'}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
      </button>
    </div>
  );
};
