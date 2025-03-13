
import React, { useEffect, useRef } from 'react';
import { Event } from '@/utils/eventData';
import { X, Calendar, MapPin, Users, Clock, ExternalLink, Share2, Heart } from 'lucide-react';

interface EventDetailsProps {
  event: Event;
  onClose: () => void;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);
  
  // Handle escape key press
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        ref={modalRef}
        className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-scale-in"
      >
        <div className="relative h-64 md:h-80">
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>
          
          {/* Event title and organizer */}
          <div className="absolute bottom-0 left-0 w-full p-6">
            <div className="flex flex-wrap gap-2 mb-3">
              {event.categories.map((category, index) => (
                <span key={index} className="tag bg-white/20 text-white backdrop-blur-sm">
                  {category}
                </span>
              ))}
              {event.virtual && (
                <span className="tag bg-purple-500/80 text-white backdrop-blur-sm">
                  Virtual
                </span>
              )}
              <span className={`tag ${event.free ? 'bg-green-500/80' : 'bg-tech-blue/80'} text-white backdrop-blur-sm`}>
                {event.free ? 'Free' : event.price}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{event.title}</h2>
            <p className="text-white/80">Organized by {event.organizer}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          <div className="md:col-span-2">
            <h3 className="text-xl font-semibold mb-4">About this event</h3>
            <p className="text-tech-darkGray/80 mb-6">{event.description}</p>
            
            <h3 className="text-xl font-semibold mb-4">Registration Details</h3>
            <div className="bg-tech-gray/30 rounded-xl p-4 mb-6">
              <div className="flex items-center mb-3">
                <Clock size={20} className="text-tech-darkGray/70 mr-3" />
                <div>
                  <p className="text-sm text-tech-darkGray/70">Registration Deadline</p>
                  <p className="font-medium">{event.registrationDeadline}</p>
                </div>
              </div>
              <a 
                href={event.registrationUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="tech-button inline-flex items-center w-full justify-center"
              >
                Register Now <ExternalLink size={16} className="ml-2" />
              </a>
            </div>
            
            <h3 className="text-xl font-semibold mb-4">Ask AI Assistant</h3>
            <div className="bg-tech-gray/30 rounded-xl p-4 mb-6">
              <p className="text-sm text-tech-darkGray/80 mb-3">
                Want to know more about {event.title}? Ask our AI Assistant about registration process, event details, or networking opportunities.
              </p>
              <button className="tech-button w-full">Chat with AI Assistant</button>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="glass-panel p-5">
              <h3 className="font-semibold mb-3">Event Information</h3>
              
              <div className="space-y-4">
                <div className="flex">
                  <Calendar size={20} className="text-tech-darkGray/70 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-tech-darkGray/70">Date and Time</p>
                    <p className="font-medium">{event.date}</p>
                  </div>
                </div>
                
                <div className="flex">
                  <MapPin size={20} className="text-tech-darkGray/70 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-tech-darkGray/70">Location</p>
                    <p className="font-medium">{event.location}</p>
                  </div>
                </div>
                
                <div className="flex">
                  <Users size={20} className="text-tech-darkGray/70 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-tech-darkGray/70">Attendees</p>
                    <p className="font-medium">{event.attendees.toLocaleString()} people</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass-panel p-5">
              <h3 className="font-semibold mb-3">Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="subtle-button flex items-center justify-center py-2">
                  <Heart size={18} className="mr-2" /> Save
                </button>
                <button className="subtle-button flex items-center justify-center py-2">
                  <Share2 size={18} className="mr-2" /> Share
                </button>
              </div>
            </div>
            
            <div className="glass-panel p-5">
              <h3 className="font-semibold mb-3">Find Similar Events</h3>
              <div className="space-y-2">
                {event.categories.map((category, index) => (
                  <a 
                    key={index}
                    href="#"
                    className="block py-2 px-3 rounded-lg hover:bg-tech-gray/50 transition-colors text-tech-darkGray/80 hover:text-tech-darkGray"
                  >
                    {category} Events
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
