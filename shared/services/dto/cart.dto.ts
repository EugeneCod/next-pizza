import { PizzaSizeValue, PizzaTypeValue } from '@/shared/constants/pizza';
import { ProductItemWithSizeAndTypes } from '@/types/prisma';
import { Cart, CartItem, Product, Ingredient } from '@prisma/client';

export interface CartItemDTO extends CartItem {
  productItem: ProductItemWithSizeAndTypes & {
    product: Product;
  };
  ingredients: Ingredient[];
}

export interface CartDTO extends Cart {
  items: CartItemDTO[];
}

export interface CreateCartItemValues {
  productItemId: number;
  ingredientsIds: number[];
}
