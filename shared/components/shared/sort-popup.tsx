import { cn } from '@/shared/lib/utils';
import { ArrowUpDown as ArrowUpDownIcon } from 'lucide-react';

interface ContainerProps {
  className?: string;
}

export const SortPopup = (props: ContainerProps) => {
  const { className } = props;
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 bg-gray-50 px-5 h-[52px] rounded-2xl cursor-pointer',
        className,
      )}>
      <ArrowUpDownIcon size={16} />
      <b>Сортировка:</b>
      <b className="text-primary">популярное</b>
    </div>
  );
};
