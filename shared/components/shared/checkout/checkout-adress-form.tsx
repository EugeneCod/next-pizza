import { cn } from '@/shared/lib/utils';
import { FormInput, FormTextarea, WhiteBlock } from '..';
import { AdressInput } from '../address-input';

interface CheckoutAdressFormProps extends PropsWithClassName {}

export const CheckoutAdressForm = (props: CheckoutAdressFormProps) => {
  const { className } = props;
  return (
    <WhiteBlock className={cn(className)} title="3. Адрес доставки">
      <div className="flex flex-col gap-5">
        <FormInput className="text-base" name="adress" placeholder="Адрес" />

        <AdressInput />

        <FormTextarea
          name="comment"
          rows={5}
          className="text-base"
          placeholder="Комментарий к заказу"
        />
      </div>
    </WhiteBlock>
  );
};
