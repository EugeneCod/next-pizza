import { cn } from '@/shared/lib/utils';
import React from 'react';

interface CheckoutCartItemSkeletonProps extends PropsWithClassName {}

export const CheckoutCartItemSkeleton = (props: CheckoutCartItemSkeletonProps) => {
  const { className } = props;

  return (
    <div className={cn('flex items-center justify-between', className)}>
      <div className="flex items-center gap-5">
        <div className="w-[50px] h-[50px] bg-muted rounded-full animate-pulse" />
        <h2 className="w-40 h-5 bg-muted rounded animate-pulse" />
      </div>
      <div className="h-5 w-10 bg-muted rounded animate-pulse" />
      <div className="h-8 w-[133px] bg-muted rounded animate-pulse" />
    </div>
  );
};
