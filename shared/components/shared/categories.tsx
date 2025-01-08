'use client';

import { useCategoryStore } from '@/shared/store/category';
import { cn } from '@/shared/lib/utils';
import { type Category } from '@prisma/client';

interface CategoriesProps {
  className?: string;
  items: Category[];
}

export const Categories = (props: CategoriesProps) => {
  const categoryActiveId = useCategoryStore((state) => state.activeId);
  const { className, items } = props;
  return (
    <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
      {items.map((category) => (
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
