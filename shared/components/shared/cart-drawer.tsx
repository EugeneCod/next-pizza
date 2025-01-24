'use client';

import { useEffect, type PropsWithChildren } from 'react';
import { ArrowLeft, ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

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
import { CartDrawerItem, Title } from '.';

import { cn } from '@/shared/lib/utils';
import { getCartItemDetails } from '@/shared/lib';
import { useCart } from '@/shared/hooks';

interface CartDrawerProps extends PropsWithClassName, PropsWithChildren {}

export const CartDrawer = (props: CartDrawerProps) => {
  const { className, children } = props;

  const { totalAmount, cartItems, removeCartItem, handleChangeItemQuantity } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild className={cn(className)}>
        {children}
      </SheetTrigger>
      <SheetContent
        aria-describedby={'asdas'}
        className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
        <div className={cn('flex flex-col h-full', !totalAmount && 'justify-center')}>
          {totalAmount > 0 && (
            <SheetHeader>
              <SheetTitle>
                Количество товаров в корзине: <span className="font-bold">{cartItems.length}</span>
              </SheetTitle>
            </SheetHeader>
          )}

          {!totalAmount && (
            <div className="flex flex-col items-center justify-center w-72 mx-auto">
              <Image
                src="/assets/images/empty-box.png"
                alt="Корзина пуста"
                width={120}
                height={120}
              />
              <Title size="sm" text="Корзина пустая" className="text-center font-bold my-2" />
              <p className="text-center text-neutral-500 mb-5">
                Добавьте хотя бы один товар, чтобы совершить заказ
              </p>

              <SheetClose>
                <Button className="w-56 h-12 text-base" size="lg">
                  <ArrowLeft className="w-5 mr-2" />
                  Вернуться назад
                </Button>
              </SheetClose>
            </div>
          )}

          {totalAmount > 0 && (
            <>
              <div className="-mx-6 mt-5 overflow-auto scrollbar flex-1 flex flex-col gap-y-2">
                {cartItems.map((item) => (
                  <CartDrawerItem
                    key={item.id}
                    id={item.id}
                    imageUrl={item.imageUrl}
                    details={getCartItemDetails(item.pizzaType, item.pizzaSize, item.ingredients)}
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                    disabled={item.disabled}
                    onClickCountButton={handleChangeItemQuantity}
                    onClickRemove={removeCartItem}
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

                  <Link href="/checkout">
                    <Button type="submit" className="w-full h-12 text-base">
                      Оформить заказ
                      <ArrowRightIcon className="w-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </SheetFooter>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
