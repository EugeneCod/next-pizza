import { z } from 'zod';
import { passwordInputSchema } from './items';

export const loginFormSchema = z.object({
  email: z.string().email({ message: 'Введите корректную электронную почту' }),
  password: passwordInputSchema,
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
