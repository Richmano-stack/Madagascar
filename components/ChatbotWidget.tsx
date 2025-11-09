'use client';

import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { ArrowUp, Bot, Loader2, RotateCw } from 'lucide-react';
import { Message } from '@/types/chat';

const BOT_NAME = 'President Historian AI';
const API_ENDPOINT = '/api/ask-president';

export default function ChatbotWidget() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleClearChat = () => {
    setMessages([]);
    setInput('');
    setIsLoading(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const userMessage: Message = { id: Date.now(), content: trimmedInput, sender: 'user' };
    const loadingMessage: Message = { id: Date.now() + 1, content: '...', sender: 'loading' };

    setMessages((prev) => [...prev, userMessage, loadingMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: trimmedInput }),
      });

      if (!res.ok) throw new Error(`API Error: ${res.statusText}`);

      const data = await res.json();
      const aiContent = data.answer || "Sorry, I couldn’t find an answer.";
      
      setMessages((prev) => [
        ...prev.filter((m) => m.sender !== 'loading'),
        { id: Date.now() + 2, content: aiContent, sender: 'ai' },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev.filter((m) => m.sender !== 'loading'),
        { id: Date.now() + 2, content: 'Something went wrong. Try again later.', sender: 'ai' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-[390px] h-[80vh] max-h-[700px] bg-card border border-border/40 rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-3 bg-secondary text-secondary-foreground border-b border-border/40 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bot className="w-4 h-4 text-accent" />
          <h3 className="font-semibold text-sm">{BOT_NAME}</h3>
        </div>
        <button
          onClick={handleClearChat}
          disabled={isLoading || messages.length === 0}
          className="p-1 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground disabled:opacity-50"
          title="Clear Chat"
        >
          <RotateCw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 text-sm bg-background">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground mt-8 p-3 rounded-lg bg-muted/40">
            <Bot className="w-6 h-6 mx-auto mb-2 text-accent" />
            <p className="text-sm font-medium">
              Hello 👋 I’m your Madagascar President Historian.<br />
              Ask me anything about my data!
            </p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] p-2 rounded-lg shadow text-sm ${
                message.sender === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : message.sender === 'loading'
                  ? 'bg-muted text-muted-foreground'
                  : 'bg-secondary text-secondary-foreground'
              }`}
            >
              {message.sender === 'loading' ? (
                <div className="flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin text-accent" />
                  <span className="text-xs">{BOT_NAME} is thinking...</span>
                </div>
              ) : (
                <div className="flex items-start">
                  {message.sender === 'ai' && (
                    <Bot className="w-3 h-3 mt-1 mr-1 flex-shrink-0 text-accent" />
                  )}
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-border/40 bg-secondary flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          className="flex-1 p-2 text-sm rounded-l-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-accent text-accent-foreground p-2 rounded-r-lg hover:bg-accent/80 flex items-center justify-center transition-colors disabled:opacity-50"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowUp className="w-4 h-4" />}
        </button>
      </form>
    </div>
  );
}
