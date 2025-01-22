'use client';

import { useRouter } from 'next/navigation';

import { Dialog, DialogContent } from '@/shared/components/ui';
import { ChooseFormContainer } from '@/shared/components/shared';

import { cn } from '@/shared/lib/utils';

import { type ProductWithRelations } from '@/types/prisma';

interface ChooseProductModalProps {
  className?: string;
  product: ProductWithRelations;
}

export const ChooseProductModal = (props: ChooseProductModalProps) => {
  const { className, product } = props;
  const router = useRouter();

  function handleSubmit() {
    if (window.location.pathname.includes('products')) {
      router.back();
    }
  }

  return (
    <Dialog open={!!product} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          'p-0 w-full max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
          className,
        )}>
        <ChooseFormContainer product={product} onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
};
