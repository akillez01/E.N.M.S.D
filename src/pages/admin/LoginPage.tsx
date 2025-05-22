import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { supabase } from '../../lib/supabase';
import { AlertCircle } from 'lucide-react';

interface LoginForm {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    try {
      setLoginError(null);
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        if (error.message === 'Invalid login credentials') {
          setLoginError('Email ou senha incorretos. Por favor, verifique suas credenciais.');
        } else {
          setLoginError('Ocorreu um erro ao fazer login. Por favor, tente novamente.');
        }
        return;
      }

      // Check if user is admin
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', (await supabase.auth.getUser()).data.user?.id)
        .single();

      if (profile?.role !== 'admin') {
        await supabase.auth.signOut();
        setLoginError('Acesso restrito a administradores.');
        return;
      }

      toast.success('Login realizado com sucesso!');
      navigate('/admin/videos');
    } catch (error) {
      setLoginError('Ocorreu um erro ao fazer login. Por favor, tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-cream dark:bg-dark-green flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 bg-white dark:bg-medium-green rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-dark-green dark:text-light-cream mb-6">
          Login Administrativo
        </h1>

        {loginError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md flex items-start">
            <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
            <span>{loginError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-dark-green dark:text-light-cream mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register('email', { 
                required: 'Email é obrigatório',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email inválido'
                }
              })}
              className="w-full px-3 py-2 border rounded-md dark:bg-dark-green/50 dark:border-medium-green dark:text-light-cream focus:outline-none focus:ring-2 focus:ring-light-green"
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-dark-green dark:text-light-cream mb-1"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              {...register('password', { 
                required: 'Senha é obrigatória',
                minLength: {
                  value: 6,
                  message: 'A senha deve ter pelo menos 6 caracteres'
                }
              })}
              className="w-full px-3 py-2 border rounded-md dark:bg-dark-green/50 dark:border-medium-green dark:text-light-cream focus:outline-none focus:ring-2 focus:ring-light-green"
              autoComplete="current-password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-light-green text-dark-green font-medium py-2 px-4 rounded-md hover:bg-medium-green transition-colors duration-200 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-green"
          >
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </button>

          <p className="text-center text-dark-green/70 dark:text-light-cream/70 text-sm">
            Não tem uma conta?{' '}
            <Link to="/admin/register" className="text-spiritual-purple hover:underline">
              Cadastre-se
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;