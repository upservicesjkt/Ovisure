
import Image from 'next/image';
import SectionWrapper from '@/components/ui/section-wrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, DollarSign, ShieldOff, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ScrollLink from '@/components/scroll-link';

const commitments = [
  {
    icon: <CheckCircle2 className="h-8 w-8 text-primary" />,
    title: "Bahan Aktif UNIVESTIN Eksklusif",
    description: "Menggunakan bahan aktif Univestin dari AS yang teruji kualitasnya untuk kesehatan sendi.",
    bgColor: "bg-primary/10",
  },
  {
    icon: <DollarSign className="h-8 w-8 text-primary" />,
    title: "Pengembalian Dana",
    description: "Kami menjamin pengembalian dana jika produk tidak memberikan hasil yang diharapkan.",
    bgColor: "bg-primary/10",
  },
  {
    icon: <ShieldOff className="h-8 w-8 text-primary" />,
    title: "Tanpa Efek Samping",
    description: "Diformulasikan secara aman untuk dikonsumsi tanpa menimbulkan efek samping yang merugikan.",
    bgColor: "bg-primary/10",
  },
];

const CommitmentSection = () => {
  return (
    <SectionWrapper id="komitmen" className="bg-background">
      <div className="text-center mb-12">
        <h2 id="komitmen-heading" className="text-3xl md:text-4xl font-bold text-foreground">
          Komitmen Kami Terhadap Pelanggan
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Kepuasan dan kesehatan Anda adalah prioritas utama kami. Berikut adalah janji kami untuk Anda:
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {commitments.map((item, index) => (
          <Card key={index} className={`shadow-lg hover:shadow-xl transition-shadow duration-300 border-primary/20 animate-slide-up`} style={{ animationDelay: `${index * 0.15}s` }}>
            <CardHeader className="items-center">
              <div className={`p-4 rounded-full ${item.bgColor} mb-4`}>
                {item.icon}
              </div>
              <CardTitle className="text-xl text-center text-foreground">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
       <div className="mt-12 text-center">
        <div className="relative mx-auto max-w-full w-full md:max-w-[700px] aspect-[700/300] overflow-hidden rounded-lg shadow-md">
          <Image
            src="https://w.ladicdn.com/s750x750/6635dc99ef5f4900127bad81/dau-1-20250106040833-badjr.jpg"
            alt="Ovisure Gold Promo Banner"
            layout="fill"
            objectFit="cover"
            objectPosition="top"
            className="" 
            data-ai-hint="product promo banner"
            priority
            draggable="false"
          />
          <Image
            src="https://w.ladicdn.com/5dca5fa4668cf57be5d63563/usa-american-flag-gif-3-unscreen-20210615043039-20220630100131-20220725101228-20230529145321-pbs7h.gif"
            alt="Promosi USA Impor"
            width={40} 
            height={24} 
            className="absolute z-10 top-1.5 right-1.5 sm:top-2 sm:right-2 rounded"
            data-ai-hint="USA flag"
            unoptimized
            draggable="false" 
          />
          <div className="absolute z-10 bottom-2 left-4 sm:bottom-3 sm:left-8 md:bottom-6 md:left-12">
            <ScrollLink to="#pesan">
              <Button 
                className="bg-red-600 hover:bg-red-700 text-white font-bold shadow-lg 
                           text-xs px-3 py-1.5 
                           sm:text-sm sm:px-4 sm:py-2 
                           md:text-base md:px-6 md:py-3"
              >
                <ShoppingCart 
                  className="mr-1 h-3 w-3 
                             sm:mr-1.5 sm:h-3.5 sm:w-3.5 
                             md:mr-2 md:h-5 md:w-5" 
                /> PESAN SEKARANG
              </Button>
            </ScrollLink>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default CommitmentSection;
