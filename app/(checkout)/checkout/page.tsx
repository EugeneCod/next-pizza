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

const defaultValues = {
  email: '',
  firstName: '',
  lastName: '',
  phone: '',
  adress: '',
  comment: '',
};

export default function CheckoutPage() {
  const { totalAmount, cartItems, removeCartItem, handleChangeItemQuantity } = useCart();

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
                cartItems={cartItems}
                onChangeCartItemQuantity={handleChangeItemQuantity}
                onRemoveCartItem={removeCartItem}
              />
              <CheckoutPersonalForm />
             {/*  <Controller
                name="phone"
                control={form.control}
                defaultValue=""
                render={({ field }) => (
                  <IMaskInput
                    {...field}
                    mask="+{7} (000) 000-00-00"
                    placeholder="+7 (___) ___-__-__"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                )}
              />
              <div>{form.formState.errors.phone?.message}</div> */}
              <CheckoutAdressForm />
            </div>
            {/* Правая колонка */}
            <div className="w-[450px]">
              <CheckoutSidebar totalAmount={totalAmount} />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
