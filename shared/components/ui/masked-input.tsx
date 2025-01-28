'use client';

import { InputHTMLAttributes } from 'react';
import { IMaskInputProps, IMaskMixin } from 'react-imask';
import { Input } from '.';

type MaskedInputProps = IMaskInputProps<HTMLInputElement> & InputHTMLAttributes<HTMLInputElement>;

export const MaskedInput = IMaskMixin(({ inputRef, ...props }: MaskedInputProps) => {
  return <Input ref={inputRef} {...props} />;
});
