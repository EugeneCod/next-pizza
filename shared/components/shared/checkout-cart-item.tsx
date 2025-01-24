'use client';

import React from 'react';
import { cn } from '@/shared/lib/utils';
import { X } from 'lucide-react';
import { CartItemProps } from './cart-item-details/cart-item-details.types';
import * as CartItemDetails from './cart-item-details';

interface CheckoutCartItemProps extends CartItemProps, PropsWithClassName {
  onClickCountButton: (id: number, quantity: number, type: 'plus' | 'minus') => void;
  onClickRemove: (id: number) => void;
}

export const CheckoutCartItem = (props: CheckoutCartItemProps) => {
  const {
    id,
    name,
    price,
    imageUrl,
    quantity,
    details,
    className,
    disabled,
    onClickCountButton,
    onClickRemove,
  } = props;

  return (
    <div
      className={cn(
        'flex items-center justify-between',
        {
          'opacity-50 pointer-events-none': disabled,
        },
        className,
      )}>
      <div className="flex items-center gap-5 flex-1">
        <CartItemDetails.Image src={imageUrl} />
        <CartItemDetails.Info name={name} details={details} />
      </div>

      <CartItemDetails.Price value={price} />

      <div className="flex items-center gap-5 ml-20">
        <CartItemDetails.CountButtons
          onClick={(type) => onClickCountButton(id, quantity, type)}
          value={quantity}
        />
        <button type="button" onClick={() => onClickRemove(id)}>
          <X className="text-gray-400 cursor-pointer hover:text-gray-600" size={20} />
        </button>
      </div>
    </div>
  );
};
