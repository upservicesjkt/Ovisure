
"use client";

import Image from 'next/image';
import SectionWrapper from '@/components/ui/section-wrapper';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

const galleryImages = [
  { src: "https://w.ladicdn.com/s750x1100/6635dc99ef5f4900127bad81/screenshot-2025-02-24-164205-20250224094234-b2jrw-20250514082916-69gi4.png", alt: "Ovisure Gold User Holding Product", dataAiHint: "person product" },
  { src: "https://w.ladicdn.com/s750x1300/6635dc99ef5f4900127bad81/imfg52-20250224094436-ztq7o-20250514083006-prrwh.jpg", alt: "Ovisure Gold Close Up", dataAiHint: "product detail" },
  { src: "https://w.ladicdn.com/s750x1000/6635dc99ef5f4900127bad81/imfg53-20250224094436-vwca2-20250514083049-vndt-.jpg", alt: "Ovisure Gold Lifestyle with Nature", dataAiHint: "lifestyle nature" },
  { src: "https://w.ladicdn.com/s550x800/6635dc99ef5f4900127bad81/whatsapp-image-2023-07-04-at-215401-1-20230705083033-_0ot0-20250514085407-qcae2.jpg", alt: "Ovisure Gold Product Information Card", dataAiHint: "product info card" },
  { src: "https://w.ladicdn.com/s550x750/6635dc99ef5f4900127bad81/whatsapp-image-2023-07-04-at-215400-1-20230705083033-u9ymo-20250514085409-mu6zl.jpg", alt: "Ovisure Gold Can with Hand", dataAiHint: "product hand" },
  { src: "https://w.ladicdn.com/s550x800/6635dc99ef5f4900127bad81/whatsapp-image-2023-07-04-at-215401-20230705083034-kii3o-20250514085416-8vagn.jpg", alt: "Ovisure Gold Full Product Display", dataAiHint: "product display full" },
  { src: "https://w.ladicdn.com/s550x700/6635dc99ef5f4900127bad81/whatsapp-image-2023-07-04-at-215400-20230705083033-vxv5d-20250514085421-m0juz.jpg", alt: "Ovisure Gold Packaging Detail", dataAiHint: "packaging detail" },
];

const GallerySection = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<{ src: string; alt: string; dataAiHint: string; } | null>(null);

  const handleImageClick = (image: { src: string; alt: string; dataAiHint: string; }) => {
    setCurrentImage(image);
    setLightboxOpen(true);
  };

  return (
    <SectionWrapper id="galeri" className="bg-orange-50">
      <div className="text-center mb-12">
        <h2 id="galeri-heading" className="text-3xl md:text-4xl font-bold text-foreground">
          Galeri <span className="text-primary">Ovisure Gold</span>
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Lihat lebih dekat produk Ovisure Gold dan inspirasi gaya hidup sehat.
        </p>
      </div>
      <div className="overflow-x-auto hide-scrollbar w-full relative group">
        <div className="flex animate-marquee-rtl group-hover:[animation-play-state:paused] group-active:[animation-play-state:paused]">
          {[...galleryImages, ...galleryImages].map((image, index) => (
            <div
              key={`${image.src}-${index}`}
              aria-hidden={index >= galleryImages.length ? "true" : undefined}
              className="flex-shrink-0 w-72 h-96 p-2" // Fixed width and height for items (aspect 3/4)
            >
              <button
                type="button"
                onClick={() => handleImageClick(image)}
                className="overflow-hidden rounded-lg shadow-lg h-full w-full group/imageitem bg-white flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label={`View larger image for ${image.alt}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={400}
                  height={300}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover/imageitem:scale-105"
                  data-ai-hint={image.dataAiHint}
                  draggable="false"
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {currentImage && (
        <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
          <DialogContent
            className="p-1 max-w-4xl w-auto bg-transparent border-0 shadow-none flex items-center justify-center !rounded-lg"
            onInteractOutside={(e) => {
              // Allow marquee interaction to continue
              if ((e.target as HTMLElement).closest('.animate-marquee-rtl')) {
                e.preventDefault();
              }
            }}
          >
            <DialogHeader className="sr-only">
              <DialogTitle>{currentImage?.alt || 'Enlarged image'}</DialogTitle>
            </DialogHeader>
            <div className="relative">
              <Image
                src={currentImage.src}
                alt={currentImage.alt}
                width={1200}
                height={800}
                className="object-contain w-auto h-auto max-w-[90vw] max-h-[85vh] rounded-lg shadow-2xl"
                draggable="false"
                data-ai-hint={currentImage.dataAiHint}
              />
              <DialogClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute -top-3 -right-3 md:top-1 md:right-1 bg-background/80 hover:bg-background text-foreground rounded-full h-8 w-8 z-[60]"
                  aria-label="Close lightbox"
                >
                  <X className="h-5 w-5" />
                </Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </SectionWrapper>
  );
};

export default GallerySection;
