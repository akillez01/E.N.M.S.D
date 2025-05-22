import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { supabase } from '../../lib/supabase';

interface EventForm {
  title: string;
  description: string;
  date: string;
  location: string;
  image_url: string;
}

const AdminEventsPage = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<EventForm>();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });

    if (error) {
      toast.error('Erro ao carregar eventos');
      return;
    }

    setEvents(data || []);
  };

  const onSubmit = async (data: EventForm) => {
    try {
      if (editingId) {
        const { error } = await supabase
          .from('events')
          .update(data)
          .eq('id', editingId);

        if (error) throw error;
        toast.success('Evento atualizado com sucesso!');
      } else {
        const { error } = await supabase
          .from('events')
          .insert([data]);

        if (error) throw error;
        toast.success('Evento adicionado com sucesso!');
      }

      reset();
      setIsEditing(false);
      setEditingId(null);
      fetchEvents();
    } catch (error) {
      toast.error('Erro ao salvar evento');
    }
  };

  const handleEdit = (event: any) => {
    setIsEditing(true);
    setEditingId(event.id);
    Object.keys(event).forEach((key) => {
      if (key === 'date') {
        setValue(key, format(new Date(event[key]), "yyyy-MM-dd'T'HH:mm"));
      } else {
        setValue(key as keyof EventForm, event[key]);
      }
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este evento?')) return;

    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Evento excluído com sucesso!');
      fetchEvents();
    } catch (error) {
      toast.error('Erro ao excluir evento');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-dark-green dark:text-light-cream mb-6">
        Gerenciar Eventos
      </h1>

      <div className="bg-white dark:bg-medium-green/20 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-dark-green dark:text-light-cream mb-4">
          {isEditing ? 'Editar Evento' : 'Adicionar Novo Evento'}
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
              Data e Hora
            </label>
            <input
              type="datetime-local"
              {...register('date', { required: 'Data é obrigatória' })}
              className="w-full px-3 py-2 border rounded-md dark:bg-dark-green/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-green dark:text-light-cream mb-1">
              Local
            </label>
            <input
              type="text"
              {...register('location', { required: 'Local é obrigatório' })}
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
              URL da Imagem
            </label>
            <input
              type="url"
              {...register('image_url')}
              className="w-full px-3 py-2 border rounded-md dark:bg-dark-green/50"
            />
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
          Eventos Cadastrados
        </h2>

        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex items-center justify-between p-4 bg-cream dark:bg-dark-green/50 rounded-lg"
            >
              <div>
                <h3 className="font-medium text-dark-green dark:text-light-cream">
                  {event.title}
                </h3>
                <p className="text-sm text-dark-green/70 dark:text-light-cream/70">
                  {format(new Date(event.date), 'dd/MM/yyyy HH:mm')} - {event.location}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(event)}
                  className="p-2 text-dark-green dark:text-light-cream hover:bg-medium-green/20 rounded-md"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => handleDelete(event.id)}
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

export default AdminEventsPage;