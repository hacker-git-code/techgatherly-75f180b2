
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import ChatInterface from '@/components/ChatInterface';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const Chat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchQuery = new URLSearchParams(location.search).get('query') || '';
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate('/login');
      }
      setIsLoading(false);
    };
    
    checkAuth();
  }, [navigate]);
  
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
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
