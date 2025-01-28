import { UseControllerProps, useFormContext } from 'react-hook-form';

import { cn } from '@/shared/lib/utils';
import { ErrorText, MaskedInput, RequiredSymbol } from '../../ui';

import { FormInputProps } from './form-input';
import { IMaskInputProps } from 'react-imask';

type FormMaskedInputProps = FormInputProps & UseControllerProps & IMaskInputProps<HTMLInputElement>;

export const FormMaskedInput = (props: FormMaskedInputProps) => {
  const { className, name, label, required, ...restProps } = props;

  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();

  const errorText = errors[name]?.message as string;

  return (
    <div className={cn(className)}>
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className="relative">
        <MaskedInput
          onAccept={(value: string) => setValue(name, value)}
          className="h-12 text-md"
          {...register(name)}
          {...restProps}
        />
      </div>

      {errorText && <ErrorText className="mt-2" text={errorText} />}
    </div>
  );
};
