import { cn } from '@/shared/lib/utils';
import { GroupVariants, PizzaImage, Title } from '.';
import { Button } from '../ui';
import { pizzaSizes } from '@/shared/constants/pizza';

interface ChoosePizzaFormProps {
  className?: string;
  imageUrl: string;
  name: string;
  ingredients: any[];
  items?: any[];
  onClickAdd?: VoidFunction;
}

export const ChoosePizzaForm = (props: ChoosePizzaFormProps) => {
  const { className, imageUrl, name, ingredients, items, onClickAdd } = props;

  const textDetails = '30 см, традиционное тесто 30';
  const totalPrice = 350;
  const size = 30;

  return (
    <div className={cn('flex flex-1', className)}>
      <PizzaImage imageUrl={imageUrl} size={30} />

      <div className="w-[490px] bg-[#FCFCFC] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">{textDetails}</p>

        <GroupVariants items={pizzaSizes} />

        <Button className="h-14 px-10 text-base rounded-[18px] w-full">
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
