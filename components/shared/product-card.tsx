import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Title } from '.';
import { Button } from '../ui';
import { PlusIcon } from 'lucide-react';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  className?: string;
}

export const ProductCard = (props: ProductCardProps) => {
  const { id, name, price, imageUrl, className } = props;
  return (
    <Link className={cn('block', className)} href={`/product/${id}`}>
      <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
        <img className="w-[215px] h-[215px]" src={imageUrl} alt={name} />
      </div>

      <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />

      <p className="text-sm text-gray-400">
        Цыпленок, моцарелла, сывы чеддер и пармезан, сырный соус альфредо, чеснок
      </p>

      <div className="flex justify-between items-center mt-4">
        <span className="text-[20px]">
          от <b>{price} ₽</b>
        </span>
        <Button variant="secondary" className="text-base font-bold">
          <PlusIcon size={20} className="mr-1" />
        </Button>
      </div>

      <div> </div>
    </Link>
  );
};
