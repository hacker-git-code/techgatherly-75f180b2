
import React, { useState, useEffect } from 'react';
import { Menu, X, Search, Globe, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300 px-4 md:px-8",
      isScrolled ? "py-3 bg-white/80 dark:bg-black/80 backdrop-blur-lg shadow-subtle" : "py-5 bg-transparent"
    )}>
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-tech-blue to-tech-lightBlue flex items-center justify-center text-white font-bold text-lg">
              T
            </div>
            <span className={cn(
              "font-bold text-xl tracking-tight transition-all",
              isScrolled ? "text-tech-darkGray" : "text-tech-darkGray"
            )}>
              TechGatherly
            </span>
          </div>
        </a>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#events" className="text-tech-darkGray/80 hover:text-tech-blue transition-colors">Events</a>
          <a href="#assistant" className="text-tech-darkGray/80 hover:text-tech-blue transition-colors">AI Assistant</a>
          <a href="#networking" className="text-tech-darkGray/80 hover:text-tech-blue transition-colors">Networking</a>
          <button className="tech-button">
            Sign In
          </button>
        </nav>

        {/* Mobile menu button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="md:hidden p-2 rounded-full hover:bg-tech-gray/20 transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-md animate-slide-down">
          <div className="container mx-auto py-4 px-6 flex flex-col space-y-4">
            <a 
              href="#events" 
              className="py-2 text-tech-darkGray/80 hover:text-tech-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Events
            </a>
            <a 
              href="#assistant" 
              className="py-2 text-tech-darkGray/80 hover:text-tech-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              AI Assistant
            </a>
            <a 
              href="#networking" 
              className="py-2 text-tech-darkGray/80 hover:text-tech-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Networking
            </a>
            <button className="tech-button w-full">
              Sign In
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
