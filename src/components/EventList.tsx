
import React, { useState } from 'react';
import EventCard from './EventCard';
import EventDetails from './EventDetails';
import { upcomingEvents, Event } from '@/utils/eventData';
import { ChevronLeft, ChevronRight, CalendarDays, Globe, Zap } from 'lucide-react';

const EventList = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'virtual' | 'free'>('all');
  
  const filteredEvents = upcomingEvents.filter(event => {
    if (activeFilter === 'virtual') return event.virtual;
    if (activeFilter === 'free') return event.free;
    return true;
  });

  const openEventDetails = (event: Event) => {
    setSelectedEvent(event);
  };

  const closeEventDetails = () => {
    setSelectedEvent(null);
  };

  return (
    <section id="events" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="tag inline-block mb-4">Browse Events</span>
          <h2 className="heading-lg mb-4">Upcoming Tech & AI Events</h2>
          <p className="body-md text-tech-darkGray/80">
            Discover the most exciting technology events from around the world. Learn, network, and advance your career.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            <button 
              className={`subtle-button flex items-center ${activeFilter === 'all' ? 'bg-tech-blue text-white' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              <CalendarDays size={18} className="mr-2" /> All Events
            </button>
            <button 
              className={`subtle-button flex items-center ${activeFilter === 'virtual' ? 'bg-tech-blue text-white' : ''}`}
              onClick={() => setActiveFilter('virtual')}
            >
              <Globe size={18} className="mr-2" /> Virtual Events
            </button>
            <button 
              className={`subtle-button flex items-center ${activeFilter === 'free' ? 'bg-tech-blue text-white' : ''}`}
              onClick={() => setActiveFilter('free')}
            >
              <Zap size={18} className="mr-2" /> Free Events
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map(event => (
            <EventCard 
              key={event.id} 
              event={event}
              onClick={() => openEventDetails(event)}
            />
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
          <button className="subtle-button flex items-center">
            <ChevronLeft size={18} className="mr-2" /> Previous
          </button>
          <div className="mx-4 flex items-center">
            <span className="text-tech-darkGray">Page 1 of 3</span>
          </div>
          <button className="subtle-button flex items-center">
            Next <ChevronRight size={18} className="ml-2" />
          </button>
        </div>
      </div>
      
      {selectedEvent && (
        <EventDetails 
          event={selectedEvent} 
          onClose={closeEventDetails} 
        />
      )}
    </section>
  );
};

export default EventList;
