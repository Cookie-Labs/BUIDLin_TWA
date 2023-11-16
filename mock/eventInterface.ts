export interface EventForm {
  id: string;
  posterImgUrl: string;
  host: string;
  hostImgUrl: string;
  title: string;
  description: string;
  award?: {
    rank: string;
    teamCount: string;
    prize: number;
    currency: string;
    emoji: string;
  }[];
  telegram?: {
    name: string;
    link: string;
    emoji: string;
  }[];
  country: string;
  location: {
    address: string;
    latitude?: number;
    longitude?: number;
  };
  schedule: {
    date: number;
    programs?: {
      time: string;
      title: string;
      emoji: string;
    }[];
  }[];
  speakers?: {
    imgUrl: string;
    name: string;
    position: string;
  }[];
  sponsors?: {
    imgUrl: string;
    name: string;
  }[];
  applyForm?: {
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
  }[];
}
