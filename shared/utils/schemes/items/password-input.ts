import { z } from 'zod';

export const passwordInputSchema = z
  .string()
  .min(6, { message: 'Пароль должен содержать не менее 8 символов' });
