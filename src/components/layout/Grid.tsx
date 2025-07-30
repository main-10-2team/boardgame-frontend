import { cn } from '@/utils/cn';
import { ReactNode } from 'react';

interface GridProps {
  children: ReactNode;
  className?: string;
}

interface GridItemProps {
  children: ReactNode;
  span?: string;
  className?: string;
}

const GridItem = ({
  children,
  span = 'col-span-12',
  className,
}: GridItemProps) => {
  return <div className={cn(span, className)}>{children}</div>;
};

const Grid = ({ children, className }: GridProps) => {
  return (
    <section
      aria-label="Grid layout"
      className={cn(
        'mx-auto grid w-full max-w-[1024px]',
        'grid-cols-4 sm:grid-cols-8 md:grid-cols-12',
        'gap-2 sm:gap-4 lg:gap-6',
        'px-4 sm:px-6 lg:px-0',
        className
      )}
    >
      {children}
    </section>
  );
};

Grid.Item = GridItem;

export default Grid;
