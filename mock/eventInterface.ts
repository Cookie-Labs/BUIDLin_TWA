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
    prize: string;
    emoji: string;
  }[];
  telegramLink?: string;
  country: string;
  location: {
    address: string;
    latitude?: number;
    longitude?: number;
  };
  schedule?: {
    date: number;
    programs: {
      time: string;
      title: string;
      emoji: string;
    }[];
  }[];
  speakers: {
    imgUrl: string;
    name: string;
    position: string;
  }[];
}
