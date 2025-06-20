
import Image from 'next/image';
import SectionWrapper from '@/components/ui/section-wrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// CheckSquare and TrendingUp are example icons and might not be used.

const effectivenessStages = [
  {
    phase: "Fase 1 (Setelah 2 Minggu)",
    description: "Menghambat enzim perusak tulang rawan, menghancurkan osteoklas, menyehatkan area muskuloskeletal, memperbaiki kram dan mati rasa.",
    imageSrc: "https://w.ladicdn.com/s400x400/5f0c07d511b52935c3db88d0/rbg/screenshot-2023-07-04-105709-20230704035752-vwzzu.png",
    dataAiHint: "joint improvement"
  },
  {
    phase: "Fase 2 (Setelah 4 Minggu)",
    description: "Rasa sakit pada persendian mulai berkurang dan tenang. Membantu pasien bergerak lebih baik tanpa rasa sakit.",
    imageSrc: "https://w.ladicdn.com/s400x400/5f0c07d511b52935c3db88d0/rbg/screenshot-2023-07-04-105715-20230704035752-lzkn3.png",
    dataAiHint: "pain relief movement"
  },
  {
    phase: "Fase 3 (Setelah 8 Minggu)",
    description: "Fase pemulihan merangsang aktivitas maksimum sel otot, menciptakan tulang baru, meregenerasi otot rangka. Pasien kembali ke kehidupan normal.",
    imageSrc: "https://w.ladicdn.com/s400x400/5f0c07d511b52935c3db88d0/rbg/screenshot-2023-07-04-105720-20230704035752-p0y49.png",
    dataAiHint: "full recovery active"
  }
];

// Simple SVG shape component for phase background
const PhaseShape: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
  <div className={`relative inline-block px-6 py-2 text-primary-foreground font-semibold ${className}`}>
    <svg viewBox="0 0 200 60" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
      <path d="M10 0 H190 Q200 0 200 10 V50 Q200 60 190 60 H10 Q0 60 0 50 V10 Q0 0 10 0 Z" fill="hsl(var(--primary))"/>
    </svg>
    <span className="relative z-10">{children}</span>
  </div>
);


const ExpertAdviceSection = () => {
  return (
    <SectionWrapper id="saran-ahli" className="bg-background">
      <div className="text-center mb-12">
        <Image
          src="https://w.ladicdn.com/s600x500/5f0c07d511b52935c3db88d0/rbg/1-2-20230704033644-_-qnf.png"
          alt="Rekomendasi Ahli Ortopedi"
          width={600}
          height={500}
          className="w-full max-w-md mx-auto mb-4 object-contain"
          data-ai-hint="medical expert logo"
          draggable="false"
        />
        <h2 id="saran-ahli-heading" className="text-3xl md:text-4xl font-bold text-foreground">
          Rekomendasi Para Ahli Ortopedi
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Pakar ortopedi terkemuka di dunia merekomendasikan penggunaan Ovisure Gold secara teratur dan dengan cara yang tepat untuk mengatasi masalah nyeri sendi secara tuntas dan membantu kita memiliki sistem tulang dan sendi yang sehat.
        </p>
      </div>

      <div className="mb-16">
        <h3 className="text-2xl md:text-3xl font-semibold text-center text-primary mb-10">Tahap Keefektifan Produk</h3>
        <div className="grid lg:grid-cols-3 gap-8">
          {effectivenessStages.map((stage, index) => (
            <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="relative h-56 w-full">
                <Image 
                  src={stage.imageSrc} 
                  alt={stage.phase} 
                  layout="fill" 
                  objectFit="contain" 
                  data-ai-hint={stage.dataAiHint}
                  draggable="false"
                />
              </div>
              <CardHeader>
                <PhaseShape className="mb-2">
                  {stage.phase.split('(')[0].trim()}
                </PhaseShape>
                <p className="text-sm text-muted-foreground">{stage.phase.match(/\(([^)]+)\)/)?.[0]}</p>
                <CardTitle className="text-xl text-foreground mt-2">{stage.phase.split(':')[0]}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{stage.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <Image 
          src="https://placehold.co/700x400.png" 
          alt="Pakar Ortopedi Merekomendasikan Ovisure Gold" 
          width={700} 
          height={400} 
          className="rounded-lg shadow-md mx-auto"
          data-ai-hint="doctor expert recommendation"
          draggable="false"
        />
      </div>
    </SectionWrapper>
  );
};

export default ExpertAdviceSection;
