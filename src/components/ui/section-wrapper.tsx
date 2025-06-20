import type { FC, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface SectionWrapperProps extends HTMLAttributes<HTMLElement> {
  id?: string;
  className?: string;
  children: React.ReactNode;
  ariaLabelledby?: string;
}

const SectionWrapper: FC<SectionWrapperProps> = ({ id, className, children, ariaLabelledby, ...props }) => {
  return (
    <section
      id={id}
      className={cn("py-16 md:py-24", className)}
      aria-labelledby={ariaLabelledby || (id ? `${id}-heading` : undefined)}
      {...props}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
};

export default SectionWrapper;
