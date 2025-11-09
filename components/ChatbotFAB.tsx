'use client';

import React, { useState } from 'react';
import { Bot, X } from 'lucide-react';
import ChatbotWidget from './ChatbotWidget';

export const ChatbotFAB = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleWidget = () => setIsOpen((prev) => !prev);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end space-y-2">
      {isOpen && (
        <div className="mb-3">
          <ChatbotWidget />
        </div>
      )}

      <button
        onClick={toggleWidget}
        className={`p-4 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ease-in-out
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
