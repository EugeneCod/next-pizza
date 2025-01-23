import { type PropsWithChildren } from 'react';

import { Title } from '.';

import { cn } from '@/shared/lib/utils';

interface WhiteBlockProps extends PropsWithChildren {
  title?: string;
  endAdornment?: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export const WhiteBlock = (props: WhiteBlockProps) => {
  const { title, endAdornment, className, contentClassName, children } = props;
  
  return (
    <div className={cn('bg-white rounded-3xl', className)}>
      {title && (
        <div className="flex items-center justify-between p-5 px-7 border-b border-gray-100">
          <Title text={title} size="sm" className="font-bold" />
          {endAdornment}
        </div>
      )}

      <div className={cn('px-5 py-4', contentClassName)}>{children}</div>
    </div>
  );
};
