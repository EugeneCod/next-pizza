import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { findOrCreateCart, updateCartTotalAmount } from '@/shared/lib';
import { CreateCartItemDTO } from '@/shared/services/dto/cart.dto';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json({ totlaAmount: 0, items: [] });
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [
          {
            token,
          },
        ],
      },
      include: {
        items: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            productItem: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
    });
    return NextResponse.json(userCart);
  } catch (error) {
    console.log('[CART_GET] Server error', error);
    return NextResponse.json({ message: 'Не удалось получить корзину' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get('cartToken')?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    const userCart = await findOrCreateCart(token);

    const { productItemId, ingredientsIds } = (await req.json()) as CreateCartItemDTO;

    const ingredientsIdsString = ingredientsIds.toSorted((a, b) => a - b).toString();

    const cartItemsByProductItemId = await prisma.cartItem.findMany({
      where: {
        cartId: userCart.id,
        productItemId,
      },
      include: {
        ingredients: true,
      },
    });

    const cartItemsWithIngredientsIds = cartItemsByProductItemId.map((item) => ({
      ...item,
      ingredients: item.ingredients.map((ingredient) => ingredient.id).toSorted((a, b) => a - b),
    }));

    const findCartItem = cartItemsWithIngredientsIds.find(
      (cartItem) => cartItem.ingredients.toString() === ingredientsIdsString,
    );

    // Если товар уже ранее добавлялся в корзину, то прибавляется количество на 1
    if (findCartItem) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      });
    } else {
      // Если товар ранее не добавлялся в корзину
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productItemId,
          ingredients: { connect: ingredientsIds.map((id) => ({ id })) },
        },
      });
    }

    const updatedUserCart = await updateCartTotalAmount(token);
    const response = NextResponse.json(updatedUserCart);
    response.cookies.set('cartToken', token, { maxAge: 60 * 60 * 24 * 7 });
    return response;
  } catch (error) {
    console.log('[CART_POST] Server error', error);
    return NextResponse.json({ message: 'Не удалось создать корзину' }, { status: 500 });
  }
}
