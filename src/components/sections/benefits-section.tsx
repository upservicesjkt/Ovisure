
import Image from 'next/image';
import SectionWrapper from '@/components/ui/section-wrapper';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bone, Accessibility, Activity, AlertTriangle } from 'lucide-react';

const benefits = [
  {
    icon: <Bone className="h-10 w-10 text-primary" />,
    title: "Tulang Belakang",
    description: "Mengatasi nyeri punggung bawah, nyeri yang menjalar ke kaki, dan kesulitan berjalan lama.",
    imageSrc: "https://w.ladicdn.com/s450x450/5dca5fa4668cf57be5d63563/screenshot_6-20230624123859-9nanj.png",
    imageAlt: "Kesehatan Tulang Belakang",
    dataAiHint: "spine health"
  },
  {
    icon: <Accessibility className="h-10 w-10 text-primary" />,
    title: "Sendi Lutut",
    description: "Meredakan nyeri lutut, bunyi sendi, efusi sendi, dan taji lutut.",
    imageSrc: "https://w.ladicdn.com/s450x450/5dca5fa4668cf57be5d63563/screenshot_5-20230624123819-2_39j.png",
    imageAlt: "Kesehatan Sendi Lutut",
    dataAiHint: "knee joint"
  },
  {
    icon: <Activity className="h-10 w-10 text-primary" />,
    title: "Nyeri Sendi Kecil",
    description: "Mengurangi pembengkakan dan rasa panas pada sendi tangan, kaki, siku, serta gejala asam urat.",
    imageSrc: "https://w.ladicdn.com/s450x450/5dca5fa4668cf57be5d63563/screenshot_4-20230624123719-xz3bl.png",
    imageAlt: "Nyeri Sendi Kecil",
    dataAiHint: "hand joint"
  },
  {
    icon: <Accessibility className="h-10 w-10 text-primary" />, // Using Accessibility again as it relates to body sensation
    title: "Mati Rasa Anggota Badan",
    description: "Mengatasi mati rasa yang menjalar ke tangan dan kaki, serta memulihkan sensasi terutama di malam hari.",
    imageSrc: "https://w.ladicdn.com/s450x450/5dca5fa4668cf57be5d63563/screenshot_2-20230624123530-n6wll.png",
    imageAlt: "Mati Rasa Anggota Badan",
    dataAiHint: "numbness relief"
  },
];

const BenefitsSection = () => {
  return (
    <SectionWrapper id="manfaat" className="bg-orange-50">
      <div className="text-center mb-12">
        <h2 id="manfaat-heading" className="text-3xl md:text-4xl font-bold text-foreground">
          Apa yang Didukung oleh <span className="text-primary">OVISURE GOLD</span>?
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Ovisure Gold diformulasikan khusus untuk mengatasi berbagai masalah tulang dan sendi, membantu Anda kembali aktif dan nyaman.
        </p>
      </div>

      {/* Mobile: Marquee view */}
      <div className="md:hidden overflow-x-auto hide-scrollbar w-full relative group">
        <div className="flex animate-marquee-rtl group-hover:[animation-play-state:paused]">
          {[...benefits, ...benefits].map((benefit, i) => {
            const originalIndex = i % benefits.length;
            return (
              <div
                key={`${benefit.title}-marquee-${i}`}
                aria-hidden={i >= benefits.length ? "true" : undefined}
                className="flex-shrink-0 pr-6" // Adds gap to the right of each item for marquee
              >
                <Card
                  className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 w-[320px] h-full" // Fixed width for marquee items
                >
                  <div className="relative w-full h-48">
                    <Image
                      src={benefit.imageSrc}
                      alt={benefit.imageAlt}
                      layout="fill"
                      objectFit="cover"
                      data-ai-hint={benefit.dataAiHint}
                      draggable="false"
                    />
                  </div>
                  <CardHeader className="items-center text-center pt-6">
                    {benefit.icon}
                    <CardTitle className="mt-4 text-xl text-foreground">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription className="text-center text-muted-foreground">{benefit.description}</CardDescription>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop: Grid view */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((benefit, index) => (
          <Card
            key={`${benefit.title}-grid-${index}`}
            className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slide-up w-full h-full" // Added w-full h-full for consistency
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="relative w-full h-48">
              <Image
                src={benefit.imageSrc}
                alt={benefit.imageAlt}
                layout="fill"
                objectFit="cover"
                data-ai-hint={benefit.dataAiHint}
                draggable="false"
              />
            </div>
            <CardHeader className="items-center text-center pt-6">
              {benefit.icon}
              <CardTitle className="mt-4 text-xl text-foreground">{benefit.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="text-center text-muted-foreground">{benefit.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center bg-primary/10 p-8 rounded-lg shadow-md">
        <AlertTriangle className="h-12 w-12 text-primary mx-auto mb-4" />
        <h3 className="text-2xl font-semibold text-primary">
          Sudahkah Anda Mencoba Perawatan Mahal, Namun Masih Belum Melihat Hasilnya?
        </h3>
        <p className="mt-4 text-muted-foreground">
          Ovisure Gold menawarkan solusi yang efektif dan terjangkau untuk masalah sendi Anda.
        </p>
      </div>
    </SectionWrapper>
  );
};

export default BenefitsSection;
