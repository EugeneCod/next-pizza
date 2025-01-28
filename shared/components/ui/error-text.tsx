import { cn } from '@/shared/lib/utils';

interface ErrorTextProps extends PropsWithClassName {
  text: string;
}

export const ErrorText = (props: ErrorTextProps) => {
  const { className, text } = props;
  return <p className={cn('text-red-500 text-sm', className)}>{text}</p>;
};
