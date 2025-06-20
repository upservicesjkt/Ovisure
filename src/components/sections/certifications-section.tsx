
"use client";

import Image from 'next/image';
import SectionWrapper from '@/components/ui/section-wrapper';
import { BadgeCheck, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const certifications = [
  { 
    src: "https://w.ladicdn.com/s550x650/6635dc99ef5f4900127bad81/imfg29-20250224093106-saj8r-20250514080856-_50o2.png", 
    alt: "Sertifikasi BPOM Ovisure Gold - Halaman 1", 
    name: "Sertifikasi BPOM (1/2)", 
    dataAiHint: "BPOM certificate" 
  },
  { 
    src: "https://w.ladicdn.com/s550x650/6635dc99ef5f4900127bad81/imfg31-20250224093105-zvfdg-20250514080829-l2ygq.jpg", // Note: Same URL as first, assuming it's page 2 of same doc or similar
    alt: "Sertifikasi BPOM Ovisure Gold - Halaman 2", 
    name: "Sertifikasi BPOM (2/2)", 
    dataAiHint: "BPOM certificate page" 
  },
  { 
    src: "https://w.ladicdn.com/s550x650/6635dc99ef5f4900127bad81/imfg32-20250224093105-36bmk-20250514080921-zzx_b.jpg", 
    alt: "Sertifikasi Halal MUI Ovisure Gold - Halaman 1", 
    name: "Sertifikasi Halal MUI (1/2)", 
    dataAiHint: "Halal certificate" 
  },
  { 
    src: "https://w.ladicdn.com/s550x650/6635dc99ef5f4900127bad81/imfg30-20250224093106-5wy2c-20250514080933-u6jas.jpg", 
    alt: "Sertifikasi Halal MUI Ovisure Gold - Halaman 2", 
    name: "Sertifikasi Halal MUI (2/2)", 
    dataAiHint: "Halal certificate page" 
  },
  { 
    src: "https://w.ladicdn.com/s550x650/6635dc99ef5f4900127bad81/imfg27-20250224093106-wozmn-20250514080846-a-wh3.jpg", 
    alt: "Standar Kualitas Internasional Ovisure Gold - Halaman 1", 
    name: "Standar Kualitas Internasional (1/2)", 
    dataAiHint: "ISO GMP certificate" 
  },
  { 
    src: "https://w.ladicdn.com/s550x650/6635dc99ef5f4900127bad81/imfg28-20250224093106-usck9-20250514080910-ixi70.jpg", 
    alt: "Standar Kualitas Internasional Ovisure Gold - Halaman 2", 
    name: "Standar Kualitas Internasional (2/2)", 
    dataAiHint: "quality standard certificate" 
  },
];

const CertificationsSection = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const showPrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? certifications.length - 1 : prevIndex - 1
    );
  };

  const showNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) =>
      prevIndex === certifications.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <SectionWrapper id="sertifikasi" className="bg-background">
      <div className="text-center mb-12">
         <BadgeCheck className="h-16 w-16 text-primary mx-auto mb-4" />
        <h2 id="sertifikasi-heading" className="text-3xl md:text-4xl font-bold text-foreground">
          Terjamin Kualitas & Keamanannya
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Ovisure Gold telah melalui serangkaian uji kualitas dan mendapatkan sertifikasi resmi dari lembaga terpercaya.
        </p>
      </div>

      {/* Mobile: Horizontal scroll */}
      <div className="sm:hidden overflow-x-auto hide-scrollbar w-full py-2">
        <div className="flex space-x-4">
          {certifications.map((cert, index) => (
            <button
              key={`mobile-${index}`}
              onClick={() => openLightbox(index)}
              className="flex-shrink-0 w-72 bg-card flex flex-col items-center p-4 border border-primary/20 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-300 text-left"
              aria-label={`Lihat sertifikat ${cert.name} lebih besar`}
            >
              <div className="relative w-full h-56 mb-3">
                <Image 
                  src={cert.src} 
                  alt={cert.alt} 
                  layout="fill"
                  objectFit="contain"
                  className="rounded-sm"
                  data-ai-hint={cert.dataAiHint}
                  draggable="false"
                />
              </div>
              <h3 className="text-md font-semibold text-foreground text-center mt-auto pt-2">{cert.name}</h3>
            </button>
          ))}
        </div>
      </div>

      {/* Desktop: Grid view */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {certifications.map((cert, index) => (
          <button
            key={`desktop-${index}`}
            onClick={() => openLightbox(index)}
            className="bg-card flex flex-col items-center p-6 border border-primary/20 rounded-lg shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-300 animate-slide-up text-left"
            style={{ animationDelay: `${index * 0.1}s` }}
            aria-label={`Lihat sertifikat ${cert.name} lebih besar`}
          >
            <div className="relative w-full h-64 mb-4"> {/* Increased height for desktop */}
              <Image 
                src={cert.src} 
                alt={cert.alt} 
                layout="fill"
                objectFit="contain"
                className="rounded-md"
                data-ai-hint={cert.dataAiHint}
                draggable="false"
              />
            </div>
            <h3 className="text-lg font-semibold text-foreground text-center mt-auto pt-2">{cert.name}</h3>
          </button>
        ))}
      </div>

      {lightboxOpen && certifications.length > 0 && (
        <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
          <DialogContent className="p-1 max-w-3xl w-[95vw] sm:w-auto bg-transparent border-0 shadow-none !rounded-lg flex items-center justify-center">
            <DialogHeader className="sr-only">
              <DialogTitle>{certifications[currentImageIndex].alt}</DialogTitle>
            </DialogHeader>
            <div className="relative flex items-center justify-center w-full h-full">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={showPrevImage} 
                className="absolute left-1 sm:-left-10 top-1/2 -translate-y-1/2 z-[60] bg-black/40 hover:bg-black/70 text-white rounded-full h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center" 
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
              </Button>
              
              <Image
                src={certifications[currentImageIndex].src}
                alt={certifications[currentImageIndex].alt}
                width={800} 
                height={1000} 
                className="object-contain w-auto h-auto max-w-[75vw] sm:max-w-none sm:max-h-[85vh] rounded-lg shadow-2xl"
                data-ai-hint={certifications[currentImageIndex].dataAiHint}
                draggable="false"
              />
              
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={showNextImage} 
                className="absolute right-1 sm:-right-10 top-1/2 -translate-y-1/2 z-[60] bg-black/40 hover:bg-black/70 text-white rounded-full h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center" 
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
              </Button>
            </div>
            <DialogClose asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-2 right-2 sm:top-0 sm:-right-10 bg-black/40 hover:bg-black/70 text-white rounded-full h-8 w-8 z-[60] flex items-center justify-center" 
                aria-label="Close lightbox"
              >
                <X className="h-5 w-5" />
              </Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      )}
    </SectionWrapper>
  );
};

export default CertificationsSection;
