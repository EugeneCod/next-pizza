'use server';

import { cookies } from 'next/headers';

import { prisma } from '@/prisma/prisma-client';
import { createPayment, sendEmail } from '@/shared/lib';

import type { CheckoutFormSchema } from '@/shared/constants/checkout-form-schema';
import { OrderStatus, Prisma } from '@prisma/client';
import { PayOrderEmailTemplate } from '@/shared/components/shared';
import { getUserSession } from '@/shared/lib/get-user-session';
import { hashSync } from 'bcrypt';

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

    // Создать платеж на платежном сервисе
    const paymentData = await createPayment({
      amount: order.totalAmount,
      orderId: order.id,
      description: 'Оплата заказа #' + order.id,
    });

    if (!paymentData) {
      throw new Error('Не удалось создать платеж');
    }

    // Добавить в заказ БД идентификатор платежа
    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentId: paymentData.id,
      },
    });

    const paymentUrl = paymentData.confirmation.confirmation_url;

    // Отправить письмо о платеже на почту пользователя
    await sendEmail(
      data.email,
      'Next-Pizza / Оплатите заказ #' + order.id,
      PayOrderEmailTemplate({
        orderId: order.id,
        totalAmount: order.totalAmount,
        paymentUrl,
      }),
    );

    // Вернуть ссылку на страницу с оплатой
    return paymentUrl;
  } catch (err) {
    console.log('[CreateOrder] Server error', err);
  }
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error('Сессия текущего пользователя не найдена');
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id),
      },
    });

    if (!findUser) {
      throw new Error('Пользователь не найден');
    }

    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: body.password ? hashSync(body.password as string, 10) : findUser?.password,
      },
    });
  } catch (err) {
    console.log('Error [UPDATE_USER]', err);
    throw err;
  }
}
