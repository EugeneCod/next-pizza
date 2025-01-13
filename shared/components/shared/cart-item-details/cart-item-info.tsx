import { cn } from '@/shared/lib/utils';

interface CartItemInfoProps extends PropsWithClassName {
  name: string;
  details: string;
}

export const CartItemInfo = (props: CartItemInfoProps) => {
  const { className, name, details } = props;

  return (
    <div>
      <div className={cn('flex items-center justify-between', className)}>
        <h2 className="text-lg font-bold flex-1 leading-6">{name}</h2>
      </div>
      <p className="text-xs text-gray-400 w-[90%]">{details}</p>
    </div>
  );
};
