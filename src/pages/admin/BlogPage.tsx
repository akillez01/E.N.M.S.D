import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import slugify from 'slugify';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { supabase } from '../../lib/supabase';

interface BlogPostForm {
  title: string;
  content: string;
  published: boolean;
}

const AdminBlogPage = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
  });
  
  const { register, handleSubmit, reset, setValue, watch } = useForm<BlogPostForm>();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Erro ao carregar posts');
      return;
    }

    setPosts(data || []);
  };

  const onSubmit = async (data: BlogPostForm) => {
    if (!editor) return;

    try {
      const content = editor.getHTML();
      const slug = slugify(data.title, { lower: true, strict: true });

      if (editingId) {
        const { error } = await supabase
          .from('blog_posts')
          .update({ ...data, content, slug })
          .eq('id', editingId);

        if (error) throw error;
        toast.success('Post atualizado com sucesso!');
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert([{ ...data, content, slug }]);

        if (error) throw error;
        toast.success('Post adicionado com sucesso!');
      }

      reset();
      editor.commands.setContent('');
      setIsEditing(false);
      setEditingId(null);
      fetchPosts();
    } catch (error) {
      toast.error('Erro ao salvar post');
    }
  };

  const handleEdit = (post: any) => {
    setIsEditing(true);
    setEditingId(post.id);
    setValue('title', post.title);
    setValue('published', post.published);
    editor?.commands.setContent(post.content);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este post?')) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Post excluído com sucesso!');
      fetchPosts();
    } catch (error) {
      toast.error('Erro ao excluir post');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-dark-green dark:text-light-cream mb-6">
        Gerenciar Blog
      </h1>

      <div className="bg-white dark:bg-medium-green/20 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-dark-green dark:text-light-cream mb-4">
          {isEditing ? 'Editar Post' : 'Novo Post'}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-dark-green dark:text-light-cream mb-1">
              Título
            </label>
            <input
              type="text"
              {...register('title', { required: true })}
              className="w-full px-3 py-2 border rounded-md dark:bg-dark-green/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-green dark:text-light-cream mb-1">
              Conteúdo
            </label>
            <EditorContent editor={editor} className="prose dark:prose-invert max-w-none" />
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                {...register('published')}
                className="mr-2"
              />
              <span className="text-sm text-dark-green dark:text-light-cream">
                Publicar post
              </span>
            </label>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-light-green text-dark-green px-4 py-2 rounded-md hover:bg-medium-green transition-colors"
            >
              {isEditing ? 'Atualizar' : 'Publicar'}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={() => {
                  reset();
                  editor?.commands.setContent('');
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
          Posts do Blog
        </h2>

        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex items-center justify-between p-4 bg-cream dark:bg-dark-green/50 rounded-lg"
            >
              <div>
                <h3 className="font-medium text-dark-green dark:text-light-cream">
                  {post.title}
                </h3>
                <p className="text-sm text-dark-green/70 dark:text-light-cream/70">
                  {post.published ? 'Publicado' : 'Rascunho'}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(post)}
                  className="p-2 text-dark-green dark:text-light-cream hover:bg-medium-green/20 rounded-md"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
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

export default AdminBlogPage;