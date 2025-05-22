import React from 'react';
import { Calendar, Clock } from 'lucide-react';
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

interface VideoPreviewProps {
  video: Video;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ video }) => {
  const formattedDate = new Date(video.date).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Link 
      to={`/gallery/${video.id}`}
      className="group flex gap-4 bg-light-green/5 dark:bg-medium-green/5 hover:bg-light-green/10 dark:hover:bg-medium-green/10 rounded-lg p-2 transition-colors duration-200"
    >
      <div className="w-32 h-20 flex-shrink-0 rounded overflow-hidden relative">
        <img 
          src={video.thumbnail} 
          alt="" 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-dark-green/20 group-hover:bg-dark-green/0 transition-colors duration-200"></div>
      </div>
      
      <div className="flex-1">
        <h3 className="font-medium text-dark-green dark:text-light-cream mb-1 line-clamp-2">
          {video.title}
        </h3>
        <div className="flex items-center gap-3 text-xs text-dark-green/70 dark:text-light-cream/70">
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {formattedDate}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {video.duration}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default VideoPreview;