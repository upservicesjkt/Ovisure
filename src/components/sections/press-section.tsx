
import Image from 'next/image';
import SectionWrapper from '@/components/ui/section-wrapper';
import { Card, CardContent } from '@/components/ui/card';

const pressImages = [
  {
    src: "https://w.ladicdn.com/s750x750/6635dc99ef5f4900127bad81/tulang_06-20250316061916-elvii-20250514042135-bu9py.jpg",
    alt: "Ovisure Gold Press Feature 1 - Artikel",
    dataAiHint: "press newspaper article"
  },
  {
    src: "https://w.ladicdn.com/s850x600/6635dc99ef5f4900127bad81/untitled-image-4-20250104053120-qxp-l-20250316061916-osx5t-20250514042337-wyvmk.jpg",
    alt: "Ovisure Gold Press Feature 2 - Media Detail",
    dataAiHint: "publication health journal detail"
  },
  {
    src: "https://w.ladicdn.com/s850x600/6635dc99ef5f4900127bad81/untitled-image-2-20250104053120-x_olq-20250316061916-nbyy2-20250514042350-fnjp4.jpg",
    alt: "Ovisure Gold Press Feature 3 - Media Screen",
    dataAiHint: "media news screen"
  },
];

const PressSection = () => {
  return (
    <SectionWrapper id="press-testimonials" className="bg-orange-50">
      <div className="text-center mb-12">
        <h2 id="press-testimonials-heading" className="text-3xl md:text-4xl font-bold text-foreground">
          Testimonial Pers: <span className="text-primary">Solusi Anti-Pemalsuan Ovisure Gold</span>
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Ovisure Gold diakui oleh berbagai media terpercaya atas kualitas dan keasliannya.
        </p>
      </div>

      {/* Mobile: Marquee view */}
      <div className="md:hidden overflow-x-auto hide-scrollbar w-full relative group">
        <div className="flex animate-marquee-rtl group-hover:[animation-play-state:paused] group-active:[animation-play-state:paused]">
          {[...pressImages, ...pressImages].map((image, i) => {
            const originalIndex = i % pressImages.length;
            return (
              <div
                key={`${image.src}-marquee-${i}`}
                aria-hidden={i >= pressImages.length ? "true" : undefined}
                className="flex-shrink-0 px-3 w-80" // Provides spacing and fixed width for marquee
              >
                <Card
                  className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full"
                >
                  <CardContent className="p-0 aspect-[3/4] relative group/imageitem h-full">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      layout="fill"
                      objectFit={
                        originalIndex === 0 ? "contain" : "cover"
                      }
                      style={
                        originalIndex === 1 ? { objectPosition: '-95px center' } :
                        originalIndex === 2 ? { objectPosition: '-130px center' } :
                        undefined
                      }
                      data-ai-hint={image.dataAiHint}
                      className="transition-transform duration-300 group-hover/imageitem:scale-105"
                      draggable="false"
                    />
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop: Grid view */}
      <div className="hidden md:grid md:grid-cols-3 gap-6">
        {pressImages.map((image, index) => {
          return (
            <Card
              key={`${image.src}-grid-${index}`}
              className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-0 aspect-[3/4] relative group/imageitem">
                <Image
                  src={image.src}
                  alt={image.alt}
                  layout="fill"
                  objectFit={
                    index === 0 ? "contain" : "cover"
                  }
                  style={
                    index === 1 ? { objectPosition: '-95px center' } :
                    index === 2 ? { objectPosition: '-130px center' } :
                    undefined
                  }
                  data-ai-hint={image.dataAiHint}
                  className="transition-transform duration-300 group-hover/imageitem:scale-105"
                  draggable="false"
                />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </SectionWrapper>
  );
};

export default PressSection;
