import { mapPizzaType, type PizzaSizeValue, type PizzaTypeValue } from '../constants/pizza';
import type { CartStateItem } from './get-cart-details';

export function getCartItemDetails(
  pizzaType: PizzaTypeValue | null,
  pizzaSize: PizzaSizeValue | null,
  ingredients: CartStateItem['ingredients'],
) {
  const details = [];

  if (pizzaType && pizzaSize) {
    const typeName = mapPizzaType[pizzaType];
    details.push(`${typeName} ${pizzaSize} см`);
  }

  if (ingredients.length) {
    details.push(...ingredients.map((ingredient) => ingredient.name));
  }

  return details.join(', ');
}
