'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import type { User } from '@prisma/client';

import { profileFormSchema, type ProfileFormSchema } from '@/shared/utils/schemes';
import { signOut } from 'next-auth/react';
import { Container, FormInput, Title } from '.';
import { Button } from '../ui';
import { updateUserInfo } from '@/app/actions';

interface ProfileFormProps {
  data: User;
}

export const ProfileForm = (props: ProfileFormProps) => {
  const { data } = props;

  const form = useForm({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fullName: data.fullName,
      email: data.email,
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(data: ProfileFormSchema) {
    try {
      await updateUserInfo({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast.success('Данные обновлены 📝', {
        icon: '✅',
      });
    } catch (error) {
      console.error(error);
      toast.error('Ошибка при обновлении данных', {
        icon: '❌',
      });
    }
  }

  function handleClickSignOut() {
    signOut({
      callbackUrl: '/',
    });
  }
  return (
    <Container className="my-10">
      <Title text={`Личные данные | #${data.id}`} size="md" className="font-bold" />

      <FormProvider {...form}>
        <form className="flex flex-col gap-5 w-96 mt-10" onSubmit={form.handleSubmit(onSubmit)}>
          <FormInput name="email" label="E-Mail" required />
          <FormInput name="fullName" label="Полное имя" required />

          <FormInput type="password" name="password" label="Новый пароль" />
          <FormInput type="password" name="confirmPassword" label="Повторите пароль" />

          <Button disabled={form.formState.isSubmitting} className="text-base mt-10" type="submit">
            Сохранить
          </Button>

          <Button
            onClick={handleClickSignOut}
            variant="secondary"
            disabled={form.formState.isSubmitting}
            className="text-base"
            type="button">
            Выйти
          </Button>
        </form>
      </FormProvider>
    </Container>
  );
};
