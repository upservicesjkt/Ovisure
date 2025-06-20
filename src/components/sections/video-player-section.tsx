
import Image from 'next/image';
import SectionWrapper from '@/components/ui/section-wrapper';
import VideoEmbed from '@/components/video-embed';
import { Quote } from 'lucide-react';

const VideoPlayerSection = () => {
  const quoteText = "Produk khusus untuk pasien osteoarthritis, dengan efek menutrisi tulang dan sendi secara intensif, dilengkapi dengan kalsium untuk meningkatkan kepadatan tulang untuk membantu memperkuat tulang, meregenerasi, dan memulihkan tulang dan sendi yang sehat. Produk ini dapat dianggap sebagai terobosan dalam transfer teknologi dan bahan oleh ilmuwan Indo dan AS untuk membantu mengobati semua penyakit tulang dan sendi termasuk herniated, syaraf kejepit, spondylolisthesis, dan spondylolisthesis, spina bifida, osteoporosis akut dan kronis.";

  return (
    <SectionWrapper id="video-testimoni" className="bg-background">
      <div className="text-center mb-12">
        <h2 id="video-testimoni-heading" className="text-3xl md:text-4xl font-bold text-foreground">
          Lihat Bagaimana <span className="text-primary">Ovisure Gold Membantu</span>
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Saksikan testimoni langsung dari pengguna yang telah merasakan manfaat Ovisure Gold.
        </p>
      </div>
      <div className="max-w-3xl mx-auto">
        <VideoEmbed videoId="H7WolETYsC4" title="Testimoni Ovisure Gold" />
      </div>

      <div className="mt-12 max-w-3xl mx-auto p-6 md:p-8 bg-orange-50 rounded-lg shadow-lg border border-primary/20">
        <blockquote className="relative">
          <Quote className="absolute -top-3 -left-3 md:-top-4 md:-left-4 h-10 w-10 md:h-12 md:w-12 text-primary/70 transform rotate-180" aria-hidden="true" />
          <p className="text-base md:text-lg text-foreground italic leading-relaxed pt-8 pl-8 md:pt-10 md:pl-10 pb-8 pr-8 md:pb-10 md:pr-10">
            {quoteText}
          </p>
          <Quote className="absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4 h-10 w-10 md:h-12 md:w-12 text-primary/70" aria-hidden="true" />
        </blockquote>
      </div>
    </SectionWrapper>
  );
};

export default VideoPlayerSection;
