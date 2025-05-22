import React, { useEffect } from 'react';
import { ArrowRight, PlayCircle, Calendar, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import FeaturedVideo from '../components/home/FeaturedVideo';
import VideoPreview from '../components/home/VideoPreview';
import EventCard from '../components/events/EventCard';

const HomePage: React.FC = () => {
  useEffect(() => {
    document.title = 'Cânticos da Floresta | Preservando a Música do Santo Daime';
  }, []);

  // Mock data for featured videos
  const featuredVideos = [
    {
      id: 'video1',
      title: 'Encontro de Músicos: Hinos da Cura',
      description: 'Gravação do encontro de músicos realizado na floresta amazônica, com foco nos hinos tradicionais de cura do Santo Daime.',
      thumbnail: 'https://images.pexels.com/photos/1647372/pexels-photo-1647372.jpeg',
      youtubeId: 'dQw4w9WgXcQ',
      date: '2024-04-15',
      duration: '58:24'
    },
    {
      id: 'video2',
      title: 'Hinário: O Cruzeiro',
      description: 'Gravação completa do hinário "O Cruzeiro" do Mestre Irineu, fundador do Santo Daime.',
      thumbnail: 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg',
      youtubeId: 'dQw4w9WgXcQ',
      date: '2024-03-20',
      duration: '2:15:33'
    },
    {
      id: 'video3',
      title: 'Entrevista: A Música como Veículo Espiritual',
      description: 'Conversa com músicos experientes sobre o papel da música como veículo de transmissão de conhecimentos espirituais.',
      thumbnail: 'https://images.pexels.com/photos/2531728/pexels-photo-2531728.jpeg',
      youtubeId: 'dQw4w9WgXcQ',
      date: '2024-02-28',
      duration: '42:17'
    }
  ];

  // Mock data for upcoming events
  const upcomingEvents = [
    {
      id: 'event1',
      title: 'Roda de Conversa: Música e Espiritualidade',
      date: '2024-05-20T19:00:00',
      location: 'Centro Cultural da Floresta, Rio Branco - AC',
      description: 'Uma conversa aberta sobre a relação entre música, espiritualidade e as tradições do Santo Daime.',
      image: 'https://images.pexels.com/photos/7149165/pexels-photo-7149165.jpeg'
    },
    {
      id: 'event2',
      title: 'Oficina de Instrumentos Tradicionais',
      date: '2024-06-05T14:00:00',
      location: 'Espaço Harmonia, São Paulo - SP',
      description: 'Aprenda sobre os instrumentos tradicionais utilizados nos rituais do Santo Daime e sua importância.',
      image: 'https://images.pexels.com/photos/2531714/pexels-photo-2531714.jpeg'
    }
  ];

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ 
            backgroundImage: 'url(https://images.pexels.com/photos/640809/pexels-photo-640809.jpeg)',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-dark-green/80 to-dark-green/50"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full bg-spiritual-purple/30 text-light-cream text-sm font-medium mb-4 animate-pulse">
              Preservando nossa cultura musical
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-light-cream mb-6 leading-tight">
              Cânticos da Floresta
            </h1>
            <p className="text-xl text-light-cream/90 mb-8 leading-relaxed">
              Preservando e compartilhando a rica tradição musical da religião Santo Daime, 
              conectando pessoas através da espiritualidade, ancestralidade e cultura ayahuasqueira.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/gallery" 
                className="bg-light-green text-dark-green px-6 py-3 rounded-md font-medium flex items-center gap-2 hover:bg-medium-green transition-colors duration-300"
              >
                <PlayCircle size={20} />
                Ver Vídeos
              </Link>
              <Link 
                to="/about" 
                className="bg-transparent border border-light-cream text-light-cream px-6 py-3 rounded-md font-medium flex items-center gap-2 hover:bg-light-cream/10 transition-colors duration-300"
              >
                Conheça o Projeto
              </Link>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-cream dark:from-dark-green to-transparent"></div>
      </section>

      {/* Featured Video Section */}
      <section className="py-16 bg-cream dark:bg-dark-green">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-serif font-bold text-dark-green dark:text-light-cream">
              Em Destaque
            </h2>
            <Link 
              to="/gallery" 
              className="text-earth-brown dark:text-light-green flex items-center gap-1 hover:underline"
            >
              Ver todos <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <FeaturedVideo video={featuredVideos[0]} />
            </div>
            <div className="space-y-6">
              {featuredVideos.slice(1, 3).map(video => (
                <VideoPreview key={video.id} video={video} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-light-green/10 dark:bg-medium-green/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/34407/pexels-photo.jpg" 
                  alt="Músicos tocando instrumentos em uma floresta" 
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-4 -right-4 bg-spiritual-purple text-light-cream p-4 rounded-lg shadow-lg">
                  <p className="font-serif italic">"A música é a voz da floresta"</p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <span className="inline-block px-3 py-1 rounded-full bg-earth-brown/20 text-earth-brown dark:text-light-cream text-sm font-medium mb-4">
                Nossa Missão
              </span>
              <h2 className="text-3xl font-serif font-bold text-dark-green dark:text-light-cream mb-6">
                Preservando Nossa Herança Musical
              </h2>
              <p className="text-dark-green/90 dark:text-light-cream/90 mb-6 leading-relaxed">
                O projeto Cânticos da Floresta nasceu da necessidade de preservar e divulgar 
                a rica tradição musical da religião Santo Daime, garantindo que esse patrimônio 
                cultural brasileiro seja registrado, estudado e compartilhado com respeito e 
                autenticidade.
              </p>
              <p className="text-dark-green/90 dark:text-light-cream/90 mb-8 leading-relaxed">
                Através de gravações audiovisuais de alta qualidade, documentamos encontros 
                de músicos, hinários tradicionais e entrevistas com mestres da tradição, 
                criando um acervo digital acessível e inclusivo para as gerações presentes e futuras.
              </p>
              <Link 
                to="/about" 
                className="inline-flex items-center gap-2 text-earth-brown dark:text-light-green font-medium hover:underline"
              >
                Saiba mais sobre nosso trabalho <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16 bg-cream dark:bg-dark-green">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-serif font-bold text-dark-green dark:text-light-cream">
              Próximos Eventos
            </h2>
            <Link 
              to="/events" 
              className="text-earth-brown dark:text-light-green flex items-center gap-1 hover:underline"
            >
              Ver agenda completa <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link 
              to="/collaborate" 
              className="inline-flex items-center gap-2 bg-spiritual-purple text-light-cream px-6 py-3 rounded-md font-medium hover:bg-spiritual-purple/90 transition-colors duration-300"
            >
              <MessageCircle size={20} />
              Quero participar
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-dark-green text-light-cream">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 max-w-3xl mx-auto">
            Junte-se a nós na preservação da tradição musical do Santo Daime
          </h2>
          <p className="text-light-cream/90 mb-10 max-w-2xl mx-auto">
            Contribua com doações, voluntariado ou sugestões para fortalecer o projeto 
            e ajudar a manter viva essa importante expressão cultural brasileira.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/collaborate" 
              className="bg-light-green text-dark-green px-6 py-3 rounded-md font-medium hover:bg-medium-green transition-colors duration-300"
            >
              Colabore com o Projeto
            </Link>
            <Link 
              to="/contact" 
              className="bg-transparent border border-light-cream text-light-cream px-6 py-3 rounded-md font-medium hover:bg-light-cream/10 transition-colors duration-300"
            >
              Entre em Contato
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;