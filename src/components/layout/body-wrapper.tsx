
"use client";

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BodyWrapperProps {
  children: ReactNode;
  className?: string;
}

export default function BodyWrapper({ children, className }: BodyWrapperProps) {
  return (
    <body
      className={cn(className)}
      onContextMenu={(e: React.MouseEvent<HTMLBodyElement>) => {
        if ((e.target as HTMLElement).tagName.toUpperCase() === 'IMG') {
          e.preventDefault();
        }
      }}
    >
      {children}
    </body>
  );
}
