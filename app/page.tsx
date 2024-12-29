import {
  Title,
  TopBar,
  Container,
  Filters,
  ProductsGroupList,
} from '@/components/shared';

const mockItemsPizzas = [
  {
    id: 1,
    name: 'Чизбургер-пицца',
    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11ef9050501f3fa690a64053f5f07626.avif',
    items: [{ price: 550 }],
  },
  {
    id: 2,
    name: 'Пеперони',
    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11ee7d612fc7b7fca5be822752bee1e5.avif',
    items: [{ price: 680 }],
  },
  {
    id: 3,
    name: 'Пеперони',
    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11ee7d612fc7b7fca5be822752bee1e5.avif',
    items: [{ price: 680 }],
  },
  {
    id: 4,
    name: 'Пеперони',
    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11ee7d612fc7b7fca5be822752bee1e5.avif',
    items: [{ price: 680 }],
  },
  {
    id: 5,
    name: 'Пеперони',
    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11ee7d612fc7b7fca5be822752bee1e5.avif',
    items: [{ price: 680 }],
  },
  {
    id: 6,
    name: 'Пеперони',
    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11ee7d612fc7b7fca5be822752bee1e5.avif',
    items: [{ price: 680 }],
  },
  {
    id: 7,
    name: 'Пеперони',
    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11ee7d612fc7b7fca5be822752bee1e5.avif',
    items: [{ price: 680 }],
  },
];

const mockItemsCombo = [
  {
    id: 1,
    name: 'Бокс-суперпупер',
    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11ef7a3e8180cb1aadc5b1b9860df0a2.avif',
    items: [{ price: 550 }],
  },
  {
    id: 2,
    name: 'Бокс-суперпупер 2',
    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11ef7a3e8180cb1aadc5b1b9860df0a2.avif',
    items: [{ price: 8888 }],
  },
];

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>

      <TopBar />

      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          <div className="w-[250px]">
            <Filters />
          </div>

          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList title="Пиццы" id="pizzas" items={mockItemsPizzas} categoryId={1} />
              <ProductsGroupList title="Комбо" id="kombo" items={mockItemsCombo} categoryId={2} />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
