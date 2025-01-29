'use client'

import { useFormContext } from 'react-hook-form';

import { cn } from '@/shared/lib/utils';
import { ClearButton, ErrorText, Input, RequiredSymbol } from '../../ui';

import type { InputHTMLAttributes } from 'react';

export interface FormInputProps extends PropsWithClassName, InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
}

export const FormInput = (props: FormInputProps) => {
  const { className, name, label, required, ...restProps } = props;

  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  function handleClickClear() {
    setValue(name, '', { shouldValidate: true });
  }

  return (
    <div className={cn(className)}>
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className="relative">
        <Input className="h-12 text-md" {...register(name)} {...restProps} />

        {value && <ClearButton onClick={handleClickClear} />}
      </div>

      {errorText && <ErrorText className="mt-2" text={errorText} />}
    </div>
  );
};
