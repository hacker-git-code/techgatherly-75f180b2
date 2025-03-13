
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { SearchBar } from './SearchBar';

const Hero = () => {
  const scrollToEvents = () => {
    const eventsSection = document.getElementById('events');
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-tech-gray/50 to-white -z-10"></div>
      
      {/* Animated circles */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-tech-blue/5 rounded-full filter blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-tech-lightBlue/5 rounded-full filter blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      
      <div className="container mx-auto max-w-4xl">
        <div className="inline-block animate-fade-in">
          <span className="tag bg-tech-lightBlue/10 text-tech-blue px-3 py-1 rounded-full text-sm font-medium">
            AI-Powered Event Discovery
          </span>
        </div>
        
        <h1 className="heading-xl mt-6 mb-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
          Discover and Connect at <span className="text-tech-blue">Tech Events</span> Worldwide
        </h1>
        
        <p className="body-lg text-tech-darkGray/80 max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '200ms' }}>
          Let our AI assistant guide you to the perfect tech and AI events, provide registration details, and help you network with like-minded professionals.
        </p>
        
        <div className="w-full max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '300ms' }}>
          <SearchBar />
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 animate-slide-up" style={{ animationDelay: '400ms' }}>
          <button className="tech-button flex items-center justify-center">
            <span>Start Chatting with AI</span>
          </button>
          <button className="subtle-button flex items-center justify-center" onClick={scrollToEvents}>
            <span>Browse Events</span>
          </button>
        </div>
      </div>
      
      {/* Scroll down indicator */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
        onClick={scrollToEvents}
      >
        <ChevronDown className="text-tech-darkGray/50" size={32} />
      </div>
    </div>
  );
};

export default Hero;
