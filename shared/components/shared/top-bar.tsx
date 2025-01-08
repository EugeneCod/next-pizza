import { cn } from '@/shared/lib/utils';
import { Categories, Container, SortPopup } from '.';
import { Category } from '@prisma/client';

interface ContainerProps {
  className?: string;
  categories: Category[];
}

export const TopBar = (props: ContainerProps) => {
  const { className, categories } = props;
  return (
    <div className={cn('sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10', className)}>
      <Container className="flex items-center justify-between">
        <Categories items={categories} />
        <SortPopup />
      </Container>
    </div>
  );
};
