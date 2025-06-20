
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import SectionWrapper from '@/components/ui/section-wrapper';
import ScrollLink from '@/components/scroll-link';
import { ShieldCheck, Bone, Leaf } from 'lucide-react';
import fs from 'node:fs/promises';
import path from 'node:path';
import type { PageContent, HeroContent } from '@/types/pageContent';

const PAGE_CONTENT_PATH = path.join(process.cwd(), 'src', 'data', 'pageContent.json');

async function getHeroContent(): Promise<HeroContent> {
  const defaultHeroContent: HeroContent = {
    kicker: "Ovisure Gold Indonesia",
    headlineMain: "SUSU TERBAIK UNTUK ",
    headlineEmphasis: "SENDI & LUTUT",
    paragraphBeforeBold: "Tulang dan sendi yang sehat. Kembali ke kehidupan normal ",
    paragraphBoldText: "hanya dalam 3-4 minggu.",
    paragraphAfterBold: ".",
    imageSrc: "https://w.ladicdn.com/s750x750/6635dc99ef5f4900127bad81/anh-vip-copy-20250106044731-qmuvl.jpg",
    dataAiHint: "milk product health"
  };

  try {
    const data = await fs.readFile(PAGE_CONTENT_PATH, 'utf-8');
    const pageContent = JSON.parse(data) as PageContent;
    return pageContent.heroSection || defaultHeroContent;
  } catch (error) {
    console.warn("Failed to read or parse pageContent.json for HeroSection, using default content:", error);
    return defaultHeroContent;
  }
}

const HeroSection = async () => {
  const content = await getHeroContent();

  return (
    <SectionWrapper id="hero" className="bg-gradient-to-br from-background to-orange-100 pt-28 md:pt-36 min-h-screen flex items-center">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="text-center md:text-left animate-slide-up" style={{ animationDelay: '0.2s' }}>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', padding: '10px' }}>
            <div style={{ width: '80px', maxWidth: '80px', aspectRatio: 1,
              backgroundImage: "url('https://w.ladicdn.com/s450x450/6635dc99ef5f4900127bad81/1x1-2-20240510051414-cdrx--20250305080100-2up4o.png')",
              backgroundSize: '200% 200%', backgroundPosition: '100% 0%', backgroundRepeat: 'no-repeat'}} draggable="false"></div>
            <div style={{ width: '80px', maxWidth: '80px', aspectRatio: 1,
              backgroundImage: "url('https://w.ladicdn.com/s450x450/6635dc99ef5f4900127bad81/1x1-2-20240510051414-cdrx--20250305080100-2up4o.png')",
              backgroundSize: '200% 200%', backgroundPosition: '0% 0%', backgroundRepeat: 'no-repeat'}} draggable="false"></div>
            <div style={{ width: '80px', maxWidth: '80px', aspectRatio: 1,
              backgroundImage: "url('https://w.ladicdn.com/s450x450/6635dc99ef5f4900127bad81/1x1-2-20240510051414-cdrx--20250305080100-2up4o.png')",
              backgroundSize: '200% 200%', backgroundPosition: '0% 100%', backgroundRepeat: 'no-repeat'}} draggable="false"></div>
            <div style={{ width: '80px', maxWidth: '80px', aspectRatio: 1,
              backgroundImage: "url('https://w.ladicdn.com/s450x450/6635dc99ef5f4900127bad81/1x1-2-20240510051414-cdrx--20250305080100-2up4o.png')",
              backgroundSize: '200% 200%', backgroundPosition: '100% 100%', backgroundRepeat: 'no-repeat'}} draggable="false"></div>
          </div>
          
          <h2 id="hero-kicker" className="text-sm font-semibold text-primary uppercase tracking-wider my-3">
            {content.kicker}
          </h2>
          
          {/* Headline with Logo */}
          <div className="flex items-stretch my-4 w-fit mx-auto md:ml-0">
            <Image
              src="https://w.ladicdn.com/s450x450/6635dc99ef5f4900127bad81/1x1-1-20240510034957-noiad-20250305080100-x2iks.png"
              alt="Best Quality Product"
              width={150} 
              height={150}
              className="flex-shrink-0 object-cover"
              draggable="false"
            />
            <div className="bg-red-700 text-yellow-400 font-black p-3 pr-6 rounded-r-lg flex flex-col justify-center">
              <h1 id="hero-heading" className="text-2xl sm:text-3xl md:text-4xl leading-tight uppercase">
                <span className="block">
                  {content.headlineMain.replace('UNTUK ', 'UNTUK SENDI')}
                </span>
                <span className="block">
                  {`& ${content.headlineEmphasis.replace('SENDI & ', '')} DI INDONESIA`}
                </span>
              </h1>
            </div>
          </div>

          <p className="mt-6 text-lg text-muted-foreground">
            {content.paragraphBeforeBold}
            <span className="font-bold text-primary">{content.paragraphBoldText}</span>
            {content.paragraphAfterBold}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <ScrollLink to="#pesan">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-3 shadow-lg hover:shadow-xl transition-shadow">
                Pesan Sekarang
              </Button>
            </ScrollLink>
            <ScrollLink to="#manfaat">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-3">
                Pelajari Lebih Lanjut
              </Button>
            </ScrollLink>
          </div>
          <div className="mt-12 flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-primary" />
                <span>Bahan Alami Pilihan</span>
              </div>
              <div className="flex items-center gap-2">
                <Bone className="h-5 w-5 text-primary" />
                <span>Kekuatan Tulang & Sendi</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <span>Teruji Klinis &amp; Aman</span>
              </div>
            </div>
        </div>
        <div className="relative animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Image
            src={content.imageSrc}
            alt="Ovisure Gold Product"
            width={600}
            height={500}
            className="rounded-xl shadow-2xl object-cover"
            data-ai-hint={content.dataAiHint}
            priority
            draggable="false"
          />
           <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/20 rounded-full blur-2xl -z-10"></div>
           <div className="absolute -top-8 -left-8 w-40 h-40 bg-accent/10 rounded-full blur-3xl -z-10"></div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default HeroSection;

