
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import SectionWrapper from '@/components/ui/section-wrapper';
import ScrollLink from '@/components/scroll-link';
import { ShieldCheck, Heart, Users, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';

const advantages = [
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: "Mengobati Nyeri Sendi Permanen",
    description: "Mengurangi gejala nyeri osteoartritis, meregenerasi jaringan tulang rawan, membantu gerakan fleksibel hanya setelah 7 hari pemakaian.",
    imageSrc: "https://w.ladicdn.com/s900x450/6635dc99ef5f4900127bad81/ovisure-gold-02-20220222083044-20250514043614-j5ypg.png",
    dataAiHint: "joint relief"
  },
  {
    icon: <Heart className="h-8 w-8 text-primary" />,
    title: "Perlindungan Kardiovaskular & Diabetes",
    description: "Dengan 100% protein nabati, membatasi kolesterol berbahaya, mengurangi arteriosklerosis, baik untuk sistem kardiovaskular.",
    imageSrc: "https://w.ladicdn.com/s750x400/6635dc99ef5f4900127bad81/ovisure-gold-15-20220222083044-20250514043616-0ocaq.png",
    dataAiHint: "artery health"
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Meningkatkan Resistensi Tubuh",
    description: "21 jenis vitamin, mineral, dengan Omega 3-6-9 untuk membantu meningkatkan daya tahan tubuh, membatasi penyakit ringan.",
    imageSrc: "https://w.ladicdn.com/s450x400/6635dc99ef5f4900127bad81/omega-3-fatty-vitamin-oil-fat-acid-gold-capsule-vector-34099910-20211213102840-20230530065936-jizea-20250514043528-zn1wj.png",
    dataAiHint: "immune support"
  },
];

const KeyAdvantagesSection = () => {
  return (
    <SectionWrapper id="keunggulan-utama" className="bg-orange-50">
      <div className="text-center mb-12">
        <h2 id="keunggulan-utama-heading" className="text-3xl md:text-4xl font-bold text-foreground">
          Keunggulan Utama <span className="text-primary">Ovisure Gold</span>
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Temukan mengapa Ovisure Gold adalah pilihan terbaik untuk kesehatan jangka panjang Anda.
        </p>
      </div>
      <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {advantages.map((advantage, index) => {
          const isSpecialAdvantage = advantage.title === "Mengobati Nyeri Sendi Permanen";
          const isCardioAdvantage = advantage.title === "Perlindungan Kardiovaskular & Diabetes";
          
          return (
            <div key={index} className="bg-background p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center gap-6 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="w-[150px] h-[150px] rounded-full overflow-hidden shrink-0">
                {isSpecialAdvantage ? (
                  <Image
                    src={advantage.imageSrc}
                    alt={advantage.title}
                    width={900} // Original aspect ratio width
                    height={450} // Original aspect ratio height
                    style={{
                      width: '330px',      // Target display width before crop
                      height: '100%',     // Fill the 150px circle height
                      objectFit: 'cover',
                      objectPosition: '0% center', // Crop from left, center vertically
                    }}
                    data-ai-hint={advantage.dataAiHint}
                    priority={index === 0} 
                    draggable="false"
                  />
                ) : isCardioAdvantage ? (
                  <Image
                    src={advantage.imageSrc}
                    alt={advantage.title}
                    width={900} // Original aspect ratio width
                    height={450} // Original aspect ratio height
                    style={{
                      width: '330px',      // Target display width before crop
                      height: '100%',     // Fill the 150px circle height
                      objectFit: 'cover',
                      objectPosition: '5% center', // Crop from left, center vertically
                    }}
                    data-ai-hint={advantage.dataAiHint}
                    priority={index === 0} 
                    draggable="false"
                  />
                ) : ( // For "Meningkatkan Resistensi Tubuh"
                  <Image
                    src={advantage.imageSrc}
                    alt={advantage.title}
                    width={900} // Original aspect ratio width
                    height={450} // Original aspect ratio height
                    style={{
                      height: '150px',
                      width: 'auto',
                      objectFit: 'contain',
                      objectPosition: 'center',
                    }}
                    data-ai-hint={advantage.dataAiHint}
                    priority={index === 0} 
                    draggable="false"
                  />
                )}
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-xl font-semibold text-foreground mb-2">{advantage.title}</h3>
                <p className="text-muted-foreground text-sm">{advantage.description}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="text-center mt-12 bg-primary text-primary-foreground p-8 rounded-lg shadow-xl">
        <Tag className="h-12 w-12 mx-auto mb-4" />
        <h3 className="text-3xl font-bold mb-4">
          DISKON 50% + PENGIRIMAN GRATIS!
        </h3>
        <p className="text-lg mb-6">
          Penawaran terbatas untuk Anda yang peduli kesehatan. Jangan lewatkan kesempatan emas ini!
        </p>
        <ScrollLink to="#pesan">
          <Button size="lg" variant="secondary" className="text-lg px-10 py-3 shadow-md hover:bg-white hover:text-primary transition-colors">
            Klaim Diskon Sekarang
          </Button>
        </ScrollLink>
      </div>
    </SectionWrapper>
  );
};

export default KeyAdvantagesSection;
