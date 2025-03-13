
import React, { useState, useEffect } from 'react';
import { Menu, X, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Track scroll position to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check authentication status when component mounts
  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem('user');
      setIsLoggedIn(!!user);
    };
    
    checkAuth();
    
    // Setup event listener for storage changes (in case of login/logout in another tab)
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <header className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300 px-4 md:px-8",
      isScrolled ? "py-3 bg-white/80 dark:bg-black/80 backdrop-blur-lg shadow-subtle" : "py-5 bg-transparent"
    )}>
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
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
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/#events" className="text-tech-darkGray/80 hover:text-tech-blue transition-colors">Events</Link>
          <Link to="/chat" className="text-tech-darkGray/80 hover:text-tech-blue transition-colors">AI Assistant</Link>
          <Link to="/#networking" className="text-tech-darkGray/80 hover:text-tech-blue transition-colors">Networking</Link>
          
          {isLoggedIn ? (
            <button 
              onClick={handleLogout}
              className="tech-button"
            >
              Log Out
            </button>
          ) : (
            <Link to="/login" className="tech-button">
              Sign In
            </Link>
          )}
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
            <Link 
              to="/#events" 
              className="py-2 text-tech-darkGray/80 hover:text-tech-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Events
            </Link>
            <Link 
              to="/chat" 
              className="py-2 text-tech-darkGray/80 hover:text-tech-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              AI Assistant
            </Link>
            <Link 
              to="/#networking" 
              className="py-2 text-tech-darkGray/80 hover:text-tech-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Networking
            </Link>
            
            {isLoggedIn ? (
              <button 
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="tech-button w-full"
              >
                Log Out
              </button>
            ) : (
              <Link 
                to="/login" 
                className="tech-button w-full flex justify-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
