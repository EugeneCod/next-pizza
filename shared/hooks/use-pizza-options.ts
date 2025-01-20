import { useEffect, useState } from 'react';
import { PizzaSizeValue, PizzaSizeVariant, PizzaTypeValue } from '../constants/pizza';
import { ProductWithRelations } from '@/types/prisma';
import { useSet } from 'react-use';
import { getAvailablePizzaSizes } from '../lib';

interface ReturnProps {
  availablePizzaSizes: PizzaSizeVariant[];
  selectedSize: PizzaSizeValue;
  selectedType: PizzaTypeValue;
  selectedIngredients: Set<number>;
  currentPizzaId: number | undefined;
  changeSelectedSize: (size: PizzaSizeValue) => void;
  changeSelectedType: (size: PizzaTypeValue) => void;
  toggleIngredient: (id: number) => void;
}

export function usePizzaOptions(pizzas: ProductWithRelations['items']): ReturnProps {
  const [selectedSize, setSelectedSize] = useState<PizzaSizeValue>(
    (pizzas && pizzas[0].size) || 20,
  );
  const [selectedType, setSelectedType] = useState<PizzaTypeValue>(
    (pizzas && pizzas[0].pizzaType) || 1,
  );
  const [selectedIngredients, { toggle: toggleIngredient }] = useSet(new Set<number>([]));

  const availablePizzaSizes = getAvailablePizzaSizes(pizzas, selectedType);

  const currentPizzaId = pizzas.find(
    (pizza) => pizza.pizzaType === selectedType && pizza.size === selectedSize,
  )?.id || 1;

  useEffect(() => {
    const firstAvailableSize = availablePizzaSizes?.find((item) => !item.disabled);
    const availableCurrentSize = availablePizzaSizes?.find(
      (item) => item.value === selectedSize && !item.disabled,
    );

    if (!availableCurrentSize && firstAvailableSize) {
      setSelectedSize(firstAvailableSize.value);
    }
  }, [selectedType]);

  function changeSelectedSize(size: PizzaSizeValue) {
    setSelectedSize(size);
  }

  function changeSelectedType(type: PizzaTypeValue) {
    setSelectedType(type);
  }

  return {
    availablePizzaSizes,
    selectedSize,
    selectedType,
    selectedIngredients,
    currentPizzaId,
    changeSelectedSize,
    changeSelectedType,
    toggleIngredient,
  };
}
