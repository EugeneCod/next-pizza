import { z } from 'zod';
import { passwordInputSchema } from './items';

export const profileFormSchema = z
  .object({
    email: z.string().email({ message: 'Введите корректную электронную почту' }),
    fullName: z.string().min(2, { message: 'Введите имя и фамилию' }),
    password: passwordInputSchema.optional().or(z.literal('')),
    confirmPassword: passwordInputSchema.optional().or(z.literal('')),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

export type ProfileFormSchema = z.infer<typeof profileFormSchema>;
