import { Story, StoryItem } from '@prisma/client';
import { axiosInstance } from './instance';

export type StoryWithItems = Story & {
  items: StoryItem[];
};

export const getAll = async () => {
  const { data } = await axiosInstance.get<StoryWithItems[]>('/stories');

  return data;
};
