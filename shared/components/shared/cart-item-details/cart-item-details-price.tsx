import { cn } from '@/shared/lib/utils';

interface CartItemDetailsPriceProps extends PropsWithClassName {
  value: number;
}

export const CartItemDetailsPrice = (props: CartItemDetailsPriceProps) => {
  const { value, className } = props;
  return <h2 className={cn('font-bold', className)}>{value} ₽</h2>;
};
