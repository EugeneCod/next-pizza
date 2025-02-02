'use client';

import { CircleUserIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Button } from '../ui';

import { cn } from '@/shared/lib/utils';

interface ProfileButtonProps extends PropsWithClassName {
  onClickSignin?: VoidFunction;
}

export const ProfileButton = (props: ProfileButtonProps) => {
  const { className, onClickSignin } = props;

  const { data: session, status } = useSession();

  const loading = status === 'loading';

  return (
    <div className={cn(className)}>
      {!session ? (
        <Button
          className={cn('flex items-center gap-1', { 'w-[118px]': loading })}
          disabled={loading}
          loading={loading}
          onClick={onClickSignin}
          variant="outline">
          <UserIcon size={16} />
          Войти
        </Button>
      ) : (
        <Link href="/profile">
          <Button variant="secondary" className="flex items-center gap-2">
            <CircleUserIcon size={16} />
            Профиль
          </Button>
        </Link>
      )}
    </div>
  );
};
