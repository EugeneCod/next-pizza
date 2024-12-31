'use client';

import { useRef, useState } from 'react';
import { SearchIcon } from 'lucide-react';
import { useClickAway, useDebounce } from 'react-use';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Api } from '@/services/api-client';
import { Product } from '@prisma/client';

interface SearchInputProps {
  className?: string;
}

export const SearchInput = (props: SearchInputProps) => {
  const { className } = props;
  const [searchQuery, setSearchQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useClickAway(ref, () => {
    setFocused(false);
  });

  useDebounce(
    () => {
      Api.products
        .search(searchQuery)
        .then((items) => {
          setProducts(items);
        })
        .catch(console.error);
    },
    200,
    [searchQuery],
  );

  const onClickItem = () => {
    setFocused(false);
    setSearchQuery('');
    setProducts([]);
  };

  return (
    <>
      {focused && <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30" />}
      <div
        ref={ref}
        className={cn('flex rounded-2xl flex-1 justify-between relative h-11 z-30', className)}>
        <SearchIcon className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
        <input
          className="rounded-2xl outline-none w-full bg-gray-100 pl-11"
          type="text"
          placeholder="Найти пиццу"
          onFocus={() => setFocused(true)}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {!!products.length && (
          <div
            className={cn(
              'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
              focused && 'visible opacity-100 top-12',
            )}>
            {products.map((product) => (
              <Link
                key={product.id}
                onClick={onClickItem}
                className="flex items-center gap-x-3 px-3 py-2 hover:bg-primary/10 cursor-pointer"
                href={`/products/${product.id}`}>
                <img src={product.imageUrl} className="w-8 h-8 rounded-sm" alt={product.name} />
                <span>{product.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
