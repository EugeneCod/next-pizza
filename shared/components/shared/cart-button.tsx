'use client';

import { cn } from '@/shared/lib/utils';
import { Button, CartSheetTrigger } from '../ui';
import { ArrowRightIcon, ShoppingCartIcon } from 'lucide-react';
import { CartDrawer } from './cart-drawer';
import { useCartStore } from '@/shared/store';

interface CartButtonProps extends PropsWithClassName {}

export const CartButton = (props: CartButtonProps) => {
  const { className } = props;
  const { totalAmount, loading, cartItems } = useCartStore((state) => state);

  return (
    <CartDrawer>
      <CartSheetTrigger
        loading={loading}
        className={cn('group relative', { 'w-[105px]': loading }, className)}>
        <b>{totalAmount} ₽</b>
        <span className="h-full w-[1px] bg-white/30 mx-3" />
        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
          <ShoppingCartIcon size={16} className="relative" strokeWidth={2} />
          <b>{cartItems.length}</b>
        </div>
        <ArrowRightIcon
          size={20}
          className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
        />
      </CartSheetTrigger>
    </CartDrawer>
  );
};
