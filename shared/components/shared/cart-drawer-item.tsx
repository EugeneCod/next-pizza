'use client';

import { cn } from '@/shared/lib/utils';

import * as CartItem from './cart-item-details';
import { CartItemProps } from './cart-item-details/cart-item-details.types';
import { Trash2Icon } from 'lucide-react';

interface CartDrawerItemProps extends PropsWithClassName, CartItemProps {
  onClickCountButton: (type: 'plus' | 'minus') => void;
  onClickTrashIcon: (id: number) => void;
}

export const CartDrawerItem = (props: CartDrawerItemProps) => {
  const {
    className,
    id,
    imageUrl,
    details,
    name,
    price,
    quantity,
    disabled,
    onClickCountButton,
    onClickTrashIcon,
  } = props;
  
  return (
    <div
      className={cn(
        'flex bg-white p-5 gap-6',
        { 'opacity-50 pointer-events-none': disabled },
        className,
      )}>
      <CartItem.Image src={imageUrl} />

      <div className="flex-1">
        <CartItem.Info details={details} name={name} />

        <hr className="my-3" />

        <div className="flex items-center justify-between">
          <CartItem.CountButtons onClick={onClickCountButton} value={quantity} />

          <div className="flex items-center gap-3">
            <CartItem.Price value={price} />
            <Trash2Icon
              onClick={() => {
                onClickTrashIcon(id);
              }}
              className="text-gray-400 cursor-pointer hover:text-gray-600"
              size={16}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
