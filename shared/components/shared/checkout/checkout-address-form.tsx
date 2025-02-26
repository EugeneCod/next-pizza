'use client'

import { cn } from '@/shared/lib/utils';
import { FormTextarea, WhiteBlock } from '..';
import { AddressInput } from '../address-input';
import { Controller, useFormContext } from 'react-hook-form';
import { ErrorText } from '../../ui';

interface CheckoutAddressFormProps extends PropsWithClassName {}

export const CheckoutAddressForm = (props: CheckoutAddressFormProps) => {
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
              <AddressInput onChange={field.onChange} placeholder="Адрес" />{' '}
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
