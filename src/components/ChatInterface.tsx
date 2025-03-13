
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Bot, User, Info, HelpCircle } from 'lucide-react';
import { chatbotResponses } from '@/utils/eventData';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ChatInterfaceProps {
  initialQuery?: string;
}

const ChatInterface = ({ initialQuery = '' }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI assistant for tech events. Ask me anything about finding events, registration processes, or networking opportunities.',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState(initialQuery);
  const [isThinking, setIsThinking] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle initial query if provided
  useEffect(() => {
    if (initialQuery) {
      handleSendMessage();
    }
  }, []);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsThinking(true);
    
    // Simulate AI processing
    setTimeout(() => {
      let botResponse = 'I don\'t have specific information about that. Could you provide more details about what you\'re looking for?';
      
      const lowerCaseInput = inputValue.toLowerCase();
      
      // Check for GTC registration questions
      if (lowerCaseInput.includes('nvidia') && lowerCaseInput.includes('apply') || 
          lowerCaseInput.includes('gtc') && lowerCaseInput.includes('register')) {
        botResponse = chatbotResponses.eventApplication['NVIDIA GTC'];
      }
      // Check for AI Summit registration questions
      else if (lowerCaseInput.includes('ai summit') && lowerCaseInput.includes('register')) {
        botResponse = chatbotResponses.eventApplication['AI Summit'];
      }
      // Check for Tensorflow registration questions
      else if (lowerCaseInput.includes('tensorflow') && lowerCaseInput.includes('register')) {
        botResponse = chatbotResponses.eventApplication['TensorFlow Dev Summit'];
      }
      // Check for GTC preparation questions
      else if (lowerCaseInput.includes('prepare') && (lowerCaseInput.includes('nvidia') || lowerCaseInput.includes('gtc'))) {
        botResponse = chatbotResponses.eventPreparation['NVIDIA GTC'];
      }
      // Check for AWS preparation questions
      else if (lowerCaseInput.includes('prepare') && lowerCaseInput.includes('aws')) {
        botResponse = chatbotResponses.eventPreparation['AWS re:Invent'];
      }
      // Check for networking questions
      else if (lowerCaseInput.includes('network') || lowerCaseInput.includes('connect') || lowerCaseInput.includes('meet people')) {
        if (lowerCaseInput.includes('microsoft') || lowerCaseInput.includes('build')) {
          botResponse = chatbotResponses.networking['Microsoft Build'];
        } else {
          botResponse = chatbotResponses.networking.general;
        }
      }
      // Search for related events
      else if (lowerCaseInput.includes('find') || lowerCaseInput.includes('search') || lowerCaseInput.includes('looking for')) {
        botResponse = 'I can help you find relevant events! Here are some suggestions based on your interests:\n\n1. NVIDIA GTC - March 18-21, 2024\n2. AI Summit London - June 12-13, 2024\n3. TensorFlow Dev Summit - April 5-6, 2024\n\nWould you like more details about any of these events?';
      }
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: botResponse,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setIsThinking(false);
      setMessages(prev => [...prev, aiMessage]);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="max-w-4xl mx-auto glass-panel h-[600px] flex flex-col">
      {/* Chat header */}
      <div className="flex items-center justify-between p-4 border-b border-tech-gray/20">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-tech-blue/10 flex items-center justify-center mr-3">
            <Bot size={20} className="text-tech-blue" />
          </div>
          <div>
            <h3 className="font-medium">Event Assistant</h3>
            <p className="text-xs text-tech-darkGray/60">AI-powered guide</p>
          </div>
        </div>
        <div className="flex">
          <button className="icon-button" title="Help">
            <HelpCircle size={20} className="text-tech-darkGray/70" />
          </button>
          <button className="icon-button" title="Information">
            <Info size={20} className="text-tech-darkGray/70" />
          </button>
        </div>
      </div>
      
      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[75%] flex ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {message.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-tech-blue/10 flex items-center justify-center mr-3 flex-shrink-0">
                    <Bot size={16} className="text-tech-blue" />
                  </div>
                )}
                
                {message.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-tech-gray flex items-center justify-center ml-3 flex-shrink-0">
                    <User size={16} className="text-tech-darkGray" />
                  </div>
                )}
                
                <div 
                  className={`rounded-2xl p-3 ${
                    message.sender === 'user' 
                      ? 'bg-tech-blue text-white' 
                      : 'bg-tech-gray/30 text-tech-darkGray'
                  }`}
                >
                  <div className="whitespace-pre-line">{message.content}</div>
                  <div 
                    className={`text-xs mt-1 ${
                      message.sender === 'user' 
                        ? 'text-white/70 text-right' 
                        : 'text-tech-darkGray/50'
                    }`}
                  >
                    {formatTimestamp(message.timestamp)}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isThinking && (
            <div className="flex justify-start">
              <div className="max-w-[75%] flex flex-row">
                <div className="w-8 h-8 rounded-full bg-tech-blue/10 flex items-center justify-center mr-3">
                  <Bot size={16} className="text-tech-blue" />
                </div>
                <div className="rounded-2xl p-4 bg-tech-gray/30 text-tech-darkGray/70">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-tech-darkGray/40 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-tech-darkGray/40 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-tech-darkGray/40 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messageEndRef} />
        </div>
      </div>
      
      {/* Input area */}
      <div className="border-t border-tech-gray/20 p-4">
        <div className="flex items-center">
          <button className="icon-button mr-2">
            <Mic size={20} className="text-tech-darkGray/70" />
          </button>
          <div className="flex-1">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about tech events, registration processes, or networking..."
              className="w-full glass-input resize-none h-12 py-3"
              rows={1}
            />
          </div>
          <button 
            className={`icon-button ml-2 ${inputValue.trim() ? 'bg-tech-blue text-white' : ''}`}
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
          >
            <Send size={20} />
          </button>
        </div>
        <div className="mt-2 text-xs text-tech-darkGray/60 text-center">
          <p>Try asking: "How do I register for NVIDIA GTC?" or "Tips for networking at tech events"</p>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
