import React from 'react';
import { Calendar, Clock, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  youtubeId: string;
  date: string;
  duration: string;
}

interface FeaturedVideoProps {
  video: Video;
}

const FeaturedVideo: React.FC<FeaturedVideoProps> = ({ video }) => {
  const formattedDate = new Date(video.date).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="group relative overflow-hidden rounded-lg shadow-lg">
      <div className="aspect-video relative">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-green/90 via-dark-green/20 to-transparent"></div>
        
        <Link 
          to={`/gallery/${video.id}`}
          className="absolute inset-0 flex items-center justify-center"
          aria-label={`Assistir vídeo: ${video.title}`}
        >
          <div className="relative">
            <div className="absolute -inset-2 rounded-full bg-light-green/20 animate-ping"></div>
            <PlayCircle size={72} className="text-light-green drop-shadow-lg transition-transform duration-300 group-hover:scale-110" />
          </div>
        </Link>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full p-6">
        <div className="flex items-center gap-4 text-sm text-light-cream/80 mb-2">
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            {formattedDate}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {video.duration}
          </span>
        </div>
        <h3 className="text-2xl font-serif font-bold text-light-cream mb-2">
          {video.title}
        </h3>
        <p className="text-light-cream/90 line-clamp-2">
          {video.description}
        </p>
      </div>
    </div>
  );
};

export default FeaturedVideo;