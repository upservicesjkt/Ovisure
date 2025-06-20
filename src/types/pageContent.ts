
export interface HeroContent {
  kicker: string;
  headlineMain: string;
  headlineEmphasis: string;
  paragraphBeforeBold: string;
  paragraphBoldText: string;
  paragraphAfterBold?: string;
  imageSrc: string;
  dataAiHint: string;
}

export interface CtaImproveHealthSectionContent {
  imageSrc: string;
  dataAiHint: string;
}

export interface PageContent {
  heroSection?: HeroContent;
  ctaImproveHealthSection?: CtaImproveHealthSectionContent;
  // Define other sections here as they become editable
  // e.g. benefitsSection?: BenefitsContent;
}
