import { Ingredient } from '@prisma/client';
import { axiosInstance } from './instance';
import { API_ROUTES } from './constants';

export const getAll = async (): Promise<Ingredient[]> => {
  const { data } = await axiosInstance.get<Ingredient[]>(API_ROUTES.INGREDIENTS);
  return data;
};
