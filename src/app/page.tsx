import HeroSection from '@/components/sections/hero-section';
import CommitmentSection from '@/components/sections/commitment-section';
import BenefitsSection from '@/components/sections/benefits-section';
import CtaImproveHealthSection from '@/components/sections/cta-improve-health-section';
import PressSection from '@/components/sections/press-section';
import ComparisonSection from '@/components/sections/comparison-section';
import FormulaSection from '@/components/sections/formula-section';
import PlantExtractBenefitsSection from '@/components/sections/plant-extract-benefits-section';
import KeyAdvantagesSection from '@/components/sections/key-advantages-section';
import ExpertAdviceSection from '@/components/sections/expert-advice-section';
import UsageGuideSection from '@/components/sections/usage-guide-section';
import VideoPlayerSection from '@/components/sections/video-player-section';
import GallerySection from '@/components/sections/gallery-section';
import OrderFormSection from '@/components/sections/order-form-section';
import CustomerTestimonialsSection from '@/components/sections/customer-testimonials-section';
import CertificationsSection from '@/components/sections/certifications-section';
import FinalCtaSection from '@/components/sections/final-cta-section';
import FixedCtaButton from '@/components/fixed-cta-button';

export default function Home() {
  return (
    <>
      <HeroSection />
      <CommitmentSection />
      <BenefitsSection /> {/* id: manfaat */}
      <CtaImproveHealthSection />
      <PressSection />
      <ComparisonSection />
      <FormulaSection /> {/* id: kandungan */}
      <PlantExtractBenefitsSection />
      <KeyAdvantagesSection />
      <ExpertAdviceSection />
      <UsageGuideSection /> {/* id: cara-pakai */}
      <VideoPlayerSection /> 
      {/* Testimonials (SECTION25) are combined in CustomerTestimonialsSection with videos */}
      <CustomerTestimonialsSection /> {/* id: testimoni */}
      <GallerySection />
      <CertificationsSection />
      <OrderFormSection /> {/* id: harga & pesan */}
      <FinalCtaSection />
      <FixedCtaButton />
    </>
  );
}
