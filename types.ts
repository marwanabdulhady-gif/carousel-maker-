export interface Character {
  name: string;
  role: string;
  personality: string;
  visualDescription: string;
  imagePrompt: string;
}

export interface Slide {
  slideNumber: number;
  type: 'hook' | 'content' | 'transition' | 'cta';
  headline: string;
  bodyText: string;
  visualDescription: string;
  imagePrompt: string;
  speakerNotes: string;
}

export interface CarouselData {
  title: string;
  overview: string;
  targetAudienceAnalysis: string;
  toneDialectNotes: string;
  characters: Character[];
  slides: Slide[];
}

export type Language = 'en' | 'ar';

export interface UserInput {
  language: Language;
  concept: string;
  targetAudience: string;
  tone: string;
  platform: string;
  goal: string;
  cta: string;
  slideCount: number;
  artStyle: string;
  additionalContext?: string;
}

export enum GenerationStatus {
  IDLE = 'IDLE',
  GENERATING = 'GENERATING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}
