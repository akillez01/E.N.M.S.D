import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '../../lib/supabase';

interface VideoForm {
  title: string;
  description: string;
  youtube_id: string;
  category: string;
  has_subtitles: boolean;
  has_audio_description: boolean;
}

const AdminVideosPage = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<VideoForm>();

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Erro ao carregar vídeos');
      return;
    }

    setVideos(data || []);
  };

  const onSubmit = async (data: VideoForm) => {
    try {
      if (editingId) {
        const { error } = await supabase
          .from('videos')
          .update(data)
          .eq('id', editingId);

        if (error) throw error;
        toast.success('Vídeo atualizado com sucesso!');
      } else {
        const { error } = await supabase
          .from('videos')
          .insert([data]);

        if (error) throw error;
        toast.success('Vídeo adicionado com sucesso!');
      }

      reset();
      setIsEditing(false);
      setEditingId(null);
      fetchVideos();
    } catch (error) {
      toast.error('Erro ao salvar vídeo');
    }
  };

  const handleEdit = (video: any) => {
    setIsEditing(true);
    setEditingId(video.id);
    Object.keys(video).forEach((key) => {
      setValue(key as keyof VideoForm, video[key]);
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este vídeo?')) return;

    try {
      const { error } = await supabase
        .from('videos')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Vídeo excluído com sucesso!');
      fetchVideos();
    } catch (error) {
      toast.error('Erro ao excluir vídeo');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-dark-green dark:text-light-cream mb-6">
        Gerenciar Vídeos
      </h1>

      <div className="bg-white dark:bg-medium-green/20 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-dark-green dark:text-light-cream mb-4">
          {isEditing ? 'Editar Vídeo' : 'Adicionar Novo Vídeo'}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-dark-green dark:text-light-cream mb-1">
              Título
            </label>
            <input
              type="text"
              {...register('title', { required: 'Título é obrigatório' })}
              className="w-full px-3 py-2 border rounded-md dark:bg-dark-green/50"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-green dark:text-light-cream mb-1">
              ID do YouTube
            </label>
            <input
              type="text"
              {...register('youtube_id', { required: 'ID do YouTube é obrigatório' })}
              className="w-full px-3 py-2 border rounded-md dark:bg-dark-green/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-green dark:text-light-cream mb-1">
              Descrição
            </label>
            <textarea
              {...register('description')}
              rows={4}
              className="w-full px-3 py-2 border rounded-md dark:bg-dark-green/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-green dark:text-light-cream mb-1">
              Categoria
            </label>
            <input
              type="text"
              {...register('category')}
              className="w-full px-3 py-2 border rounded-md dark:bg-dark-green/50"
            />
          </div>

          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                {...register('has_subtitles')}
                className="mr-2"
              />
              <span className="text-sm text-dark-green dark:text-light-cream">
                Possui legendas
              </span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                {...register('has_audio_description')}
                className="mr-2"
              />
              <span className="text-sm text-dark-green dark:text-light-cream">
                Possui audiodescrição
              </span>
            </label>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-light-green text-dark-green px-4 py-2 rounded-md hover:bg-medium-green transition-colors"
            >
              {isEditing ? 'Atualizar' : 'Adicionar'}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={() => {
                  reset();
                  setIsEditing(false);
                  setEditingId(null);
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white dark:bg-medium-green/20 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-dark-green dark:text-light-cream mb-4">
          Vídeos Cadastrados
        </h2>

        <div className="space-y-4">
          {videos.map((video) => (
            <div
              key={video.id}
              className="flex items-center justify-between p-4 bg-cream dark:bg-dark-green/50 rounded-lg"
            >
              <div>
                <h3 className="font-medium text-dark-green dark:text-light-cream">
                  {video.title}
                </h3>
                <p className="text-sm text-dark-green/70 dark:text-light-cream/70">
                  {video.category}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(video)}
                  className="p-2 text-dark-green dark:text-light-cream hover:bg-medium-green/20 rounded-md"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => handleDelete(video.id)}
                  className="p-2 text-red-500 hover:bg-red-500/20 rounded-md"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminVideosPage;