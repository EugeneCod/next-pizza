'use client';

import {
  CheckoutCartItem,
  CheckoutSidebar,
  Container,
  Title,
  WhiteBlock,
} from '@/shared/components/shared';
import { Input, Textarea } from '@/shared/components/ui';
import { useCart } from '@/shared/hooks';
import { getCartItemDetails } from '@/shared/lib';

export default function CheckoutPage() {
  const { totalAmount, cartItems, removeCartItem, handleChangeItemQuantity } = useCart();

  return (
    <Container className="mt-10">
      <Title className="font-extrabold mb-8 text-[36px]" text="Оформление заказа" />

      <div className="flex gap-10">
        {/* Левая колонка */}
        <div className="flex flex-col flex-1 gap-y-10 mb-20">
          <WhiteBlock title="1. Корзина" contentClassName="flex flex-col gap-y-5">
            {cartItems.map((item) => (
              <CheckoutCartItem
                key={item.id}
                onClickCountButton={handleChangeItemQuantity}
                onClickRemove={removeCartItem}
                id={item.id}
                imageUrl={item.imageUrl}
                details={getCartItemDetails(item.pizzaType, item.pizzaSize, item.ingredients)}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                disabled={item.disabled}
              />
            ))}
          </WhiteBlock>
          <WhiteBlock title="2. Персональные данные">
            <div className="grid grid-cols-2 gap-5">
              <Input className="text-base" name="firstName" placeholder="Имя" />
              <Input className="text-base" name="lastName" placeholder="Фамилия" />
              <Input className="text-base" name="email" placeholder="Электронная почта" />
              <Input className="text-base" name="phone" placeholder="Телефон" />
            </div>
          </WhiteBlock>
          <WhiteBlock title="3. Адрес доставки">
            <div className="flex flex-col gap-5">
              <Input className="text-base" name="firstName" placeholder="Адрес" />
              <Textarea rows={5} className="text-base" placeholder="Комментарий к заказу" />
            </div>
          </WhiteBlock>
        </div>
        {/* Правая колонка */}
        <div className="w-[450px]">
          <CheckoutSidebar totalAmount={totalAmount} />
        </div>
      </div>
    </Container>
  );
}
