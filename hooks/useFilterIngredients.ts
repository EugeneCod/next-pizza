import { Api } from '@/services/api-client';
import { Ingredient } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useSet } from 'react-use';

interface ReturnProps {
  ingredients: Ingredient[];
  loading: boolean;
  selectedIngredients: Set<string>;
  onToggleId: (id: string) => void;
 
}

export const useFilterIngredients = (ids?: string[]): ReturnProps => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIngredients, { toggle }] = useSet(new Set<string>([]));

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

  // function setSelectedIngredients(ids: string[]) {
  //   ids.forEach(selectedIngredients.add);
  // }

  return { ingredients, loading, selectedIngredients, onToggleId: toggle };
};
