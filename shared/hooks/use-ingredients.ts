import { Api } from '@/shared/services/api-client';
import { Ingredient } from '@prisma/client';
import { useEffect, useState } from 'react';

export const useIngredients = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Api.ingredients
      .getAll()
      .then((items) => {
        setIngredients(items);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { ingredients, loading };
};
