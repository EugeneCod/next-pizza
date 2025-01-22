import { ChooseFormContainer, Container } from '@/shared/components/shared';
import { prisma } from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';
import { ProductWithRelations } from '@/types/prisma';

export default async function ProductPage({ params: { id } }: PageWithParams) {
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      ingredients: true,
      items: true,
    },
  });

  if (!product) return notFound();

  return (
    <Container className="flex flex-col my-10">
      <ChooseFormContainer product={product as ProductWithRelations} />
    </Container>
  );
}
