import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import qs from 'qs';

import { type Filters } from './use-filters';

export const useQueryFilters = (filters: Filters) => {
  const router = useRouter();

  useEffect(() => {
    const params = {
      ...filters.priceRange,
      pizzaTypes: Array.from(filters.selectedPizzaTypes),
      sizes: Array.from(filters.selectedSizes),
      ingredients: Array.from(filters.selectedIngredients),
    };

    const queryString = qs.stringify(params, { arrayFormat: 'comma' });

    router.push(`?${queryString}`, { scroll: false });
  }, [filters, router]);
};
