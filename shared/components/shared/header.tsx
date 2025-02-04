'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

import { AuthModal, CartButton, Container, ProfileButton, SearchInput } from '.';
import { cn } from '@/shared/lib/utils';

interface HeaderProps {
  className?: string;
  hasSearch?: boolean;
  hasCart?: boolean;
}

export const Header = (props: HeaderProps) => {
  const { className, hasSearch = true, hasCart = true } = props;
  const [authModalIsOpen, setAuthModalIsOpen] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let toastMessage: string | undefined;

    if (searchParams.has('paid')) {
      toastMessage = 'Заказ успешно оплачен! Информация отправлена на почту.';
    }

    if (searchParams.has('verified')) {
      toastMessage = 'Ваш email адрес подтвержден.';
    }

    if (toastMessage) {
      setTimeout(() => {
        toast.success(toastMessage);
      }, 500);
      router.replace(pathname);
    }
  }, []);

  return (
    <header className={cn('border-b', className)}>
      <Container className="flex items-center justify-between py-12">
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image
              src={'/assets/images/logos/react-pizza.png'}
              alt="Логотип"
              width={35}
              height={35}
            />
            <div>
              <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
              <p className="text-sm text-gray-400 leading-3">вкусней уже некуда</p>
            </div>
          </div>
        </Link>

        {hasSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}

        <div className="flex items-center gap-3">
          <AuthModal
            open={authModalIsOpen}
            onClose={() => {
              setAuthModalIsOpen(false);
            }}
          />
          <ProfileButton
            onClickSignin={() => {
              setAuthModalIsOpen(true);
            }}
          />
          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};
