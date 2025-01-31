import { prisma } from '@/prisma/prisma-client';
import { OrderSuccessEmailTemplate, OrderCancelledEmailTemplate } from '@/shared/components/shared';
import { sendEmail } from '@/shared/lib';
import { CartItemDTO } from '@/shared/services/dto/cart.dto';
import { PaymentCallbackData } from '@/types/yookassa';
import { OrderStatus } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PaymentCallbackData;
    const order = await prisma.order.findFirst({
      where: {
        id: Number(body.object.metadata.order_id),
      },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' });
    }

    const isSucceeded = body.object.status === 'succeeded';

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED,
      },
    });

    const items = JSON.parse(order.items as string) as CartItemDTO[];

    if (isSucceeded) {
      await sendEmail(
        order.email,
        'Next-Pizza / Ваш заказ успешно оплачен',
        OrderSuccessEmailTemplate({ orderId: order.id, items }),
      );
    } else {
      await sendEmail(
        order.email,
        'Next-Pizza / Ваш заказ отменен',
        OrderCancelledEmailTemplate({ orderId: order.id }),
      );
    }
  } catch (error) {
    console.error('[Checkout Callback] Error:', error);
    return NextResponse.json('Error', { status: 500 });
  }
}
