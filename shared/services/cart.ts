import { axiosInstance } from './instance';
import { API_ROUTES } from './constants';
import { CartDTO } from './dto/cart.dto';

export const getCart = async (): Promise<CartDTO> => {
  return (await axiosInstance.get<CartDTO>(API_ROUTES.CART)).data;
};

export const updateItemQuantity = async (itemId: number, quantity: number): Promise<CartDTO> => {
  return (await axiosInstance.patch<CartDTO>(`${API_ROUTES.CART}/${itemId}`, { quantity })).data;
};

export const removeItem = async (itemId: number): Promise<CartDTO> => {
  return (await axiosInstance.delete<CartDTO>(`${API_ROUTES.CART}/${itemId}`)).data;
};
