
import Image from 'next/image';
import SectionWrapper from '@/components/ui/section-wrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X, ShieldCheck, HeartPulse, Vegan } from 'lucide-react';

const ovisureGoldFeatures = [
  "Komposisi dengan 3 bahan aktif UNIVESTIN + AQUAMINF + MSM untuk pemulihan cepat.",
  "Susu kacang 100% protein nabati dari AS.",
  "Rasa manis ringan, enak, mudah dicerna, tidak kembung.",
  "Tanpa efek samping, aman untuk penderita penyakit jantung, diabetes, tekanan darah, dan vegetarian."
];

const regularMilkIssues = [
  "Banyak eksipien, sulit diawetkan, memperlambat efek, membahayakan lambung.",
  "Butuh waktu lama untuk mengurangi nyeri, bengkak, dan peradangan.",
  "Sulit diminum, sulit dicerna, menyebabkan kenaikan berat badan.",
  "Tidak cocok untuk penderita penyakit jantung, tekanan darah, diabetes.",
  "Tidak ada percobaan yang membuktikan efektifitasnya."
];

const ComparisonSection = () => {
  return (
    <SectionWrapper id="perbandingan" className="bg-background">
      <div className="text-center mb-12">
        <h2 id="perbandingan-heading" className="text-3xl md:text-4xl font-bold text-foreground">
          Mengapa Perlu Menggunakan <span className="text-primary">Ovisure Gold</span>?
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Lihat perbedaan signifikan antara Ovisure Gold dan susu biasa untuk kesehatan tulang dan sendi Anda.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <Card className="shadow-lg border-red-500/30 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <CardHeader className="bg-red-100 dark:bg-red-900/30 rounded-t-lg">
            <CardTitle className="text-2xl text-red-700 dark:text-red-400 text-center">SUSU BIASA</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-3">
            <Image 
              src="https://jektvnews.disway.id/upload/8bb943e096a1da0176035953cd58265e.jpg" 
              alt="Susu Biasa" 
              width={400} 
              height={250} 
              className="rounded-md mb-4 mx-auto object-cover"
              data-ai-hint="milk product"
              draggable="false"
            />
            {regularMilkIssues.map((item, index) => (
              <div key={index} className="flex items-start">
                <X className="h-5 w-5 text-red-500 mr-2 shrink-0 mt-1" />
                <p className="text-muted-foreground">{item}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-lg border-primary/50 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="bg-primary/10 rounded-t-lg">
            <CardTitle className="text-2xl text-primary text-center">OVISURE GOLD</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-3">
             <Image 
              src="https://w.ladicdn.com/s450x450/6635dc99ef5f4900127bad81/ovims1-20241230042159-jqjwx-20250106044851-73wrj.png" 
              alt="Ovisure Gold" 
              width={250} 
              height={250} 
              className="rounded-md mb-4 mx-auto object-contain"
              data-ai-hint="Ovisure Gold product"
              draggable="false"
            />
            {ovisureGoldFeatures.map((item, index) => (
              <div key={index} className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-1" />
                <p className="text-foreground">{item}</p>
              </div>
            ))}
            <div className="mt-6 pt-4 border-t border-border flex flex-wrap gap-4 justify-center">
                <div className="flex items-center text-sm text-primary"><ShieldCheck className="mr-1 h-4 w-4"/> Aman Teruji</div>
                <div className="flex items-center text-sm text-primary"><HeartPulse className="mr-1 h-4 w-4"/> Baik untuk Jantung</div>
                <div className="flex items-center text-sm text-primary"><Vegan className="mr-1 h-4 w-4"/> Vegetarian Friendly</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 items-center">
        <Image
          src="https://w.ladicdn.com/6635dc99ef5f4900127bad81/1-20230131083448-cuqi0-20240601045206-0sgzv-20240921070118-qlosv-20250316063229-wqxpl-20250514043016-2cyag.gif"
          alt="Ovisure Gold Benefit Animation 1"
          width={300}
          height={200}
          className="rounded-md mx-auto object-contain"
          data-ai-hint="animation benefit one"
          unoptimized
          draggable="false"
        />
        <Image
          src="https://w.ladicdn.com/6635dc99ef5f4900127bad81/2-20230131083237-5xavx-20240601045206-cgxph-20240921070156-kx-nh-20250316063230-uiaoz-20250514043017-1wfvm.gif"
          alt="Ovisure Gold Benefit Animation 2"
          width={300}
          height={200}
          className="rounded-md mx-auto object-contain"
          data-ai-hint="animation benefit two"
          unoptimized
          draggable="false"
        />
        <Image
          src="https://w.ladicdn.com/6635dc99ef5f4900127bad81/3-20230131081305-qqelc-20240601045206-dhksj-20240921070156-pnqn4-20250316063230-npems-20250514043010-cs36q.gif"
          alt="Ovisure Gold Benefit Animation 3"
          width={300}
          height={200}
          className="rounded-md mx-auto object-contain"
          data-ai-hint="animation benefit three"
          unoptimized
          draggable="false"
        />
      </div>
    </SectionWrapper>
  );
};

export default ComparisonSection;
