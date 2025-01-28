import { ArrowRightIcon, PackageIcon, PercentIcon, TruckIcon } from 'lucide-react';

import { CheckoutItemDetails, WhiteBlock } from '..';
import { Button } from '../../ui';

const VAT = 15;
const DELIVERY_PRICE = 100;

interface CheckoutSidebarProps {
  totalAmount: number;
}

export const CheckoutSidebar = (props: CheckoutSidebarProps) => {
  const { totalAmount } = props;

  // TODO доделать связь с состоянием отправки формы
  const submitting = false;

  const vatPrice = Math.trunc((totalAmount * VAT) / 100);
  const totalPrice = totalAmount + vatPrice + DELIVERY_PRICE;

  return (
    <WhiteBlock className="p-6 sticky top-4">
      <div className="flex flex-col gap-1">
        <span className="text-xl">Итого:</span>
        <span className="text-[34px] font-extrabold">{totalPrice} ₽</span>
      </div>

      <CheckoutItemDetails title="Стоимость товаров" IconComp={PackageIcon} value={totalAmount} />
      <CheckoutItemDetails title="Налоги" IconComp={PercentIcon} value={vatPrice} />
      <CheckoutItemDetails title="Доставка" IconComp={TruckIcon} value={DELIVERY_PRICE} />
      <Button
        type="submit"
        disabled={!totalAmount || submitting}
        className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
        Перейти к оплате
        <ArrowRightIcon className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
  );
};
