'use client';

import { useState } from 'react';
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

import {
  CheckoutAddressForm,
  CheckoutCart,
  CheckoutPersonalForm,
  CheckoutSidebar,
  Container,
  Title,
} from '@/shared/components/shared';

import { CheckoutFormSchema, checkoutFormSchema } from '@/shared/constants/checkout-form-schema';

import { useCart } from '@/shared/hooks';
import { createOrder } from '@/app/actions';

const defaultValues = {
  email: '',
  firstName: '',
  lastName: '',
  phone: '',
  address: '',
  comment: '',
};

export default function CheckoutPage() {
  const { totalAmount, cartItems, loading, removeCartItem, handleChangeItemQuantity } = useCart();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<CheckoutFormSchema>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<CheckoutFormSchema> = async (data) => {
    try {
      setSubmitting(true);
      const url = await createOrder(data);
      toast.error('Заказ успешно оформлен! 📝 Переход на оплату... ', {
        icon: '✅',
      });

      if (url) {
        setTimeout(() => {
          location.href = url;
        }, 2500);
      }
    } catch (err) {
      toast.error('Не удалось создать заказ', {
        icon: '❌',
      });
      console.error(err);
    } finally {
      setSubmitting(false);
    }
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
              <CheckoutAddressForm className={loading ? 'opacity-30 pointer-events-none' : ''} />
            </div>
            {/* Правая колонка */}
            <div className="w-[450px]">
              <CheckoutSidebar
                submitting={submitting}
                totalAmount={totalAmount}
                loading={loading}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
