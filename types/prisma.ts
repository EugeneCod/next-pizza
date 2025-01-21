import { Category, Ingredient, Product, ProductItem } from '@prisma/client';
import type { PizzaSizeValue, PizzaTypeValue } from '@/shared/constants/pizza';

export interface ProductItemWithSizeAndTypes extends ProductItem {
  size: PizzaSizeValue | null;
  pizzaType: PizzaTypeValue | null;
}

export type ProductWithRelations = Product & {
  items: ProductItemWithSizeAndTypes[];
  ingredients: Ingredient[];
};

export interface CategoryWithProducts extends Category {
  products: ProductWithRelations[];
}
