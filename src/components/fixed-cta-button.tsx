"use client";

import { Button } from '@/components/ui/button';
import ScrollLink from '@/components/scroll-link';
import { ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const FixedCtaButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button if scrolled more than a certain amount (e.g., 300px)
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  
  return (
    <div className={cn(
        "fixed bottom-4 right-4 z-50 transition-opacity duration-300",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}>
      <ScrollLink to="#pesan">
        <Button size="lg" className="shadow-2xl animate-pulse">
          <ShoppingCart className="mr-2 h-5 w-5" />
          Pesan Sekarang
        </Button>
      </ScrollLink>
    </div>
  );
};

export default FixedCtaButton;
