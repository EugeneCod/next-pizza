import { useSearchParams } from 'next/navigation';
import { useSet } from 'react-use';
import { type Dispatch, type SetStateAction, useCallback, useMemo, useState } from 'react';

interface PriceRange {
  priceFrom?: number;
  priceTo?: number;
}

export interface QueryFilters {
  priceFrom: string;
  priceTo: string;
  pizzaTypes: string;
  sizes: string;
  ingredients: string;
}

export interface Filters {
  selectedIngredients: Set<string>;
  selectedSizes: Set<string>;
  selectedPizzaTypes: Set<string>;
  priceRange: PriceRange;
}

interface ReturnProps extends Filters {
  changePriceRange: (name: keyof PriceRange, value: number) => void;
  setPriceRange: Dispatch<SetStateAction<PriceRange>>;
  toggleIngredients: (key: string) => void;
  toggleSizes: (key: string) => void;
  togglePizzaTypes: (key: string) => void;
}

export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;

  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(searchParams.get('ingredients')?.split(',')),
  );

  const [selectedSizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(searchParams.has('sizes') ? searchParams.get('sizes')?.split(',') : []),
  );

  const [selectedPizzaTypes, { toggle: togglePizzaTypes }] = useSet(
    new Set<string>(
      searchParams.has('pizzaTypes') ? searchParams.get('pizzaTypes')?.split(',') : [],
    ),
  );

  const [priceRange, setPriceRange] = useState<PriceRange>({
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,
    priceTo: Number(searchParams.get('priceTo')) || undefined,
  });

  const changePriceRange = useCallback((name: keyof PriceRange, value: number) => {
    setPriceRange({
      ...priceRange,
      [name]: value,
    });
  }, []);

  return useMemo(
    () => ({
      selectedIngredients,
      selectedSizes,
      selectedPizzaTypes,
      priceRange,
      changePriceRange,
      setPriceRange,
      toggleIngredients,
      toggleSizes,
      togglePizzaTypes,
    }),
    [selectedIngredients, selectedSizes, selectedPizzaTypes, priceRange],
  );
};
