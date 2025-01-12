import { ProductWithRelations } from '@/types/prisma';
import { PizzaSizeValue, PizzaTypeValue } from '@/shared/constants/pizza';
import { Ingredient } from '@prisma/client';

export function calcTotalPizzaPrice(
  pizzas: ProductWithRelations['items'],
  selectedSize: PizzaSizeValue,
  selectedType: PizzaTypeValue,
  selectedIngredients: Set<number>,
  ingredients: Ingredient[],
) {
  const pizzaPrice =
    pizzas.find((pizza) => pizza.size === selectedSize && pizza.pizzaType === selectedType)
      ?.price || 0;
  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  return pizzaPrice + totalIngredientsPrice;
}
