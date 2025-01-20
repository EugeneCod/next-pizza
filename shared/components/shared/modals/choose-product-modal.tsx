'use client';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { Dialog, DialogContent } from '@/shared/components/ui';
import { ChoosePizzaForm, ChooseProductForm } from '@/shared/components/shared';
import { useCartStore } from '@/shared/store';
import { cn } from '@/shared/lib/utils';

import { type ProductWithRelations } from '@/types/prisma';

interface ChooseProductModalProps {
  className?: string;
  product: ProductWithRelations;
}

export const ChooseProductModal = (props: ChooseProductModalProps) => {
  const { className, product } = props;
  const router = useRouter();
  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);

  const { loading, addCartItem } = useCartStore((state) => state);

  async function handleAddProduct(productItemId: number, ingredientsIds: Array<number> = []) {
    try {
      await addCartItem({
        productItemId,
        ingredientsIds,
      });
      toast.success(`Товар "${product.name}" добавлен в корзину`);
      if (window.location.pathname.includes('products')) {
        router.back();
      }
    } catch (error) {
      console.error(error);
      toast.error('Не удалось добавить товар в корзину');
    }
  }

  return (
    <Dialog open={!!product} onOpenChange={() => router.back()}>
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
            onClickAddCart={handleAddProduct}
            loading={loading}
          />
        ) : (
          <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            price={firstItem.price}
            onClickAddCart={() => handleAddProduct(firstItem.id)}
            loading={loading}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
