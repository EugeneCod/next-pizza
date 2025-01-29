'use client';

import type { InputHTMLAttributes } from 'react';
import { AddressSuggestions } from 'react-dadata';

import 'react-dadata/dist/react-dadata.css';
import { cn } from '@/shared/lib/utils';

interface AdressInputProps extends PropsWithClassName {
  onChange?: (value?: string) => void;
  placeholder?: string
}

export const AdressInput = (props: AdressInputProps) => {
  const { className, onChange, placeholder } = props;
  const computedClassName = cn(
    `flex h-9 w-full rounded-md border border-input bg-transparent 
    px-3 py-1 text-base shadow-sm transition-colors file:border-0 
    file:bg-transparent file:text-sm file:font-medium 
    file:text-foreground placeholder:text-muted-foreground 
    focus-visible:outline-none focus-visible:ring-1 
    focus-visible:ring-ring disabled:cursor-not-allowed 
    disabled:opacity-50 md:text-sm`,
    className,
  );
  return (
    <AddressSuggestions
      token={process.env.NEXT_PUBLIC_DADATA_API_KEY || ''}
      onChange={(data) => onChange?.(data?.value)}
      count={5}
      inputProps={{ className: computedClassName, placeholder }}
    />
  );
};
