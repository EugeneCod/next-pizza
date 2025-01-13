import Image from 'next/image';
import { cn } from '@/shared/lib/utils';
import { CartButton, Container, SearchInput } from '.';
import { Button } from '../ui';
import { UserIcon } from 'lucide-react';
import Link from 'next/link';

interface HeaderProps {
  className?: string;
}

export const Header = (props: HeaderProps) => {
  const { className } = props;

  return (
    <header className={cn(' border-b', className)}>
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

        <div className="mx-10 flex-1">
          <SearchInput />
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-1">
            <UserIcon size={16} />
            Войти
          </Button>
          <CartButton />
        </div>
      </Container>
    </header>
  );
};
