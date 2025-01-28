import { cn } from '@/shared/lib/utils';
import { XIcon } from 'lucide-react';

interface ClearButtonProps extends PropsWithClassName {
  onClick: VoidFunction;
}

export const ClearButton = (props: ClearButtonProps) => {
  const { className, onClick } = props;
  return (
    <button
      onClick={onClick}
      className={cn(
        'absolute right-4 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100 cursor-pointer',
        className,
      )}>
      <XIcon className="h-5 w-5" />
    </button>
  );
};
