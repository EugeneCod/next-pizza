import { cn } from '@/shared/lib/utils';
import { FormInput, FormMaskedInput, WhiteBlock } from '..';

interface CheckoutPersonalFormProps extends PropsWithClassName {}

export const CheckoutPersonalForm = (props: CheckoutPersonalFormProps) => {
  const { className } = props;
  return (
    <WhiteBlock className={cn(className)} title="2. Персональные данные">
      <div className="grid grid-cols-2 gap-5">
        <FormInput className="text-base" name="firstName" placeholder="Имя" />
        <FormInput className="text-base" name="lastName" placeholder="Фамилия" />
        <FormInput className="text-base" name="email" placeholder="Электронная почта" />
        <FormMaskedInput
          mask="+{7} (000) 000-00-00"
          placeholder="+7 (___) ___-__-__"
          className="text-base"
          name="phone"
          unmask={true}
        />
      </div>
    </WhiteBlock>
  );
};
