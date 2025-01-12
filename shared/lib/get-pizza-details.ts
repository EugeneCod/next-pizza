import { ProductWithRelations } from '@/types/prisma';
import { calcTotalPizzaPrice } from '.';
import { mapPizzaType, type PizzaSizeValue, type PizzaTypeValue } from '../constants/pizza';

export function getPizzaDetails(
  pizzas: ProductWithRelations['items'],
  selectedSize: PizzaSizeValue,
  selectedType: PizzaTypeValue,
  selectedIngredients: Set<number>,
  ingredients: ProductWithRelations['ingredients'],
) {
  const textDetails = `${selectedSize} см, ${mapPizzaType[selectedType].toLowerCase()} тесто`;

  const totalPrice = calcTotalPizzaPrice(
    pizzas,
    selectedSize,
    selectedType,
    selectedIngredients,
    ingredients,
  );

  return { textDetails, totalPrice };
}
