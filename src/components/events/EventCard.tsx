import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
}

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const eventDate = new Date(event.date);
  
  const formattedDate = eventDate.toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const formattedTime = eventDate.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <Link 
      to={`/events/${event.id}`}
      className="group flex flex-col overflow-hidden rounded-lg shadow-md bg-white dark:bg-dark-green/50 hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={event.image} 
          alt="" 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-green/70 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-4 text-light-cream">
          <h3 className="text-xl font-bold mb-1">{event.title}</h3>
          
          <div className="flex items-center gap-1 text-sm">
            <Calendar size={14} className="text-light-green" />
            <time dateTime={event.date}>{formattedDate} às {formattedTime}</time>
          </div>
        </div>
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-start gap-1 mb-3 text-sm text-dark-green/80 dark:text-light-cream/80">
          <MapPin size={16} className="text-earth-brown dark:text-spiritual-purple flex-shrink-0 mt-0.5" />
          <span>{event.location}</span>
        </div>
        
        <p className="text-dark-green/90 dark:text-light-cream/90 text-sm mb-4 line-clamp-3">
          {event.description}
        </p>
        
        <div className="mt-auto">
          <span className="inline-block px-4 py-2 bg-light-green/10 dark:bg-spiritual-purple/20 text-earth-brown dark:text-light-cream rounded-full text-sm font-medium group-hover:bg-light-green/20 dark:group-hover:bg-spiritual-purple/30 transition-colors duration-200">
            Ver detalhes
          </span>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;