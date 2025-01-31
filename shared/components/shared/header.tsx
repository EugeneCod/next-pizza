'use client';

import { useEffect } from 'react';
import { UserIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

import { CartButton, Container, SearchInput } from '.';
import { Button } from '../ui';
import { cn } from '@/shared/lib/utils';

interface HeaderProps {
  className?: string;
  hasSearch?: boolean;
  hasCart?: boolean;
}

export const Header = (props: HeaderProps) => {
  const { className, hasSearch = true, hasCart = true } = props;
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (searchParams.has('paid')) {
      setTimeout(() => {
        toast.success('Заказ успешно оплачен! Информация отправлена на почту.');
      }, 500);
      router.replace(pathname);
    }
  }, []);

  return (
    <header className={cn('border-b', className)}>
      <Container className="flex items-center justify-between py-12">
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src={'/logo.png'} alt="Логотип" width={35} height={35} />
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
          <Button variant="outline" className="flex items-center gap-1">
            <UserIcon size={16} />
            Войти
          </Button>
          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};
