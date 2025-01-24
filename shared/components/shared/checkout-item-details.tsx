import type { ForwardRefExoticComponent, RefAttributes } from 'react';

import { cn } from '@/shared/lib/utils';
import { LucideProps, PackageIcon } from 'lucide-react';

interface CheckoutItemDetailsProps extends PropsWithClassName {
  title?: string;
  IconComp?: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
  value?: number;
}

export const CheckoutItemDetails = (props: CheckoutItemDetailsProps) => {
  const { className, title, IconComp, value } = props;
  return (
    <div className={cn('flex my-4', className)}>
      <span className="flex flex-1 text-lg text-neutral-500">
        <div className="flex items-center">
          {IconComp && <IconComp size={18} className={'mr-2 text-gray-300'} />}
          {title}
        </div>

        <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
      </span>

      <span className="font-bold text-lg">{value} ₽</span>
    </div>
  );
};
