import { PizzaSizeValue, PizzaTypeValue } from '../constants/pizza';
import { CartDTO } from '../services/dto/cart.dto';
import { calcCartItemTotalPrice } from './calc-cart-item-total-price';

export interface CartStateItem {
  id: number;
  quantity: number;
  name: string;
  imageUrl: string;
  price: number;
  disabled?: boolean;
  updating?: boolean;
  pizzaSize: PizzaSizeValue | null;
  pizzaType: PizzaTypeValue | null;
  ingredients: Array<{ name: string; price: number }>;
}

interface ReturnProps {
  cartItems: CartStateItem[];
  totalAmount: number;
}

export function getCartDetails(data: CartDTO): ReturnProps {
  return {
    cartItems: data.items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      name: item.productItem.product.name,
      imageUrl: item.productItem.product.imageUrl,
      price: calcCartItemTotalPrice(item),
      disabled: false,
      pizzaSize: item.productItem.size,
      pizzaType: item.productItem.pizzaType,
      ingredients: item.ingredients.map((ingredient) => ({
        name: ingredient.name,
        price: ingredient.price,
      })),
    })),
    totalAmount: data.totalAmount,
  };
}
