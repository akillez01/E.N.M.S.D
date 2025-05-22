import React, { useEffect, useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Video {
  id: string;
  title: string;
  description: string;
  youtube_id: string;
  thumbnail: string;
  category: string;
  has_subtitles: boolean;
  has_audio_description: boolean;
}

const GalleryPage = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVideos(data || []);
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = Array.from(new Set(videos.map(video => video.category))).filter(Boolean);

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-24 pb-16 bg-cream dark:bg-dark-green min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-serif font-bold text-dark-green dark:text-light-cream mb-8">
          Acervo Audiovisual
        </h1>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-green/50 dark:text-light-cream/50" />
            <input
              type="text"
              placeholder="Buscar vídeos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-md bg-white dark:bg-medium-green/20 border border-light-green/20 dark:border-medium-green/20"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-green/50 dark:text-light-cream/50" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-md bg-white dark:bg-medium-green/20 border border-light-green/20 dark:border-medium-green/20"
            >
              <option value="">Todas as categorias</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-light-green mx-auto"></div>
          </div>
        ) : filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map(video => (
              <div key={video.id} className="bg-white dark:bg-medium-green/20 rounded-lg overflow-hidden shadow-md">
                <div className="aspect-video relative group">
                  <img
                    src={video.thumbnail || `https://img.youtube.com/vi/${video.youtube_id}/maxresdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-dark-green/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <a
                      href={`https://www.youtube.com/watch?v=${video.youtube_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-light-green text-dark-green px-4 py-2 rounded-md hover:bg-medium-green transition-colors"
                    >
                      Assistir
                    </a>
                  </div>
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-bold text-dark-green dark:text-light-cream mb-2">
                    {video.title}
                  </h2>
                  <p className="text-dark-green/70 dark:text-light-cream/70 mb-4 line-clamp-2">
                    {video.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {video.category && (
                      <span className="px-2 py-1 bg-light-green/10 dark:bg-spiritual-purple/20 text-earth-brown dark:text-light-cream text-sm rounded-full">
                        {video.category}
                      </span>
                    )}
                    {video.has_subtitles && (
                      <span className="px-2 py-1 bg-light-green/10 dark:bg-spiritual-purple/20 text-earth-brown dark:text-light-cream text-sm rounded-full">
                        Legendado
                      </span>
                    )}
                    {video.has_audio_description && (
                      <span className="px-2 py-1 bg-light-green/10 dark:bg-spiritual-purple/20 text-earth-brown dark:text-light-cream text-sm rounded-full">
                        Audiodescrição
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-dark-green/70 dark:text-light-cream/70">
            Nenhum vídeo encontrado com os filtros selecionados.
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryPage;