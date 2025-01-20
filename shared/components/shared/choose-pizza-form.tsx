'use client';

import { useEffect } from 'react';

import { GroupVariants, IngredientItem, PizzaImage, Title } from '.';
import { Button } from '../ui';
import { pizzaTypes } from '@/shared/constants/pizza';
import { cn } from '@/shared/lib/utils';

import type { PizzaSizeValue, PizzaTypeValue } from '@/shared/constants/pizza';
import type { ProductWithRelations } from '@/types/prisma';
import { getPizzaDetails } from '@/shared/lib';
import { usePizzaOptions } from '@/shared/hooks';

interface ChoosePizzaFormProps {
  className?: string;
  imageUrl: string;
  name: string;
  ingredients: ProductWithRelations['ingredients'];
  items: ProductWithRelations['items'];
  loading: boolean;
  onClickAddCart: (productItemId: number, ingredientsIds: Array<number>) => void;
}

export const ChoosePizzaForm = (props: ChoosePizzaFormProps) => {
  const { className, imageUrl, name, ingredients, items, loading, onClickAddCart } = props;

  const {
    availablePizzaSizes,
    selectedSize,
    selectedType,
    selectedIngredients,
    currentPizzaId,
    changeSelectedSize,
    changeSelectedType,
    toggleIngredient,
  } = usePizzaOptions(items);

  const { textDetails, totalPrice } = getPizzaDetails(
    items,
    selectedSize,
    selectedType,
    selectedIngredients,
    ingredients,
  );

  useEffect(() => {
    const firstAvailableSize = availablePizzaSizes?.find((item) => !item.disabled);
    const availableCurrentSize = availablePizzaSizes?.find(
      (item) => item.value === selectedSize && !item.disabled,
    );

    if (!availableCurrentSize && firstAvailableSize) {
      changeSelectedSize(firstAvailableSize.value);
    }
  }, [selectedType]);

  function handleCLickAddCart() {
    if (currentPizzaId) {
      onClickAddCart(currentPizzaId, Array.from(selectedIngredients));
    }
  }

  return (
    <div className={cn('flex flex-1', className)}>
      <PizzaImage imageUrl={imageUrl} size={selectedSize} />

      <div className="w-[490px] bg-[#FCFCFC] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">{textDetails}</p>

        <div className="flex flex-col gap-y-2 mt-6">
          <GroupVariants
            items={availablePizzaSizes}
            selectedValue={selectedSize}
            onClick={(value) => changeSelectedSize(Number(value) as PizzaSizeValue)}
          />
          <GroupVariants
            items={pizzaTypes}
            selectedValue={selectedType}
            onClick={(value) => changeSelectedType(Number(value) as PizzaTypeValue)}
          />
        </div>

        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                name={ingredient.name}
                price={ingredient.price}
                imageUrl={ingredient.imageUrl}
                onClick={() => toggleIngredient(ingredient.id)}
                active={selectedIngredients.has(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button
          loading={loading}
          onClick={handleCLickAddCart}
          className="h-14 px-10 text-base rounded-[18px] w-full mt-6">
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
