
import Image from 'next/image';
import SectionWrapper from '@/components/ui/section-wrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ShieldCheck, HeartPulse, Sprout } from 'lucide-react';

const benefits = [
  {
    icon: <Sprout className="h-8 w-8 text-primary" />,
    title: "Bahan Kedelai Impor AS",
    description: "Ovisure Gold mengandung bahan kedelai berkualitas tinggi yang diimpor dari Amerika Serikat, disuling sesuai standar internasional.",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: "Aman dan Mudah Diserap",
    description: "Formula lembut, lebih mudah diserap daripada produk hewani, tidak menyebabkan cegukan, terengah-engah, atau penambahan berat badan.",
  },
  {
    icon: <HeartPulse className="h-8 w-8 text-primary" />,
    title: "Baik untuk Jantung & Gula Darah",
    description: "Mendukung kesehatan jantung, mengontrol detak jantung, menjaga gula darah. Cocok untuk penderita diabetes dan vegetarian.",
  },
];

const PlantExtractBenefitsSection = () => {
  return (
    <SectionWrapper id="ekstrak-tumbuhan" className="bg-background">
      <div className="text-center mb-12">
        <h2 id="ekstrak-tumbuhan-heading" className="text-3xl md:text-4xl font-bold text-foreground">
          Ekstrak Tumbuhan: <span className="text-primary">Dimensi Baru Perawatan Kesehatan</span>
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Manfaatkan kebaikan alam dengan bahan-bahan nabati pilihan dalam Ovisure Gold.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {benefits.map((item, index) => (
          <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">{item.icon}</div>
              <CardTitle className="text-xl text-foreground">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <Image 
          src="https://w.ladicdn.com/s750x600/5dca5fa4668cf57be5d63563/ovisure-20230628163847-u-wss.jpeg" 
          alt="Produk Ovisure Gold dengan bahan alami" 
          width={750} 
          height={600} 
          className="rounded-lg shadow-md object-cover w-full h-64"
          data-ai-hint="product natural ingredients"
          draggable="false"
        />
        <Image 
          src="https://w.ladicdn.com/s450x450/6635dc99ef5f4900127bad81/ovims1-20241230042159-jqjwx-20250106044851-73wrj.png" 
          alt="Kemasan produk Ovisure Gold" 
          width={450} 
          height={450} 
          className="rounded-lg shadow-md object-contain w-full h-64"
          data-ai-hint="product packaging"
          draggable="false"
        />
        <Image 
          src="https://w.ladicdn.com/5dca5fa4668cf57be5d63563/ezgifcom-optimize-20230621142400-e2haf.gif" 
          alt="Animasi manfaat Ovisure Gold" 
          width={300} 
          height={192} 
          className="rounded-lg shadow-md object-cover w-full h-64"
          data-ai-hint="animation health benefit"
          unoptimized
          draggable="false"
        />
      </div>
    </SectionWrapper>
  );
};

export default PlantExtractBenefitsSection;
