import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';

import { loginFormSchema, type LoginFormSchema } from '@/shared/utils/schemes';
import { FormInput, Title } from '@/shared/components/shared';
import { Button } from '@/shared/components/ui';
import { signIn } from 'next-auth/react';

interface LoginFormProps {
  onClose: VoidFunction;
  loading: boolean;
}

const defaultValues = {
  email: '',
  password: '',
};

export const LoginForm = (props: LoginFormProps) => {
  const { onClose, loading } = props;
  const form = useForm<LoginFormSchema>({ resolver: zodResolver(loginFormSchema), defaultValues });
  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(data: LoginFormSchema) {
    try {
      const resp = await signIn('credentials', {
        ...data,
        redirect: false,
      });
      if (!resp?.ok) {
        throw Error('missing response');
      }

      toast.success('Вы успешно вошли в аккаунт', {
        icon: '✅',
      });

      onClose();
    } catch (error) {
      console.error('Error [Login]', error);
      toast.error('Не удалось войти в аккаунт', {
        icon: '❌',
      });
    }
  }

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <Title text="Вход в аккаунт" size="md" className="font-bold" />

        <FormInput name="email" label="Email" required />
        <FormInput name="password" label="Пароль" type="password" required />

        <Button loading={isSubmitting || loading} className="h-12 text-base" type="submit">
          Войти
        </Button>
      </form>
    </FormProvider>
  );
};
