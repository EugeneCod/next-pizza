'use client';

import { Input } from '../ui';
import { CheckboxFiltersGroup, RangeSlider, Title } from '.';
import { useFilters, useIngredients, useQueryFilters } from '@/shared/hooks';
import { pizzaSizes, pizzaTypes } from '@/shared/constants/pizza';
import { memo } from 'react';

interface FiltersProps {
  className?: string;
}

const initialPriceRange = {
  priceFrom: 0,
  priceTo: 2000,
};

export const Filters = memo((props: FiltersProps) => {
  const { className } = props;

  const { ingredients, loading } = useIngredients();
  const filters = useFilters();
  useQueryFilters(filters);

  const ingredientItems = ingredients.map((item) => ({ value: String(item.id), text: item.name }));

  return (
    <div className={className}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

      <CheckboxFiltersGroup
        title="Тип теста"
        className="mb-5"
        items={pizzaTypes.map(({ name, value }) => ({ text: name, value: String(value) }))}
        onClickCheckbox={filters.togglePizzaTypes}
        selectedIds={filters.selectedPizzaTypes}
        name="sizes"
      />

      <CheckboxFiltersGroup
        title="Размеры"
        className="mb-5"
        items={pizzaSizes.map(({ name, value }) => ({ text: name, value: String(value) }))}
        onClickCheckbox={filters.toggleSizes}
        selectedIds={filters.selectedSizes}
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
            value={String(filters.priceRange.priceFrom || initialPriceRange.priceFrom)}
            onChange={(e) => filters.changePriceRange('priceFrom', Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="2000"
            min={initialPriceRange.priceFrom || 100}
            max={initialPriceRange.priceTo}
            value={String(filters.priceRange.priceTo || initialPriceRange.priceTo)}
            onChange={(e) => filters.changePriceRange('priceTo', Number(e.target.value))}
          />
        </div>
        <RangeSlider
          min={0}
          max={2000}
          step={10}
          value={[
            filters.priceRange.priceFrom || initialPriceRange.priceFrom,
            filters.priceRange.priceTo || initialPriceRange.priceTo,
          ]}
          onValueChange={([priceFrom, priceTo]) => filters.setPriceRange({ priceFrom, priceTo })}
        />
      </div>

      <CheckboxFiltersGroup
        title="Ингридиенты"
        className="mt-5"
        limit={6}
        loading={loading}
        defaultItems={ingredientItems.slice(0, 6)}
        items={ingredientItems}
        onClickCheckbox={filters.toggleIngredients}
        selectedIds={filters.selectedIngredients}
        name="ingredients"
      />
    </div>
  );
});
