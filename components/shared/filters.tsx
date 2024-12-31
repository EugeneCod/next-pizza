'use client';

import { useFilterIngredients } from '@/hooks/useFilterIngredients';
import { CheckboxFiltersGroup, RangeSlider, Title } from '.';
import { FilterCheckbox } from '.';
import { Input } from '../ui';
import { useState } from 'react';

interface FiltersProps {
  className?: string;
}

interface PriceRange {
  from: number;
  to: number;
}

export const Filters = (props: FiltersProps) => {
  const { className } = props;
  const { ingredients, selectedIds, loading, onToggleId } = useFilterIngredients();
  const [priceRange, setPriceRange] = useState<PriceRange>({ from: 0, to: 2000 });

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

      <div className="flex flex-col gap-4">
        <FilterCheckbox name="can-collect" text="Можно собирать" value="1" />
        <FilterCheckbox name="new-products" text="Новинки" value="2" />
      </div>

      <div className="mt-5 border-y border-y-neutral-100 pt-6 pb-7">
        <p className="font-bold mb-3">Цена от и до</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={2000}
            value={String(priceRange.from)}
            onChange={(e) => handleChangePrice('from', Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="2000"
            min={100}
            max={2000}
            value={String(priceRange.to)}
            onChange={(e) => handleChangePrice('to', Number(e.target.value))}
          />
        </div>
        <RangeSlider
          min={0}
          max={2000}
          step={10}
          value={[priceRange.from, priceRange.to]}
          onValueChange={([from, to]) => setPriceRange({ from, to })}
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
        selectedIds={selectedIds}
        name="ingredients"
      />
    </div>
  );
};
