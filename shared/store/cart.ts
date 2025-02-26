import { create } from 'zustand';
import { Api } from '../services/api-client';
import { getCartDetails } from '../lib';
import { type CartStateItem } from '../lib/get-cart-details';
import { CreateCartItemDTO } from '../services/dto/cart.dto';

export interface CartState {
  loading: boolean;
  updatingAnElement: boolean;
  error: boolean;
  totalAmount: number;
  cartItems: CartStateItem[];

  /* Получение товаров из корзины */
  fetchCartItems: () => Promise<void>;

  /* Запрос на обновление количества товара */
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;

  /* Запрос на добавление товара в корзину */
  addCartItem: (values: CreateCartItemDTO) => Promise<void>;

  /* Запрос на удаление товара из корзины */
  removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>()((set) => ({
  cartItems: [],
  error: false,
  loading: true,
  updatingAnElement: false,
  totalAmount: 0,
  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.getCart();
      set(getCartDetails(data));
    } catch (error) {
      set({ error: true });
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },
  updateItemQuantity: async (id: number, quantity: number) => {
    try {
      set((state) => ({
        updatingAnElement: true,
        error: false,
        cartItems: state.cartItems.map((item) =>
          item.id === id ? { ...item, updating: true } : item,
        ),
      }));
      const data = await Api.cart.updateCartItemQuantity(id, quantity);
      set(getCartDetails(data));
    } catch (error) {
      set({ error: true });
      console.error(error);
    } finally {
      set((state) => ({
        updatingAnElement: false,
        cartItems: state.cartItems.map((item) => ({ ...item, updating: false })),
      }));
    }
  },

  addCartItem: async (values: CreateCartItemDTO) => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.addCartItem(values);
      set(getCartDetails(data));
    } catch (error) {
      set({ error: true });
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },

  removeCartItem: async (id: number) => {
    try {
      set((state) => ({
        updatingAnElement: true,
        error: false,
        cartItems: state.cartItems.map((item) =>
          item.id === id ? { ...item, disabled: true } : item,
        ),
      }));

      const data = await Api.cart.removeCartItem(id);

      set(getCartDetails(data));
    } catch (error) {
      set({ error: true });
      console.error(error);
    } finally {
      set((state) => ({
        updatingAnElement: false,
        cartItems: state.cartItems.map((item) => ({ ...item, disabled: false })),
      }));
    }
  },
}));
