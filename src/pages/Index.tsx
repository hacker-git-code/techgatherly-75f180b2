
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import EventList from '@/components/EventList';
import { Globe, Users, Calendar, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChatButtonClick = () => {
    navigate('/chat');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <EventList />
      
      {/* Feature section */}
      <section id="networking" className="py-20 px-4 bg-tech-gray/30">
        <div className="container mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="tag inline-block mb-4">Features</span>
            <h2 className="heading-lg mb-4">Everything You Need for Tech Events</h2>
            <p className="body-md text-tech-darkGray/80">
              Our platform helps you discover, prepare for, and make the most of tech events worldwide.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-panel p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-tech-blue/10 flex items-center justify-center mx-auto mb-6">
                <Globe size={32} className="text-tech-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Global Events</h3>
              <p className="text-tech-darkGray/80">
                Discover tech events from around the world, with detailed information and registration links.
              </p>
            </div>
            
            <div className="glass-panel p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-tech-blue/10 flex items-center justify-center mx-auto mb-6">
                <Users size={32} className="text-tech-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Networking</h3>
              <p className="text-tech-darkGray/80">
                Connect with like-minded professionals attending the same events in your region.
              </p>
            </div>
            
            <div className="glass-panel p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-tech-blue/10 flex items-center justify-center mx-auto mb-6">
                <Calendar size={32} className="text-tech-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Event Planning</h3>
              <p className="text-tech-darkGray/80">
                Get AI-powered recommendations for preparing and making the most of your event experience.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <button 
              className="tech-button"
              onClick={handleChatButtonClick}
            >
              Chat with AI Assistant
            </button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 px-4 bg-tech-gray">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-tech-blue to-tech-lightBlue flex items-center justify-center text-white font-bold text-lg">
                  T
                </div>
                <span className="ml-2 font-bold text-xl tracking-tight">TechGatherly</span>
              </div>
              <p className="mt-2 text-sm text-tech-darkGray/70">
                Your AI-powered guide to tech events worldwide
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6">
              <a href="#" className="text-tech-darkGray/80 hover:text-tech-blue transition-colors">Privacy</a>
              <a href="#" className="text-tech-darkGray/80 hover:text-tech-blue transition-colors">Terms</a>
              <a href="#" className="text-tech-darkGray/80 hover:text-tech-blue transition-colors">About</a>
              <a href="#" className="text-tech-darkGray/80 hover:text-tech-blue transition-colors">Contact</a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-tech-gray/40 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-tech-darkGray/60">
              © {new Date().getFullYear()} TechGatherly. All rights reserved.
            </p>
            
            <button 
              onClick={scrollToTop}
              className="mt-4 md:mt-0 p-3 rounded-full bg-white/50 hover:bg-white/80 transition-colors"
              aria-label="Scroll to top"
            >
              <ChevronUp size={20} className="text-tech-darkGray" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
