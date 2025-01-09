export const mapPizzaSize = {
  20: 'Маленькая',
  30: 'Средняя',
  40: 'Большая',
} as const;

export const mapPizzaType = {
  1: 'Традиционное',
  2: 'Тонкое',
} as const;

export type PizzaSizeValue = keyof typeof mapPizzaSize;
export type PizzaTypeValue = keyof typeof mapPizzaType;
type PizzaSizeName = (typeof mapPizzaSize)[keyof typeof mapPizzaSize];
type PizzaTypeName = (typeof mapPizzaType)[keyof typeof mapPizzaType];

interface PizzaTypes {
  name: PizzaTypeName;
  value: PizzaTypeValue;
}

interface PizzaSizes {
  name: PizzaSizeName;
  value: PizzaSizeValue;
}

export const pizzaSizes = Object.entries(mapPizzaSize).map(([value, name]) => ({
  name,
  value: Number(value),
})) as PizzaSizes[];

export const pizzaTypes = Object.entries(mapPizzaType).map(([value, name]) => ({
  name,
  value: Number(value),
})) as PizzaTypes[];
