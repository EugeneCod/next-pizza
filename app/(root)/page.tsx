import { Title, TopBar, Container, Filters, ProductsGroupList } from '@/shared/components/shared';
import {
  getCategoriesWithProducts,
  type GetSearchParams,
} from '@/shared/lib/get-categories-with-products';
import { Suspense } from 'react';

export default async function Home({ searchParams }: PageWithSearchParams<GetSearchParams>) {
  const categoriesWithProducts = await getCategoriesWithProducts(searchParams);

  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>

      <TopBar
        categories={categoriesWithProducts.filter((category) => category.products.length > 0)}
      />

      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          <div className="w-[250px]">
            <Suspense>
              <Filters />
            </Suspense>
          </div>

          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categoriesWithProducts.map(
                (category) =>
                  !!category.products.length && (
                    <ProductsGroupList
                      key={category.id}
                      title={category.name}
                      categoryId={category.id}
                      items={category.products}
                    />
                  ),
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
