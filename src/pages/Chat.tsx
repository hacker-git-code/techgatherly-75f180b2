
import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import ChatInterface from '@/components/ChatInterface';
import { useLocation } from 'react-router-dom';

const Chat = () => {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('query') || '';
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24 px-4">
        <div className="container mx-auto">
          <h1 className="heading-lg text-center mb-8">AI Event Assistant</h1>
          <p className="body-md text-tech-darkGray/80 text-center max-w-2xl mx-auto mb-12">
            Ask about event registration, get preparation tips, or discover networking 
            opportunities with our AI assistant.
          </p>
          <ChatInterface initialQuery={searchQuery} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
