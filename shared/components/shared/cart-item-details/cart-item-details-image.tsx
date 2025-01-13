import { cn } from '@/shared/lib/utils';

interface CartItemDetailsImageProps extends PropsWithClassName {
  src: string;
}

export const CartItemDetailsImage = (props: CartItemDetailsImageProps) => {
  const { src, className } = props;
  return <img className={cn('w-[60px] h-[60px]', className)} src={src} alt="Изображение пиццы" />;
};
