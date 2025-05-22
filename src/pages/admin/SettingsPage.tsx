import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { supabase } from '../../lib/supabase';

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const AdminSettingsPage = () => {
  const { register, handleSubmit, reset, formState: { errors }, watch } = useForm<PasswordForm>();

  const onSubmit = async (data: PasswordForm) => {
    try {
      if (data.newPassword !== data.confirmPassword) {
        toast.error('As senhas não coincidem');
        return;
      }

      const { error } = await supabase.auth.updateUser({
        password: data.newPassword
      });

      if (error) throw error;

      toast.success('Senha atualizada com sucesso!');
      reset();
    } catch (error) {
      toast.error('Erro ao atualizar senha');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-dark-green dark:text-light-cream mb-6">
        Configurações
      </h1>

      <div className="bg-white dark:bg-medium-green/20 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-dark-green dark:text-light-cream mb-4">
          Alterar Senha
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-dark-green dark:text-light-cream mb-1">
              Senha Atual
            </label>
            <input
              type="password"
              {...register('currentPassword', { required: 'Senha atual é obrigatória' })}
              className="w-full px-3 py-2 border rounded-md dark:bg-dark-green/50"
            />
            {errors.currentPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.currentPassword.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-green dark:text-light-cream mb-1">
              Nova Senha
            </label>
            <input
              type="password"
              {...register('newPassword', {
                required: 'Nova senha é obrigatória',
                minLength: {
                  value: 8,
                  message: 'A senha deve ter no mínimo 8 caracteres'
                }
              })}
              className="w-full px-3 py-2 border rounded-md dark:bg-dark-green/50"
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-green dark:text-light-cream mb-1">
              Confirmar Nova Senha
            </label>
            <input
              type="password"
              {...register('confirmPassword', {
                required: 'Confirmação de senha é obrigatória',
                validate: value => value === watch('newPassword') || 'As senhas não coincidem'
              })}
              className="w-full px-3 py-2 border rounded-md dark:bg-dark-green/50"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-light-green text-dark-green px-4 py-2 rounded-md hover:bg-medium-green transition-colors"
          >
            Atualizar Senha
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminSettingsPage;