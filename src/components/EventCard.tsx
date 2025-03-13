
import React from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Event } from '@/utils/eventData';

interface EventCardProps {
  event: Event;
  onClick: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  return (
    <div 
      className="group glass-panel overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
      onClick={onClick}
    >
      {/* Image container with gradient overlay */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        
        {/* Event categories */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {event.categories.slice(0, 2).map((category, index) => (
            <span key={index} className="tag bg-white/80 text-tech-darkGray backdrop-blur-sm">
              {category}
            </span>
          ))}
          {event.categories.length > 2 && (
            <span className="tag bg-white/80 text-tech-darkGray backdrop-blur-sm">
              +{event.categories.length - 2}
            </span>
          )}
        </div>
        
        {/* Event price/free badge */}
        <div className="absolute top-3 right-3">
          <span className={`tag ${event.free ? 'bg-green-500/80' : 'bg-tech-blue/80'} text-white backdrop-blur-sm`}>
            {event.free ? 'Free' : event.price}
          </span>
        </div>
        
        {/* Virtual badge if applicable */}
        {event.virtual && (
          <div className="absolute top-12 right-3">
            <span className="tag bg-purple-500/80 text-white backdrop-blur-sm">
              Virtual
            </span>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-5">
        <h3 className="heading-md text-xl font-bold mb-2 line-clamp-2">{event.title}</h3>
        <p className="text-sm text-tech-darkGray/70 mb-4 line-clamp-2">{event.description}</p>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm text-tech-darkGray/80">
            <Calendar size={16} className="mr-2 flex-shrink-0" />
            <span>{event.date}</span>
          </div>
          
          <div className="flex items-center text-sm text-tech-darkGray/80">
            <MapPin size={16} className="mr-2 flex-shrink-0" />
            <span>{event.location}</span>
          </div>
          
          <div className="flex items-center text-sm text-tech-darkGray/80">
            <Users size={16} className="mr-2 flex-shrink-0" />
            <span>{event.attendees.toLocaleString()} attendees</span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-tech-gray/20">
          <div className="flex justify-between items-center">
            <span className="text-sm text-tech-darkGray/70">
              Organized by <span className="font-medium text-tech-darkGray">{event.organizer}</span>
            </span>
            <span className="text-xs text-tech-blue">
              View Details →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
