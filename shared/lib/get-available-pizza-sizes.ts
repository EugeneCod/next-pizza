import { PizzaSizeVariant, type PizzaTypeValue, pizzaSizes } from '../constants/pizza';
import type { ProductWithRelations } from '@/types/prisma';


export function getAvailablePizzaSizes(
  items: ProductWithRelations['items'],
  selectedType: PizzaTypeValue,
): PizzaSizeVariant[] {
  const filteredPizzasByType = items.filter((item) => item.pizzaType === selectedType);
  return pizzaSizes.map((item) => ({
    name: item.name,
    value: item.value,
    disabled: !filteredPizzasByType.some((pizza) => pizza.size === item.value),
  }));
}
