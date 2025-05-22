import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Página Não Encontrada | Cânticos da Floresta';
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-16 flex items-center justify-center bg-cream dark:bg-dark-green">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-9xl font-bold text-medium-green dark:text-light-green mb-8">404</h1>
        <h2 className="text-3xl font-serif font-bold text-dark-green dark:text-light-cream mb-6">
          Página Não Encontrada
        </h2>
        <p className="text-dark-green/80 dark:text-light-cream/80 max-w-md mx-auto mb-10">
          A página que você está procurando pode ter sido removida, renomeada ou 
          talvez nunca tenha existido. Vamos voltar para um caminho conhecido.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 bg-light-green text-dark-green px-6 py-3 rounded-md font-medium hover:bg-medium-green transition-colors duration-300"
        >
          <Home size={20} />
          Voltar para a página inicial
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;