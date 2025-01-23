import { CheckoutItemDetails, Container, Title, WhiteBlock } from '@/shared/components/shared';
import { Input, Textarea } from '@/shared/components/ui';

export default function CheckoutPage() {
  const totalAmount = 999;
  const taxAmount = 111;
  const shippingCost = 100;

  return (
    <Container className="mt-10">
      <Title className="font-extrabold mb-8 text-[36px]" text="Оформление заказа" />

      <div className="flex gap-10">
        {/* Левая колонка */}
        <div className="flex flex-col flex-1 gap-y-10 mb-20">
          <WhiteBlock title="1. Корзина"></WhiteBlock>
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
          <WhiteBlock className="p-6 sticky top-4">
            <div className="flex flex-col gap-1">
              <span className="text-xl">Итого:</span>
              <span className="text-[34px] font-extrabold">{3548} ₽</span>
            </div>

            <CheckoutItemDetails title="Стоимость товаров" value={totalAmount} />
            <CheckoutItemDetails title="Налоги" value={taxAmount} />
            <CheckoutItemDetails title="Доставка" value={shippingCost} />
          </WhiteBlock>
        </div>
      </div>
    </Container>
  );
}
