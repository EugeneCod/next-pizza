export const CATEGORIES = [
  { name: 'Пиццы' },
  { name: 'Завтрак' },
  { name: 'Закуски' },
  { name: 'Коктейли' },
  { name: 'Напитки' },
];

export const INGREDIENTS = [
  {
    name: 'Сырный бортик',
    price: 179,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/99f5cb91225b4875bd06a26d2e842106.png',
  },
  {
    name: 'Сливочная моцарелла',
    price: 79,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/cdea869ef287426386ed634e6099a5ba.png',
  },
  {
    name: 'Сыры чеддер и пармезан',
    price: 79,
    imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA69C1FE796',
  },
  {
    name: 'Острый перец халапеньо',
    price: 59,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/11ee95b6bfdf98fb88a113db92d7b3df.png',
  },
  {
    name: 'Нежный цыпленок',
    price: 79,
    imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA5B328D35A',
  },
  {
    name: 'Шампиньоны',
    price: 59,
    imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA67259A324',
  },
  {
    name: 'Бекон',
    price: 79,
    imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA637AAB68F',
  },
  {
    name: 'Ветчина',
    price: 79,
    imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA61B9A8D61',
  },
  {
    name: 'Пикантная пепперони',
    price: 79,
    imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA6258199C3',
  },
  {
    name: 'Острая чоризо',
    price: 79,
    imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA62D5D6027',
  },
  {
    name: 'Маринованные огурчики',
    price: 59,
    imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9EA89958D782B',
  },
  {
    name: 'Свежие томаты',
    price: 59,
    imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA7AC1A1D67',
  },
  {
    name: 'Красный лук',
    price: 59,
    imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA60AE6464C',
  },
  {
    name: 'Сочные ананасы',
    price: 59,
    imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9AFA6795BA2A0',
  },
  {
    name: 'Итальянские травы',
    price: 39,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/370dac9ed21e4bffaf9bc2618d258734.png',
  },
  {
    name: 'Сладкий перец',
    price: 59,
    imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA63F774C1B',
  },
  {
    name: 'Кубики брынзы',
    price: 79,
    imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA6B0FFC349',
  },
  {
    name: 'Митболы',
    price: 79,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/b2f3a5d5afe44516a93cfc0d2ee60088.png',
  },
].map((obj, index) => ({ id: index + 1, ...obj }));

export const PRODUCTS = [
  {
    name: 'Кола-барбекю',
    imageUrl: '/assets/images/products/pizzas/cola-barbeky-md.avif',
    categoryId: 1,
    ingredients: {
      connect: INGREDIENTS.slice(0, 5),
    },
    items: {
      createMany: {
        data: [
          { pizzaType: 1, size: 20, price: 250 },
          { pizzaType: 1, size: 30, price: 350 },
          { pizzaType: 1, size: 40, price: 450 },
          { pizzaType: 2, size: 30, price: 350 },
        ],
      },
    },
  },
  {
    name: 'Говядина с песто',
    imageUrl: 'https://media.dodostatic.net/image/r:584x584/11ef12b2f6afd043932efbbaf24f90df.avif',
    categoryId: 1,
    ingredients: {
      connect: INGREDIENTS.slice(5, 10),
    },
    items: {
      createMany: {
        data: [
          { pizzaType: 1, size: 20, price: 300 },
          { pizzaType: 1, size: 30, price: 400 },
          { pizzaType: 1, size: 40, price: 500 },
          { pizzaType: 2, size: 30, price: 400 },
        ],
      },
    },
  },
  {
    name: 'Бефстроганов',
    imageUrl: 'https://media.dodostatic.net/image/r:584x584/11eef9e43dc39c94aa5765dbf1c97100.avif',
    categoryId: 1,
    ingredients: {
      connect: INGREDIENTS.slice(10, 40),
    },
    items: {
      createMany: {
        data: [
          { pizzaType: 1, size: 20, price: 250 },
          { pizzaType: 1, size: 30, price: 350 },
          { pizzaType: 1, size: 40, price: 450 },
          { pizzaType: 2, size: 30, price: 350 },
          { pizzaType: 2, size: 40, price: 450 },
        ],
      },
    },
  },
  {
    name: 'Омлет с беконом',
    imageUrl: 'https://media.dodostatic.net/image/r:292x292/0193bb2b74757016b52cbd12b59eeb08.avif',
    //https://media.dodostatic.net/image/r:584x584/0193bb2b74757016b52cbd12b59eeb08.avif
    categoryId: 2,
    items: {
      createMany: {
        data: [{ price: 250 }],
      },
    },
  },
  {
    name: 'Омлет с ветчиной и грибами',
    imageUrl: 'https://media.dodostatic.net/image/r:292x292/0193bb2bfe2a716597c66396669cf5c4.avif',
    categoryId: 2,
    items: {
      createMany: {
        data: [{ price: 300 }],
      },
    },
  },
  {
    name: 'Омлет с пепперони',
    imageUrl: 'https://media.dodostatic.net/image/r:292x292/0193bb2d8ec47819802bf82668571f84.avif',
    categoryId: 2,
    items: {
      createMany: {
        data: [{ price: 250 }],
      },
    },
  },
  {
    name: 'Омлет сырный',
    imageUrl: 'https://media.dodostatic.net/image/r:292x292/0193bb2e95eb70deafab660ed40c5350.avif',
    categoryId: 2,
    items: {
      createMany: {
        data: [{ price: 200 }],
      },
    },
  },
  {
    name: 'Додстер с ветчиной',
    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11ee7970259d888e98b6407ee6b994d9.avif',
    categoryId: 2,
    items: {
      createMany: {
        data: [{ price: 350 }],
      },
    },
  },
  {
    name: 'Сырники со сгущенным молоком',
    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11ef90613992fbc69c3dd4772681c783.avif',
    categoryId: 2,
    items: {
      createMany: {
        data: [{ price: 200 }],
      },
    },
  },
  {
    name: 'Сырники с малиновым вареньем',
    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11ef9060f35d7c26bf41590b9079febe.avif',
    categoryId: 2,
    items: {
      createMany: {
        data: [{ price: 200 }],
      },
    },
  },
  {
    name: 'Сырники',
    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11ef9060dd723610942e8f368b03540a.avif',
    categoryId: 2,
    items: {
      createMany: {
        data: [{ price: 150 }],
      },
    },
  },
  {
    name: 'Кофе Американо',
    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11ee7d61b044583596548a59078bbd33.avif',
    categoryId: 2,
    items: {
      createMany: {
        data: [{ price: 120 }],
      },
    },
  },
  {
    name: 'Кофе Капучино',
    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11ee7d61ae1813b4ab42d8927d061035.avif',
    categoryId: 2,
    items: {
      createMany: {
        data: [{ price: 180 }],
      },
    },
  },
  {
    name: 'Кофе Латте',
    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11ee7d61b0c26a3f85d97a78feee00ad.avif',
    categoryId: 2,
    items: {
      createMany: {
        data: [{ price: 200 }],
      },
    },
  },
  {
    name: 'Завтрак на двоих',
    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11ef112c05b1b9c193648449783c1a82.avif',
    categoryId: 2,
    items: {
      createMany: {
        data: [{ price: 600 }],
      },
    },
  },
  {
    name: 'Креветки',
    imageUrl: 'https://media.dodostatic.net/image/r:233x233/11ef549430d2adb3b91245f0b40bec66.avif',
    categoryId: 3,
    items: {
      createMany: {
        data: [{ price: 450 }],
      },
    },
  },
  {
    name: 'Дэнвич с говядиной',
    imageUrl: 'https://media.dodostatic.net/image/r:233x233/11ef023c30bf9e6ba72d6abb6375a56d.avif',
    categoryId: 3,
    items: {
      createMany: {
        data: [{ price: 500 }],
      },
    },
  },
  {
    name: 'Дэнвич ветчина и сыр',
    imageUrl: 'https://media.dodostatic.net/image/r:233x233/11ee796ff0059b799a17f57a9e64c725.avif',
    categoryId: 3,
    items: {
      createMany: {
        data: [{ price: 500 }],
      },
    },
  },
  {
    name: 'Дэнвич чоризо барбекю',
    imageUrl: 'https://media.dodostatic.net/image/r:233x233/11ee796ff041fe1f94c903576dcfd01e.avif',
    categoryId: 3,
    items: {
      createMany: {
        data: [{ price: 450 }],
      },
    },
  },
  {
    name: 'Молочный коктейль Ежевика-малина',
    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11ef4ce5fc600b3f988c3672be140fe4.avif',
    categoryId: 4,
    items: {
      createMany: {
        data: [{ price: 180 }],
      },
    },
  },
  {
    name: 'Молочный коктейль Пина Колада',
    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11eea69d93f852e5bbc7c51280251105.avif',
    categoryId: 4,
    items: {
      createMany: {
        data: [{ price: 200 }],
      },
    },
  },
  {
    name: 'Молочный коктейль с печеньем Орео',
    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11ee796fca8ea5a49919d649a3a981cf.avif',
    categoryId: 4,
    items: {
      createMany: {
        data: [{ price: 220 }],
      },
    },
  },
  {
    name: 'Классический молочный коктейль',
    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11ee796fcabb2d2d86b11a6bf020478d.avif',
    categoryId: 4,
    items: {
      createMany: {
        data: [{ price: 200 }],
      },
    },
  },
  {
    name: 'Какао',
    imageUrl: 'https://media.dodostatic.net/image/r:233x233/11ee79702dc5ea0ebf92e2483db89b11.avif',
    categoryId: 5,
    items: {
      createMany: {
        data: [{ price: 150 }],
      },
    },
  },
  {
    name: 'Лимонад Арбузный лайм',
    imageUrl: 'https://media.dodostatic.net/image/r:233x233/11ee8f6b54e7d91994d7806bc60e29c9.avif',
    categoryId: 5,
    items: {
      createMany: {
        data: [{ price: 80 }],
      },
    },
  },
  {
    name: 'Добрый Кола Малина',
    imageUrl: 'https://media.dodostatic.net/image/r:233x233/11eecf75d8792640a28a2bef37367897.avif',
    categoryId: 5,
    items: {
      createMany: {
        data: [{ price: 80 }],
      },
    },
  },
  {
    name: 'Добрый Кола',
    imageUrl: 'https://media.dodostatic.net/image/r:233x233/11ee7d61823be0d3a35b4abf658fd06b.avif',
    categoryId: 5,
    items: {
      createMany: {
        data: [{ price: 80 }],
      },
    },
  },
];
