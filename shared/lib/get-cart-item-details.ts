import { Ingredient } from '@prisma/client';
import { mapPizzaType, type PizzaSizeValue, type PizzaTypeValue } from '../constants/pizza';

export function getCartItemDetails(
  pizzaType: PizzaTypeValue,
  pizzaSize: PizzaSizeValue,
  ingredients: Ingredient[],
) {
  const details = [];

  if (pizzaSize && pizzaType) {
    const typeName = mapPizzaType[pizzaType];
    details.push(`${typeName} ${pizzaSize} см`);
  }

  if (ingredients) {
    details.push(...ingredients.map((ingredient) => ingredient.name));
  }

  return details.join(', ')
}
