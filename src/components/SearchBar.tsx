
import React, { useState } from 'react';
import { Search, Globe, Calendar } from 'lucide-react';

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
    // In a real app, this would trigger a search
  };

  return (
    <div className={`glass-panel transition-all duration-300 ${isFocused ? 'shadow-lg' : 'shadow-subtle'}`}>
      <form onSubmit={handleSubmit} className="flex items-center p-1">
        <div className="flex-1 flex items-center px-3">
          <Search size={20} className="text-tech-darkGray/50 mr-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search for events, topics, or technologies..."
            className="w-full py-3 bg-transparent border-none focus:outline-none text-tech-darkGray"
          />
        </div>
        
        <div className="hidden md:flex items-center border-l border-tech-gray/30 px-3">
          <Globe size={20} className="text-tech-darkGray/50 mr-2" />
          <select className="bg-transparent border-none focus:outline-none text-tech-darkGray py-3 pr-8 appearance-none cursor-pointer">
            <option value="all">All Locations</option>
            <option value="online">Virtual Only</option>
            <option value="in-person">In-Person Only</option>
            <option value="north-america">North America</option>
            <option value="europe">Europe</option>
            <option value="asia">Asia</option>
          </select>
        </div>
        
        <div className="hidden md:flex items-center border-l border-tech-gray/30 px-3">
          <Calendar size={20} className="text-tech-darkGray/50 mr-2" />
          <select className="bg-transparent border-none focus:outline-none text-tech-darkGray py-3 pr-8 appearance-none cursor-pointer">
            <option value="all">Any Time</option>
            <option value="upcoming">Upcoming</option>
            <option value="this-month">This Month</option>
            <option value="next-month">Next Month</option>
            <option value="this-quarter">This Quarter</option>
            <option value="this-year">This Year</option>
          </select>
        </div>
        
        <button 
          type="submit" 
          className="ml-2 px-6 py-3 rounded-full bg-tech-blue text-white font-medium hover:bg-tech-blue/90 transition-all duration-300"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
