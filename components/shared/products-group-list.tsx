'use client';

import { cn } from '@/lib/utils';
import { ProductCard, Title } from '.';
import { useIntersection } from 'react-use';
import { useEffect, useRef } from 'react';

interface ProductsGroupListProps {
  title: string;
  items: any[];
  categoryId: number;
  listClassName?: string;
  className?: string;
}

export const ProductsGroupList = (props: ProductsGroupListProps) => {
  const { title, items, categoryId, listClassName, className } = props;

  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });

  useEffect(() => {
    // Если объект в области видимости
    if (intersection?.isIntersecting) {
      console.log(title, categoryId);
    }
  }, [intersection?.isIntersecting]);

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />

      <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
        {items.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.items[0].price}
          />
        ))}
      </div>
    </div>
  );
};
