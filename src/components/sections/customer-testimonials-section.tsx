
import SectionWrapper from '@/components/ui/section-wrapper';
import VideoEmbed from '@/components/video-embed';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import type { Testimonial } from '@/types/testimonial';
// Import the testimonials from the JSON file
import testimonialsData from '@/data/testimonials.json';

const CustomerTestimonialsSection = () => {
  const testimonials: Testimonial[] = testimonialsData;

  return (
    <SectionWrapper id="testimoni" className="bg-orange-50">
      <div className="text-center mb-12">
        <h2 id="testimoni-heading" className="text-3xl md:text-4xl font-bold text-foreground">
          Umpan Balik dari <span className="text-primary">Pelanggan Indonesia</span>
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Dengarkan langsung pengalaman mereka setelah menggunakan Ovisure Gold.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => (
          <Card 
            key={index} 
            className="flex flex-col animate-slide-up bg-transparent border-none shadow-none" 
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader>
              <VideoEmbed videoId={testimonial.videoId} title={`Testimoni ${testimonial.name}`} />
            </CardHeader>
            <CardContent className="flex-grow mt-4">
              <div className="flex items-center mb-3">
                <Image 
                  src={testimonial.imageSrc} 
                  alt={testimonial.name} 
                  width={50} 
                  height={50} 
                  className="rounded-full mr-3" 
                  data-ai-hint={testimonial.dataAiHint} 
                  draggable="false"
                />
                <div>
                  <CardTitle className="text-xl text-foreground">{testimonial.name}</CardTitle>
                  {testimonial.age && <CardDescription>{testimonial.age}</CardDescription>}
                </div>
              </div>
              <blockquote className="text-muted-foreground italic border-l-4 border-primary pl-4">
                "{testimonial.quote}"
              </blockquote>
            </CardContent>
          </Card>
        ))}
      </div>
       <div className="mt-12 text-center">
        <div className="relative w-full max-w-3xl mx-auto aspect-[7/3] overflow-hidden rounded-lg">
          <Image
            src="https://w.ladicdn.com/s750x550/6635dc99ef5f4900127bad81/imfg25-20250224091616-3g8xk-20250514082841-ujrok.png"
            alt="Kepuasan Pelanggan Ovisure Gold"
            layout="fill"
            objectFit="contain"
            data-ai-hint="happy customers results"
            draggable="false"
          />
        </div>
      </div>
    </SectionWrapper>
  );
};

export default CustomerTestimonialsSection;
