import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="pt-24 pb-16 bg-cream dark:bg-dark-green">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-serif font-bold text-dark-green dark:text-light-cream mb-8">
          Sobre o Projeto
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-serif font-bold text-earth-brown dark:text-light-green mb-4">
              Nossa História
            </h2>
            <p className="text-dark-green/90 dark:text-light-cream/90 mb-6 leading-relaxed">
              O projeto Cânticos da Floresta nasceu em 2023 da necessidade de preservar e 
              divulgar a rica tradição musical do Santo Daime. Nossa missão é registrar, 
              documentar e compartilhar esse patrimônio cultural brasileiro, garantindo 
              que essas expressões espirituais sejam preservadas para as gerações futuras.
            </p>
            <p className="text-dark-green/90 dark:text-light-cream/90 leading-relaxed">
              Através de gravações audiovisuais de alta qualidade, documentamos encontros 
              de músicos, hinários tradicionais e entrevistas com mestres da tradição, 
              criando um acervo digital acessível e inclusivo.
            </p>
          </div>
          <div className="relative">
            <img 
              src="https://images.pexels.com/photos/1647372/pexels-photo-1647372.jpeg" 
              alt="Músicos tocando em meio à natureza"
              className="rounded-lg shadow-xl"
            />
            <div className="absolute -bottom-4 -right-4 bg-spiritual-purple text-light-cream p-4 rounded-lg shadow-lg">
              <p className="font-serif italic">"A música é a voz da floresta"</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-light-green/10 dark:bg-medium-green/10 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-dark-green dark:text-light-cream mb-3">
              Missão
            </h3>
            <p className="text-dark-green/90 dark:text-light-cream/90">
              Preservar e divulgar a tradição musical do Santo Daime, tornando-a 
              acessível através de registros audiovisuais de qualidade.
            </p>
          </div>
          <div className="bg-light-green/10 dark:bg-medium-green/10 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-dark-green dark:text-light-cream mb-3">
              Visão
            </h3>
            <p className="text-dark-green/90 dark:text-light-cream/90">
              Ser referência na documentação e preservação do patrimônio cultural 
              e espiritual brasileiro, especialmente da música sacra daimista.
            </p>
          </div>
          <div className="bg-light-green/10 dark:bg-medium-green/10 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-dark-green dark:text-light-cream mb-3">
              Valores
            </h3>
            <p className="text-dark-green/90 dark:text-light-cream/90">
              Respeito à tradição, inclusão social, acessibilidade, qualidade 
              técnica e compromisso com a preservação cultural.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-medium-green/20 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-serif font-bold text-dark-green dark:text-light-cream mb-6">
            Nossa Equipe
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <img 
                src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg" 
                alt="Coordenador do Projeto"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-lg font-bold text-dark-green dark:text-light-cream">
                João Silva
              </h3>
              <p className="text-earth-brown dark:text-light-green">
                Coordenador do Projeto
              </p>
            </div>
            <div className="text-center">
              <img 
                src="https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg" 
                alt="Diretora Musical"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-lg font-bold text-dark-green dark:text-light-cream">
                Maria Santos
              </h3>
              <p className="text-earth-brown dark:text-light-green">
                Diretora Musical
              </p>
            </div>
            <div className="text-center">
              <img 
                src="https://images.pexels.com/photos/2406949/pexels-photo-2406949.jpeg" 
                alt="Diretor Técnico"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-lg font-bold text-dark-green dark:text-light-cream">
                Pedro Oliveira
              </h3>
              <p className="text-earth-brown dark:text-light-green">
                Diretor Técnico
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-serif font-bold text-dark-green dark:text-light-cream mb-6">
            Faça Parte Desta História
          </h2>
          <p className="text-dark-green/90 dark:text-light-cream/90 mb-8 max-w-2xl mx-auto">
            Você pode contribuir com o projeto de diversas formas: como voluntário, 
            parceiro ou apoiador. Juntos, podemos fortalecer ainda mais este trabalho 
            de preservação cultural.
          </p>
          <Link 
            to="/collaborate" 
            className="inline-block bg-spiritual-purple text-light-cream px-6 py-3 rounded-md font-medium hover:bg-spiritual-purple/90 transition-colors"
          >
            Quero Colaborar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;