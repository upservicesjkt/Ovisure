
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ScrollLink from '@/components/scroll-link';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Beranda', href: '#hero' },
  { label: 'Manfaat', href: '#manfaat' },
  { label: 'Kandungan', href: '#kandungan' },
  { label: 'Testimoni', href: '#testimoni' },
  { label: 'Cara Pakai', href: '#cara-pakai' },
  { label: 'Harga', href: '#harga' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  }

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-background/80 backdrop-blur-md shadow-lg" : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="text-2xl font-bold font-headline text-primary">
            Ovisure Gold Official
          </Link>
          
          <nav className="hidden md:flex space-x-6 items-center">
            {navItems.map((item) => (
              <ScrollLink
                key={item.label}
                to={item.href}
                className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
                onClick={closeMenu}
              >
                {item.label}
              </ScrollLink>
            ))}
            <ScrollLink to="#pesan">
              <Button size="sm" className="ml-4">
                <ShoppingCart className="mr-2 h-4 w-4" /> Pesan Sekarang
              </Button>
            </ScrollLink>
          </nav>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background shadow-lg pb-4 animate-fade-in">
          <nav className="flex flex-col space-y-4 px-4 pt-4">
            {navItems.map((item) => (
              <ScrollLink
                key={item.label}
                to={item.href}
                className="block py-2 text-foreground hover:text-primary transition-colors duration-200 font-medium text-center"
                onClick={closeMenu}
              >
                {item.label}
              </ScrollLink>
            ))}
            <ScrollLink to="#pesan" onClick={closeMenu}>
              <Button className="w-full">
                <ShoppingCart className="mr-2 h-4 w-4" /> Pesan Sekarang
              </Button>
            </ScrollLink>
          </nav>
        </div>
      )}
    </header>
  );
}
