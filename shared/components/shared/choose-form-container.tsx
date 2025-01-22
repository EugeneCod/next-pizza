'use client';

import toast from 'react-hot-toast';

import { ChoosePizzaForm, ChooseProductForm } from '.';
import { useCartStore } from '@/shared/store';

import type { ProductWithRelations } from '@/types/prisma';

interface ChooseFormContainerProps {
  product: ProductWithRelations;
  onSubmit?: VoidFunction;
}

export const ChooseFormContainer = (props: ChooseFormContainerProps) => {
  const { product, onSubmit } = props;

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
      onSubmit?.();
    } catch (error) {
      console.error(error);
      toast.error('Не удалось добавить товар в корзину');
    }
  }

  return (
    <>
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
    </>
  );
};
