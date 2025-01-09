import { Ingredient, Product, ProductItem } from '@prisma/client';
import type { PizzaSizeValue, PizzaTypeValue } from '@/shared/constants/pizza';

interface ProductItemWithSizeAndTypes extends ProductItem {
  size: PizzaSizeValue | null;
  pizzaType: PizzaTypeValue | null;
}

export type ProductWithRelations = Product & {
  items: ProductItemWithSizeAndTypes[];
  ingredients: Ingredient[];
};
