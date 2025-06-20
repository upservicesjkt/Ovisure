
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import SectionWrapper from '@/components/ui/section-wrapper';
import ScrollLink from '@/components/scroll-link';
import { CheckCircle, GlassWater, SoupIcon, Info } from 'lucide-react';

const usageSteps = [
  {
    icon: <SoupIcon className="h-8 w-8 text-primary" />,
    text: "Ambil 3 sendok susu kacang OviSure Gold.",
  },
  {
    icon: <GlassWater className="h-8 w-8 text-primary" />,
    text: "Campur dengan 200ml air hangat (sekitar 50°C).",
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-primary" />,
    text: "Aduk hingga semua susu bubuk larut sempurna.",
  },
  {
    icon: <Info className="h-8 w-8 text-primary" />,
    text: "Gunakan segera setelah terlarut untuk manfaat maksimal.",
  },
];

const UsageGuideSection = () => {
  return (
    <SectionWrapper id="cara-pakai" className="bg-orange-50">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="animate-slide-up" style={{animationDelay: '0.1s'}}>
          <h2 id="cara-pakai-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Pedoman <span className="text-primary">Penggunaan Ovisure Gold</span>
          </h2>
          <div className="space-y-6">
            {usageSteps.map((step, index) => (
              <div key={index} className="flex items-center p-4 bg-background rounded-lg shadow-sm">
                <div className="p-3 bg-primary/10 rounded-full mr-4">{step.icon}</div>
                <p className="text-lg text-muted-foreground">{step.text}</p>
              </div>
            ))}
          </div>
          <ScrollLink to="#pesan" className="block mt-10">
            <Button size="lg" className="w-full md:w-auto text-lg px-8 py-3 shadow-md hover:shadow-lg transition-shadow">
              Pesan Sekarang (Produk Terlaris)
            </Button>
          </ScrollLink>
        </div>
        <div className="relative animate-fade-in" style={{animationDelay: '0.2s'}}>
          <Image
            src="https://w.ladicdn.com/5f0c07d511b52935c3db88d0/ezgifcom-optimize-1-20230621143151-t9ugk-20231128044155-j7mwk.gif"
            alt="Cara Penggunaan Ovisure Gold Animasi"
            width={500}
            height={500}
            className="rounded-xl shadow-xl object-contain w-full h-auto"
            data-ai-hint="usage guide animation"
            unoptimized
            draggable="false"
          />
           <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/20 rounded-full blur-2xl -z-10"></div>
           <div className="absolute -top-8 -left-8 w-40 h-40 bg-accent/10 rounded-full blur-3xl -z-10"></div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default UsageGuideSection;
