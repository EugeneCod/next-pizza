import { cn } from '@/shared/lib/utils';
import { FormTextarea, WhiteBlock } from '..';
import { AdressInput } from '../address-input';
import { Controller, useFormContext } from 'react-hook-form';
import { ErrorText } from '../../ui';

interface CheckoutAdressFormProps extends PropsWithClassName {}

export const CheckoutAdressForm = (props: CheckoutAdressFormProps) => {
  const { className } = props;

  const { control } = useFormContext();
  return (
    <WhiteBlock className={cn(className)} title="3. Адрес доставки">
      <div className="flex flex-col gap-5">
        <Controller
          name="address"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <AdressInput onChange={field.onChange} placeholder="Адрес" />{' '}
              {fieldState.error?.message && <ErrorText text={fieldState.error?.message} />}
            </>
          )}
        />
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
