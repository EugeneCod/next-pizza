import { useEffect } from 'react';

import { useCartStore } from '../store';

export const useCart = () => {
  const { fetchCartItems, updateItemQuantity, ...cartState } = useCartStore((state) => state);

  function handleChangeItemQuantity(id: number, quantity: number, type: 'plus' | 'minus') {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  }

  useEffect(() => {
    fetchCartItems();
  }, []);

  return { ...cartState, handleChangeItemQuantity };
};
