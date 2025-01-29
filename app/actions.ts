'use server';

import { cookies } from 'next/headers';

import { prisma } from '@/prisma/prisma-client';
import { CheckoutFormSchema } from '@/shared/constants/checkout-form-schema';
import { OrderStatus } from '@prisma/client';

export async function createOrder(data: CheckoutFormSchema) {
  try {
    const { firstName, lastName, email, phone, address, comment } = data;
    const cookieStore = cookies();
    const cartToken = cookieStore.get('cartToken')?.value;

    if (!cartToken) {
      throw new Error('Cart token not found');
    }

    // Получить корзину по токену
    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });

    if (!userCart) {
      throw new Error('Cart not found');
    }

    if (userCart?.totalAmount === 0) {
      throw new Error('Cart is empty');
    }

    // Создать заказ
    const order = await prisma.order.create({
      data: {
        fullName: `${firstName} ${lastName}`,
        email,
        phone,
        address,
        comment,
        token: cartToken,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    });

    // Обнулить стоимость корзины пользователя по ее id
    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    // Удалить товары корзины пользователя по ее id
    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    // TODO Вернуть ссылку на оплату
    return 'https://github.com/EugeneCod';
  } catch (err) {}
}
