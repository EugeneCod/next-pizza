import { cn } from '@/shared/lib/utils';
import { CartSheetTrigger } from '../ui';
import { ArrowRightIcon, ShoppingCartIcon } from 'lucide-react';
import { CartDrawer } from './cart-drawer';

interface CartButtonProps extends PropsWithClassName {}

export const CartButton = (props: CartButtonProps) => {
  const { className } = props;
  return (
    <CartDrawer>
      <CartSheetTrigger  className={cn('group relative', className)}>
        <b>520 ₽</b>
        <span className="h-full w-[1px] bg-white/30 mx-3" />
        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
          <ShoppingCartIcon size={16} className="relative" strokeWidth={2} />
          <b>3</b>
        </div>
        <ArrowRightIcon
          size={20}
          className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
        />
      </CartSheetTrigger>
    </CartDrawer>
  );
};
