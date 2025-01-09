import { ChooseProductModal } from '@/shared/components/shared';
import { prisma } from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';
import { ProductWithRelations } from '@/types/prisma';

export default async function ProductModalPage({ params: { id } }: PageWithParams) {
  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      ingredients: true,
      items: true,
    },
  });
  if (!product) {
    return notFound();
  }
  return <ChooseProductModal product={product as ProductWithRelations} />;
}
