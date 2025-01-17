'use client';

import { cn } from '@/shared/lib/utils';
import {
  Button,
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui';
import { useEffect, type PropsWithChildren } from 'react';
import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';
import { CartDrawerItem } from './cart-drawer-item';
import { getCartItemDetails } from '@/shared/lib';
import { useCartStore } from '@/shared/store';

interface CartDrawerProps extends PropsWithClassName, PropsWithChildren {}

export const CartDrawer = (props: CartDrawerProps) => {
  const { className, children } = props;

  const { totalAmount, cartItems, fetchCartItems, updateItemQuantity, removeCartItem } =
    useCartStore((state) => state);

  useEffect(() => {
    fetchCartItems();
  }, []);

  function handleClickCountButton(id: number, quantity: number, type: 'plus' | 'minus') {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  }

  function handleClickTrashIcon(id: number) {
    removeCartItem(id);
  }

  return (
    <Sheet>
      <SheetTrigger className={cn(className)}>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
        <SheetHeader>
          <SheetTitle>
            В корзине <span className="font-bold">{cartItems.length} товара</span>
          </SheetTitle>
        </SheetHeader>

        <div className="-mx-6 mt-5 overflow-auto scrollbar flex-1 flex flex-col gap-y-2">
          {cartItems.map((item) => (
            <CartDrawerItem
              key={item.id}
              id={item.id}
              imageUrl={item.imageUrl}
              details={
                item.pizzaSize && item.pizzaType
                  ? getCartItemDetails(item.pizzaType, item.pizzaSize, item.ingredients)
                  : ''
              }
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              onClickCountButton={(type) => {
                handleClickCountButton(item.id, item.quantity, type);
              }}
              onClickTrashIcon={handleClickTrashIcon}
            />
          ))}
        </div>

        <SheetFooter className="-mx-6 bg-white p-8">
          <div className="w-full">
            <div className="flex mb-4">
              <span className="flex flex-1 text-lg text-neutral-500">
                Итого
                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2"></div>
              </span>

              <span className="font-bold text-lg">{totalAmount} ₽</span>
            </div>

            <Link href="/cart">
              <Button type="submit" className="w-full h-12 text-base">
                Оформить заказ
                <ArrowRightIcon className="w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
