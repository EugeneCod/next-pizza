'use client';

import { useEffect, useState } from 'react';
import { useSet } from 'react-use';
import qs from 'qs';

import { Input } from '../ui';
import { CheckboxFiltersGroup, RangeSlider, Title } from '.';
import { useFilterIngredients } from '@/hooks/useFilterIngredients';
import { useRouter, useSearchParams } from 'next/navigation';

interface FiltersProps {
  className?: string;
}

interface PriceRange {
  priceFrom?: number;
  priceTo?: number;
}

interface QueryFilters {
  priceFrom: string;
  priceTo: string;
  pizzaTypes: string;
  sizes: string;
  ingredients: string;
}

const sizeItems = [
  { text: '20см', value: '20' },
  { text: '30см', value: '30' },
  { text: '40см', value: '40' },
];

const pizzaTypes = [
  { text: 'Тонкое', value: '1' },
  { text: 'Традиционное', value: '2' },
];

const initialPriceRange: Required<PriceRange> = {
  priceFrom: 0,
  priceTo: 2000,
};

export const Filters = (props: FiltersProps) => {
  const { className } = props;
  const router = useRouter();
  const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;
  const { ingredients, selectedIngredients, loading, onToggleId } = useFilterIngredients(searchParams.has('ingredients') ? searchParams.get('ingredients')?.split(',') : []);
  const [priceRange, setPriceRange] = useState<PriceRange>({
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,
    priceTo: Number(searchParams.get('priceTo')) || undefined,
  });

  const [selectedSizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(searchParams.has('sizes') ? searchParams.get('sizes')?.split(',') : []),
  );
  const [selectedPizzaTypes, { toggle: togglePizzaTypes }] = useSet(
    new Set<string>(
      searchParams.has('pizzaTypes') ? searchParams.get('pizzaTypes')?.split(',') : [],
    ),
  );

  console.log(searchParams.get('sizes'));

  useEffect(() => {
    const filters = {
      ...priceRange,
      pizzaTypes: Array.from(selectedPizzaTypes),
      sizes: Array.from(selectedSizes),
      ingredients: Array.from(selectedIngredients),
    };

    const queryString = qs.stringify(filters, { arrayFormat: 'comma' });

    router.push(`?${queryString}`, { scroll: false });
  }, [priceRange, selectedSizes, selectedPizzaTypes, selectedIngredients]);

  const ingredientItems = ingredients.map((item) => ({ value: String(item.id), text: item.name }));

  function handleChangePrice(name: keyof PriceRange, value: number) {
    setPriceRange({
      ...priceRange,
      [name]: value,
    });
  }

  return (
    <div className={className}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

      <CheckboxFiltersGroup
        title="Размеры"
        className="mb-5"
        items={pizzaTypes}
        onClickCheckbox={togglePizzaTypes}
        selectedIds={selectedPizzaTypes}
        name="sizes"
      />

      <CheckboxFiltersGroup
        title="Размеры"
        className="mb-5"
        items={sizeItems}
        onClickCheckbox={toggleSizes}
        selectedIds={selectedSizes}
        name="sizes"
      />

      <div className="mt-5 border-y border-y-neutral-100 pt-6 pb-7">
        <p className="font-bold mb-3">Цена от и до</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={initialPriceRange.priceFrom}
            max={initialPriceRange.priceTo}
            value={String(priceRange.priceFrom || initialPriceRange.priceFrom)}
            onChange={(e) => handleChangePrice('priceFrom', Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="2000"
            min={initialPriceRange.priceFrom || 100}
            max={initialPriceRange.priceTo}
            value={String(priceRange.priceTo || initialPriceRange.priceTo)}
            onChange={(e) => handleChangePrice('priceTo', Number(e.target.value))}
          />
        </div>
        <RangeSlider
          min={0}
          max={2000}
          step={10}
          value={[
            priceRange.priceFrom || initialPriceRange.priceFrom,
            priceRange.priceTo || initialPriceRange.priceTo,
          ]}
          onValueChange={([priceFrom, priceTo]) => setPriceRange({ priceFrom, priceTo })}
        />
      </div>

      <CheckboxFiltersGroup
        title="Ингридиенты"
        className="mt-5"
        limit={6}
        loading={loading}
        defaultItems={ingredientItems.slice(0, 6)}
        items={ingredientItems}
        onClickCheckbox={onToggleId}
        selectedIds={selectedIngredients}
        name="ingredients"
      />
    </div>
  );
};
