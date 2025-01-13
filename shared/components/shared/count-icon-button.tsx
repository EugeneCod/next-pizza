import { MinusIcon, PlusIcon } from 'lucide-react';
import { Button } from '../ui';
import { cn } from '@/shared/lib/utils';

import type { CountButtonProps } from './count-button';

interface CountIconButtonProps {
  size?: CountButtonProps['size'];
  disabled?: boolean;
  type?: 'plus' | 'minus';
  onClick: () => void;
}

export const CountIconButton = (props: CountIconButtonProps) => {
  const { size = 'sm', disabled, type, onClick } = props;

  return (
    <Button
      variant="outline"
      disabled={disabled}
      onClick={onClick}
      type="button"
      className={cn(
        'p-0 hover:bg-primary hover:text-white disabled:bg-white disabled:border-gray-400 disabled:text-gray-400',
        size === 'sm' ? 'w-[30px] h-[30px] rounded-[10px]' : 'w-[38px] h-[38px] rounded-md',
      )}>
      {type === 'plus' ? (
        <PlusIcon className={size === 'sm' ? 'h-4' : 'h-5'} />
      ) : (
        <MinusIcon className={size === 'sm' ? 'h-4' : 'h-5'} />
      )}
    </Button>
  );
};
