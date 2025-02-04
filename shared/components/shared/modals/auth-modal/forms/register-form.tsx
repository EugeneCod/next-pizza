'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

import { FormInput, Title } from '@/shared/components/shared';
import { Button } from '@/shared/components/ui';
import { registerUser } from '@/app/actions';
import { type RegisterFormSchema, registerFormSchema } from '@/shared/utils/schemes';

import { MESSAGES_VALUES } from '@/shared/constants/messages';

interface RegisterFormProps {
  onClose: VoidFunction;
  loading: boolean;
}

export const RegisterForm = (props: RegisterFormProps) => {
  const { onClose, loading } = props;
  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: '',
      fullName: '',
      password: '',
      confirmPassword: '',
    },
  });
  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (data: RegisterFormSchema) => {
    try {
      await registerUser({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast.error('Регистрация успешна 📝. Подтвердите свою почту', {
        icon: '✅',
      });

      onClose?.();
    } catch (error) {
      let message: string;

      if (error instanceof Error && MESSAGES_VALUES.includes(error.message)) {
        message = error.message;
      } else {
        message = 'Произошла ошибка';
      }
      return toast.error(message, {
        icon: '❌',
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <Title text="Регистрация" size="md" className="font-bold" />

        <FormInput name="email" label="Email" required />
        <FormInput name="fullName" label="Полное имя" required />
        <FormInput name="password" label="Пароль" type="password" required />
        <FormInput name="confirmPassword" label="Подтвердите пароль" type="password" required />

        <Button loading={isSubmitting || loading} className="h-12 text-base" type="submit">
          Зарегистрироваться
        </Button>
      </form>
    </FormProvider>
  );
};
