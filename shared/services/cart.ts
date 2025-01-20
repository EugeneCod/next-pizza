import { axiosInstance } from './instance';
import { API_ROUTES } from './constants';
import { CartDTO, CreateCartItemDTO } from './dto/cart.dto';

export const getCart = async (): Promise<CartDTO> => {
  return (await axiosInstance.get<CartDTO>(API_ROUTES.CART)).data;
};

export const addCartItem = async (values: CreateCartItemDTO): Promise<CartDTO> => {
  return (await axiosInstance.post<CartDTO>(API_ROUTES.CART, values)).data;
};

export const updateCartItemQuantity = async (
  itemId: number,
  quantity: number,
): Promise<CartDTO> => {
  return (await axiosInstance.patch<CartDTO>(`${API_ROUTES.CART}/${itemId}`, { quantity })).data;
};

export const removeCartItem = async (itemId: number): Promise<CartDTO> => {
  return (await axiosInstance.delete<CartDTO>(`${API_ROUTES.CART}/${itemId}`)).data;
};
