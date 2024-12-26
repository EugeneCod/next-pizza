import { hashSync } from 'bcrypt';
import { prisma } from './prisma-client';
import { CATEGORIES, INGREDIENTS, PRODUCTS } from './constants';
import { Prisma } from '@prisma/client';

function generateProductItem({
  productId,
  pizzaType,
  size,
  price,
}: {
  productId: number;
  pizzaType?: 1 | 2;
  size?: 20 | 30 | 40;
  price: number;
}) {
  return {
    productId,
    price,
    pizzaType,
    size,
  } as Prisma.ProductItemUncheckedCreateInput;
}

async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: 'Userov User',
        email: 'user@test.test',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'USER',
      },
      {
        fullName: 'Adminov Admin',
        email: 'adminr@test.test',
        password: hashSync('222222', 10),
        verified: new Date(),
        role: 'ADMIN',
      },
    ],
  });

  await prisma.category.createMany({
    data: CATEGORIES,
  });

  await prisma.ingredient.createMany({
    data: INGREDIENTS,
  });

  // await prisma.product.createMany({
  //   data: PRODUCTS,
  // });

  for (let PRODUCT of PRODUCTS) {
    await prisma.product.create({
      data: PRODUCT,
    });
  }

  await prisma.cart.createMany({
    data: [
      { userId: 1, totalAmount: 0, token: '1234' },
      { userId: 2, totalAmount: 0, token: '4321' },
    ],
  });

  await prisma.cartItem.create({
    data: {
      productItemId: 1,
      cartId: 1,
      quantity: 2,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    },
  });
  // const pizza1 = await prisma.product.create({
  //   data: PIZZAS[0],
  // });

  // const pizza2 = await prisma.product.create({
  //   data: PIZZAS[1],
  // });

  // const pizza3 = await prisma.product.create({
  //   data: PIZZAS[2],
  // });

  /*  await prisma.productItem.createMany({
    data: [
      generateProductItem({
        productId: pizza1.id,
        pizzaType: 1,
        size: 20,
        price: 250,
      }),
      generateProductItem({
        productId: pizza1.id,
        pizzaType: 1,
        size: 30,
        price: 350,
      }),
      generateProductItem({
        productId: pizza1.id,
        pizzaType: 1,
        size: 40,
        price: 450,
      }),
      generateProductItem({
        productId: pizza1.id,
        pizzaType: 2,
        size: 30,
        price: 500,
      }),
      generateProductItem({
        productId: pizza2.id,
        pizzaType: 1,
        size: 20,
        price: 250,
      }),
      generateProductItem({
        productId: pizza2.id,
        pizzaType: 1,
        size: 30,
        price: 350,
      }),
      generateProductItem({
        productId: pizza2.id,
        pizzaType: 1,
        size: 40,
        price: 450,
      }),
      generateProductItem({
        productId: pizza2.id,
        pizzaType: 2,
        size: 30,
        price: 500,
      }),
      generateProductItem({
        productId: pizza3.id,
        pizzaType: 1,
        size: 20,
        price: 300,
      }),
      generateProductItem({
        productId: pizza3.id,
        pizzaType: 1,
        size: 30,
        price: 400,
      }),
      generateProductItem({
        productId: pizza3.id,
        pizzaType: 1,
        size: 40,
        price: 500,
      }),
      generateProductItem({
        productId: pizza3.id,
        pizzaType: 2,
        size: 30,
        price: 600,
      }),
      generateProductItem({ productId: 1, price: 100 }),

      generateProductItem({ productId: 1, price: 100 }),
      generateProductItem({ productId: 1, price: 100 }),
      generateProductItem({ productId: 1, price: 100 }),
      generateProductItem({ productId: 1, price: 100 }),
      generateProductItem({ productId: 1, price: 100 }),
      generateProductItem({ productId: 1, price: 100 }),
      generateProductItem({ productId: 1, price: 100 }),
      generateProductItem({ productId: 1, price: 100 }),
      generateProductItem({ productId: 1, price: 100 }),
      generateProductItem({ productId: 1, price: 100 }),
      generateProductItem({ productId: 1, price: 100 }),
      generateProductItem({ productId: 1, price: 100 }),
    ],
  }); */
}

async function down() {
  // Такая команда очистит таблицу, но не затронет нумерацию id
  // await prisma.user.deleteMany({})
  // Такая клманда очистит таблицу и связанные строки в других таблицах
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE;`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (err) {
    console.error(err);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
