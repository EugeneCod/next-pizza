'use client';

import { useFormContext } from 'react-hook-form';
import { Textarea, ClearButton } from '../../ui/';

import type { TextareaHTMLAttributes } from 'react';

interface FormTextareaProps
  extends PropsWithClassName,
    TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  required?: boolean;
}

export const FormTextarea = (props: FormTextareaProps) => {
  const { className, name, label, required, ...restProps } = props;

  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  const onClickClear = () => {
    setValue(name, '');
  };

  return (
    <div className={className}>
      <p className="font-medium mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </p>

      <div className="relative">
        <Textarea className="h-12 text-md" {...register(name)} {...restProps} />

        {value && <ClearButton onClick={onClickClear} />}
      </div>

      {errorText && <p className="text-red-500 text-sm mt-2">{errorText}</p>}
    </div>
  );
};
