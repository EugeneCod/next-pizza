import { cn } from '@/shared/lib/utils';
import React from 'react';
import { CountIconButton } from '.';

export interface CountButtonsProps extends PropsWithClassName {
  value?: number;
  size?: 'sm' | 'lg';
  onClick: (type: 'plus' | 'minus') => void;
}

export const CountButtons = (props: CountButtonsProps) => {
  const { className, onClick, value = 1, size = 'sm' } = props;

  return (
    <div className={cn('inline-flex items-center justify-between gap-3', className)}>
      <CountIconButton
        onClick={() => onClick('minus')}
        disabled={value === 1}
        size={size}
        type="minus"
      />

      <b className={size === 'sm' ? 'text-sm' : 'text-md'}>{value}</b>

      <CountIconButton onClick={() => onClick('plus')} size={size} type="plus" />
    </div>
  );
};
