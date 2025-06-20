
import Image from 'next/image';
import SectionWrapper from '@/components/ui/section-wrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Zap, Heart, ShieldPlus, Bone, Recycle } from 'lucide-react'; // Example icons

const formulaItems = [
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "Fleksibilitas Sendi",
    description: "Mengurangi sklerosis, membantu tulang dan sendi menjadi fleksibel, meningkatkan fungsi gerak tubuh.",
    imageSrc: "https://w.ladicdn.com/s400x400/5f0c07d511b52935c3db88d0/rbg/univer-20230512013519-prgw_.png",
    dataAiHint: "flexible joint"
  },
  {
    icon: <Heart className="h-8 w-8 text-primary" />,
    title: "Penyerapan Kalsium & Jantung",
    description: "Meningkatkan penyerapan kalsium. Dukungan untuk mengurangi lemak jahat, melindungi jantung dan meningkatkan ketahanan.",
    imageSrc: "https://w.ladicdn.com/s400x400/5f0c07d511b52935c3db88d0/rbg/dam-thuc-vat-20230512014141-xrbfz.png",
    dataAiHint: "calcium absorption"
  },
  {
    icon: <ShieldPlus className="h-8 w-8 text-primary" />,
    title: "Sirkulasi & Daya Tahan",
    description: "Dukungan untuk mengatur detak jantung dan sirkulasi darah, membantu memperkuat daya tahan tubuh dan mencegah kanker.",
    imageSrc: "https://w.ladicdn.com/s400x400/5f0c07d511b52935c3db88d0/rbg/omega-20230512014923-ydc49.png",
    dataAiHint: "blood circulation"
  },
  {
    icon: <Leaf className="h-8 w-8 text-primary" />,
    title: "Antioksidan & Pencernaan",
    description: "Anti-oksidan, memperbaiki pencernaan, meningkatkan daya tahan tubuh, mendukung penurunan dan menstabilkan gula darah.",
    imageSrc: "https://w.ladicdn.com/s400x400/5f0c07d511b52935c3db88d0/rbg/omega-20230512014923-ydc49.png", 
    dataAiHint: "antioxidant digestion"
  },
  {
    icon: <Bone className="h-8 w-8 text-primary" />,
    title: "Pemulihan Tulang Rawan",
    description: "Menutrisi dan memulihkan tulang rawan, menjaga sirkulasi sel, meningkatkan autoimunitas tubuh, efektif meredakan nyeri.",
    imageSrc: "https://w.ladicdn.com/s400x400/5f0c07d511b52935c3db88d0/rbg/msm-20230512013738-oqb83.png",
    dataAiHint: "cartilage recovery"
  },
  {
    icon: <Recycle className="h-8 w-8 text-primary" />,
    title: "Perlindungan Struktur Tulang",
    description: "Membantu menjaga dan melindungi struktur tulang, melawan peradangan dan meredakan kekakuan, memperbaiki fungsi usus besar, lambung, dan hati.",
    imageSrc: "https://w.ladicdn.com/s400x400/5f0c07d511b52935c3db88d0/rbg/msm-20230512013738-oqb83.png", 
    dataAiHint: "bone structure"
  }
];

const FormulaSection = () => {
  return (
    <SectionWrapper id="kandungan" className="bg-orange-50">
      <div className="text-center mb-12">
        <h2 id="kandungan-heading" className="text-3xl md:text-4xl font-bold text-foreground">
          Formula Nutrisi Khusus untuk <span className="text-primary">Perawatan Kesehatan Menyeluruh</span>
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Setiap kandungan Ovisure Gold dipilih secara cermat untuk memberikan manfaat maksimal bagi tubuh Anda.
        </p>
      </div>

      <div className="my-8 md:my-12 flex justify-center">
        <Image
          src="https://w.ladicdn.com/s650x600/5f0c07d511b52935c3db88d0/4-20230522045324-2vmlh.png"
          alt="Komposisi Ovisure Gold"
          width={650}
          height={600}
          className="rounded-lg object-contain"
          data-ai-hint="product ingredients overview"
          draggable="false"
        />
      </div>

      {/* Mobile: Marquee view */}
      <div className="md:hidden overflow-x-auto hide-scrollbar w-full relative group">
        <div className="flex animate-marquee-rtl group-hover:[animation-play-state:paused] group-active:[animation-play-state:paused]">
          {[...formulaItems, ...formulaItems].map((item, i) => {
            const originalIndex = i % formulaItems.length;
            return (
              <div
                key={`${item.title}-marquee-${i}`}
                aria-hidden={i >= formulaItems.length}
                className="flex-shrink-0 pr-6" // Adds gap to the right of each item for marquee
              >
                <Card
                  className="flex flex-col items-center text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 w-[300px] h-full"
                >
                  <div className="relative w-24 h-24 mb-4">
                    <Image
                      src={item.imageSrc}
                      alt={item.title}
                      layout="fill"
                      objectFit="contain"
                      className="rounded-full"
                      data-ai-hint={item.dataAiHint}
                      draggable="false"
                    />
                  </div>
                  <CardTitle className="text-xl text-foreground mb-2">{item.title}</CardTitle>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop: Grid view */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 md:mt-12">
        {formulaItems.map((item, index) => (
          <div key={`${item.title}-grid-${index}`}>
            <Card
              className="flex flex-col items-center text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 w-full h-full animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative w-24 h-24 mb-4">
                <Image
                  src={item.imageSrc}
                  alt={item.title}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-full"
                  data-ai-hint={item.dataAiHint}
                  draggable="false"
                />
              </div>
              <CardTitle className="text-xl text-foreground mb-2">{item.title}</CardTitle>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default FormulaSection;
