'use client';

import { Controller, FormProvider, useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  CheckoutAdressForm,
  CheckoutCart,
  CheckoutPersonalForm,
  CheckoutSidebar,
  Container,
  Title,
} from '@/shared/components/shared';

import { CheckoutFormSchema, checkoutFormSchema } from '@/shared/constants/checkout-form-schema';

import { useCart } from '@/shared/hooks';
import { IMaskInput } from 'react-imask';
import { cn } from '@/shared/lib/utils';

const defaultValues = {
  email: '',
  firstName: '',
  lastName: '',
  phone: '',
  adress: '',
  comment: '',
};

export default function CheckoutPage() {
  const {
    totalAmount,
    cartItems,
    loading,
    removeCartItem,
    handleChangeItemQuantity,
  } = useCart();

  const form = useForm<CheckoutFormSchema>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<CheckoutFormSchema> = (data) => {
    console.log(data);
  };

  return (
    <Container className="mt-10">
      <Title className="font-extrabold mb-8 text-[36px]" text="Оформление заказа" />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            {/* Левая колонка */}
            <div className="flex flex-col flex-1 gap-y-10 mb-20">
              <CheckoutCart
                loading={loading}
                cartItems={cartItems}
                onChangeCartItemQuantity={handleChangeItemQuantity}
                onRemoveCartItem={removeCartItem}
              />
              <CheckoutPersonalForm className={loading ? 'opacity-30 pointer-events-none' : ''} />
              <CheckoutAdressForm className={loading ? 'opacity-30 pointer-events-none' : ''} />
            </div>
            {/* Правая колонка */}
            <div className="w-[450px]">
              <CheckoutSidebar totalAmount={totalAmount} loading={loading} />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
