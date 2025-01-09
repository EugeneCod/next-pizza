'use client';

import { useEffect, useState } from 'react';
import { useSet } from 'react-use';

import { GroupVariants, IngredientItem, PizzaImage, Title } from '.';
import { Button } from '../ui';
import { mapPizzaType, pizzaSizes, pizzaTypes } from '@/shared/constants/pizza';
import { cn } from '@/shared/lib/utils';

import type { PizzaSizeValue, PizzaTypeValue } from '@/shared/constants/pizza';
import type { ProductWithRelations } from '@/types/prisma';

interface ChoosePizzaFormProps {
  className?: string;
  imageUrl: string;
  name: string;
  ingredients: ProductWithRelations['ingredients'];
  items: ProductWithRelations['items'];
  onClickAddCart?: VoidFunction;
}

export const ChoosePizzaForm = (props: ChoosePizzaFormProps) => {
  const { className, imageUrl, name, ingredients, items, onClickAddCart } = props;

  const [selectedSize, setSelectedSize] = useState<PizzaSizeValue>((items && items[0].size) || 20);
  const [selectedType, setSelectedType] = useState<PizzaTypeValue>(
    (items && items[0].pizzaType) || 1,
  );

  const [selectedIngredients, { toggle: toggleIngredient }] = useSet(new Set<number>([]));

  const textDetails = `${selectedSize} см, ${mapPizzaType[selectedType].toLowerCase()} тесто`;

  const pizzaPrice =
    items.find((item) => item.size === selectedSize && item.pizzaType === selectedType)?.price || 0;
  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);
  const totalPrice = pizzaPrice + totalIngredientsPrice;

  const availablePizzas = items.filter((item) => item.pizzaType === selectedType);
  const availablePizzaSizes = pizzaSizes.map((item) => ({
    name: item.name,
    value: item.value,
    disabled: !availablePizzas.some((pizza) => pizza.size === item.value),
  }));

  useEffect(() => {
    const firstAvailableSize = availablePizzaSizes?.find((item) => !item.disabled);
    const availableCurrentSize = availablePizzaSizes?.find(
      (item) => item.value === selectedSize && !item.disabled,
    );

    if (!availableCurrentSize && firstAvailableSize) {
      setSelectedSize(firstAvailableSize.value);
    }
  }, [selectedType]);

  function handleCLickAddCart() {
    onClickAddCart?.();
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
            onClick={(value) => setSelectedSize(Number(value) as PizzaSizeValue)}
          />
          <GroupVariants
            items={pizzaTypes}
            selectedValue={selectedType}
            onClick={(value) => setSelectedType(Number(value) as PizzaTypeValue)}
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
          onClick={handleCLickAddCart}
          className="h-14 px-10 text-base rounded-[18px] w-full mt-6">
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
