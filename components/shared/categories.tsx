'use client';

import { useCategoryStore } from '@/store/category';
import { cn } from '@/lib/utils';

interface CategoriesProps {
  className?: string;
}

const categories = [
  { id: 1, name: 'Пиццы' },
  { id: 2, name: 'Комбо' },
  { id: 3, name: 'Закуски' },
  { id: 4, name: 'Коктейли' },
  { id: 5, name: 'Кофе' },
  { id: 6, name: 'Напитки' },
  { id: 7, name: 'Десерты' },
];

export const Categories = (props: CategoriesProps) => {
  const categoryActiveId = useCategoryStore((state) => state.activeId);
  const { className } = props;
  return (
    <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
      {categories.map((category) => (
        <a
          className={cn(
            'flex items-center font-bold h-11 rounded-2xl px-5',
            categoryActiveId === category.id && 'bg-white shadow-md shadow-gray-200 text-primary',
          )}
          key={category.id}
          href={`/#${category.name}`}>
          <button>{category.name}</button>
        </a>
      ))}
    </div>
  );
};
