import { Container, Header } from '@/shared/components/shared';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Next Pizza | Оформление заказа',
  description: 'Страница оформления заказа',
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#F4F1EE]">
      <Container>
        <Suspense>
          <Header className="border-gray-200" hasSearch={false} hasCart={false} />
        </Suspense>
        {children}
      </Container>
    </main>
  );
}
