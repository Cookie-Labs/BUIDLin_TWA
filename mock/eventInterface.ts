export interface AwardForm {
  rank: string;
  teamCount: string;
  prize: number;
  currency: string;
  emoji: string;
}

export interface TelegramForm {
  name: string;
  link: string;
  emoji: string;
}

export interface LocationForm {
  address: string;
  latitude?: number;
  longitude?: number;
}

export interface ScheduleForm {
  date: number;
  programs?: {
    time: string;
    title: string;
    emoji: string;
  }[];
}

export interface SpeakersForm {
  imgUrl: string;
  name: string;
  position: string;
}

export interface SponsorsForm {
  imgUrl: string;
  name: string;
}

export interface ApplyForm {
  title: string;
  introduction?: string;
  link?: string[];
  questions?: {
    question: string;
    type: 'open' | 'binary' | 'single' | 'multiple' | 'hidden' | 'consent';
    required: boolean;
    options?: string[];
    hiddenQuestion?: {
      question: string;
      type: 'open' | 'binary' | 'single' | 'multiple' | 'hidden' | 'consent';
      required: boolean;
      options?: string[];
    }[];
  }[];
}

export interface EventForm {
  id: string;
  posterImgUrl: string;
  host: string;
  hostImgUrl: string;
  title: string;
  description: string;
  award?: AwardForm[];
  telegram?: TelegramForm[];
  country: string;
  location: LocationForm;
  schedule: ScheduleForm[];
  speakers?: SpeakersForm[];
  sponsors?: SponsorsForm[];
  applyForm?: ApplyForm[];
}
