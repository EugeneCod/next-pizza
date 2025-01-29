import type { ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { cn } from '@/shared/lib/utils';
import { LucideProps } from 'lucide-react';
import { Skeleton } from '../ui';

interface CheckoutItemDetailsProps extends PropsWithClassName {
  title?: string;
  IconComp?: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
  value?: number;
  loading?: boolean;
}

export const CheckoutItemDetails = (props: CheckoutItemDetailsProps) => {
  const { className, title, IconComp, value, loading } = props;
  return (
    <div className={cn('flex my-4', className)}>
      <span className="flex flex-1 text-lg text-neutral-500">
        <div className="flex items-center">
          {IconComp && <IconComp size={18} className={'mr-2 text-gray-300'} />}
          {title}
        </div>

        <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
      </span>
      {loading ? (
        <Skeleton className="h-6 w-14 rounded-[6px]" />
      ) : (
        <span className="font-bold text-lg">{value} ₽</span>
      )}
    </div>
  );
};
