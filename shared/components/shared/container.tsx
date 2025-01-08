import { cn } from '@/shared/lib/utils';
import type { PropsWithChildren } from 'react';

interface ContainerProps extends PropsWithChildren {
  className?: string;
}

export const Container = (props: ContainerProps) => {
  const { className, children } = props;
  return <div className={cn('mx-auto max-w-[1280px]', className)}>{children}</div>;
};
