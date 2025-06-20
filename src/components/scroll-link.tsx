"use client";

import type { AnchorHTMLAttributes, FC } from 'react';
import { cn } from '@/lib/utils';

interface ScrollLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
}

const ScrollLink: FC<ScrollLinkProps> = ({ to, children, className, ...props }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetElement = document.getElementById(to.substring(1)); // Remove # from ID
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <a href={to} onClick={handleClick} className={cn(className)} {...props}>
      {children}
    </a>
  );
};

export default ScrollLink;
