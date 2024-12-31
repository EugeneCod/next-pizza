import { Api } from '@/services/api-client';
import { Ingredient } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useSet } from 'react-use';

interface ReturnProps {
  ingredients: Ingredient[];
  loading: boolean;
  selectedIds: Set<string>;
  onToggleId: (id: string) => void;
}

export const useFilterIngredients = (): ReturnProps => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, { toggle}] = useSet(new Set<string>([]));

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

  return { ingredients, loading, selectedIds, onToggleId: toggle };
};
