import { cn } from '@/shared/lib/utils';
import { Title } from '.';
import { Button } from '../ui';

interface ChooseProductFormProps extends PropsWithClassName {
  className?: string;
  imageUrl: string;
  name: string;
  price: number;
  loading: boolean;
  onClickAddCart: () => void;
}

export const ChooseProductForm = (props: ChooseProductFormProps) => {
  const { className, imageUrl, name, price, loading, onClickAddCart } = props;

  return (
    <div className={cn('flex flex-1', className)}>
      <div className="flex items-center justify-center flex-1 relative w-full">
        <img
          src={imageUrl}
          alt={name}
          className="relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]"
        />
      </div>

      <div className="w-[490px] bg-[#FCFCFC] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <Button
          loading={loading}
          onClick={() => onClickAddCart()}
          className="h-14 px-10 text-base rounded-[18px] w-full mt-10">
          Добавить в корзину за {price} ₽
        </Button>
      </div>
    </div>
  );
};
