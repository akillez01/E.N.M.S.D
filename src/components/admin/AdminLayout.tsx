import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { LogOut, Video, Calendar, FileText, Settings } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-cream dark:bg-dark-green flex">
      {/* Sidebar */}
      <aside className="w-64 bg-light-green dark:bg-medium-green p-6">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-dark-green dark:text-light-cream">
            Painel Admin
          </h1>
        </div>
        
        <nav className="space-y-2">
          <Link
            to="/admin/videos"
            className="flex items-center gap-2 p-2 rounded-lg text-dark-green dark:text-light-cream hover:bg-medium-green/20 dark:hover:bg-dark-green/20"
          >
            <Video size={20} />
            <span>Vídeos</span>
          </Link>
          
          <Link
            to="/admin/events"
            className="flex items-center gap-2 p-2 rounded-lg text-dark-green dark:text-light-cream hover:bg-medium-green/20 dark:hover:bg-dark-green/20"
          >
            <Calendar size={20} />
            <span>Eventos</span>
          </Link>
          
          <Link
            to="/admin/blog"
            className="flex items-center gap-2 p-2 rounded-lg text-dark-green dark:text-light-cream hover:bg-medium-green/20 dark:hover:bg-dark-green/20"
          >
            <FileText size={20} />
            <span>Blog</span>
          </Link>
          
          <Link
            to="/admin/settings"
            className="flex items-center gap-2 p-2 rounded-lg text-dark-green dark:text-light-cream hover:bg-medium-green/20 dark:hover:bg-dark-green/20"
          >
            <Settings size={20} />
            <span>Configurações</span>
          </Link>
        </nav>
        
        <div className="mt-auto pt-8">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 p-2 w-full rounded-lg text-dark-green dark:text-light-cream hover:bg-medium-green/20 dark:hover:bg-dark-green/20"
          >
            <LogOut size={20} />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;