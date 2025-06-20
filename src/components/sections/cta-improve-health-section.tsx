
import Image from 'next/image';
import SectionWrapper from '@/components/ui/section-wrapper';
import { CheckCircle } from 'lucide-react';

const newCommitmentBenefits = [
  "Mengahkiri disk herniasi",
  "Pencegahan dan pengobatan osteoporosis",
  "Meningkatkan ketahan bagi lansia",
  "Nyeri sendi akibat radang sendi pada orang tua",
  "Nyeri, kaku, sulit digerakan",
  "Kelelahan tulang, kelelahan otot karena usia tua",
  "Sakit punggung, sakit tulang belakang, sakit lutut, sakit bahu",
  "Hernia artinya bantal, sakit punggung"
];

const CtaImproveHealthSection = () => {
  return (
    <SectionWrapper id="cta-improve-health" className="bg-background">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
        
        <div className="relative mx-auto w-full max-w-2xl md:max-w-3xl aspect-[5/6] overflow-hidden"> 
          <Image
            src="https://w.ladicdn.com/s750x900/6635dc99ef5f4900127bad81/im13-20231020043619-qwtkf-photoroom-20250514041247-g8wwn.png"
            alt="Dokter merekomendasikan Ovisure Gold"
            width={750} 
            height={900} 
            className="absolute w-full h-auto object-contain top-[-65px] md:top-[-125px]"
            data-ai-hint="doctor recommendation product"
            priority 
            draggable="false"
          />
          <div 
            className="z-10"
            style={{ position: 'absolute', bottom: '0px', right: '50%', height: '65%' }}
          >
            <Image
              src="https://w.ladicdn.com/s650x700/6635dc99ef5f4900127bad81/ban_sao_cua_8-removebg-preview-20241230042307-ap00s-20250316061049-umd57-20250514042039-03c_n.png"
              alt="Produk Ovisure Gold dengan susu"
              width={650}
              height={700}
              className="object-contain w-full h-full"
              data-ai-hint="product shot milk ingredients"
              draggable="false"
            />
          </div>
          <div className="absolute bottom-[2%] right-[5%] w-[50%] z-20">
            <Image
              src="https://w.ladicdn.com/s550x550/6635dc99ef5f4900127bad81/thanh-phan-ovi-20241230035543-67amy-20250316061206-eb0b--20250514042045-sfkfv.png"
              alt="Bahan-bahan alami Ovisure Gold"
              width={550}
              height={550}
              className="object-contain w-full h-auto" 
              data-ai-hint="natural ingredients plant-based"
              draggable="false"
            />
          </div>
        </div>

        <div className="space-y-6 md:pt-8">
          <div className="text-center mb-6">
            <div className="inline-block bg-white text-red-700 font-bold uppercase p-3 px-8 rounded-lg border-2 border-red-300 text-xl">
              KOMITMEN KITA
            </div>
          </div>

          <p className="text-red-700 font-semibold text-xl md:text-2xl mb-4 leading-snug text-left">
            PENCEGAHAN DAN PENGOBATAN DEFINITIF PENYAKIT:
          </p>
          
          <ul className="space-y-2.5 mb-8">
            {newCommitmentBenefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-600 mr-3 shrink-0 mt-0.5" />
                <span className="text-foreground text-base md:text-lg">{benefit}</span>
              </li>
            ))}
          </ul>
          
          <div className="text-center">
            <h2 
              id="cta-heading" 
              className="text-base md:text-lg font-bold text-white bg-red-700 px-6 py-3 rounded-lg inline-block animate-pulse-heading"
            >
              Tingkatkan Kesehatan Tulang dan Sendi Anda Hari Ini!
            </h2>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default CtaImproveHealthSection;
