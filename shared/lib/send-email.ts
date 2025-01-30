import { Resend } from 'resend';

import type { ReactNode } from 'react';

export async function sendEmail(to: string | Array<string>, subject: string, template: ReactNode) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      throw new Error('Ошибка получения API ключа пакета resend');
    }
    const resend = new Resend(resendApiKey);

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to,
      subject,
      react: template,
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (err) {
    console.error(err);
  }
}
