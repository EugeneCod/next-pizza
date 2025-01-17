'use client';

import { cn } from '@/shared/lib/utils';
import { useRouter } from 'next/navigation';

import { Dialog, DialogContent } from '@/shared/components/ui';
import { ChoosePizzaForm, ChooseProductForm } from '@/shared/components/shared';

import { type ProductWithRelations } from '@/types/prisma';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';

interface ChooseProductModalProps {
  className?: string;
  product: ProductWithRelations;
}

export const ChooseProductModal = (props: ChooseProductModalProps) => {
  const { className, product } = props;
  const router = useRouter();
  const isPizzaForm = Boolean(product.items[0].pizzaType);

  return (
    <Dialog open={!!product} onOpenChange={() => router.back()}>
      <DialogTitle />
      <DialogDescription />
      <DialogContent
        className={cn(
          'p-0 w-full max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
          className,
        )}>
        {isPizzaForm ? (
          <ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
            items={product.items}
          />
        ) : (
          <ChooseProductForm imageUrl={product.imageUrl} name={product.name} />
        )}
      </DialogContent>
    </Dialog>
  );
};
