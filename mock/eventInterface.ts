export interface EventForm {
  id: string;
  posterImgUrl: string;
  host: string;
  title: string;
  country: string;
  location: {
    address: string;
    latitude: number;
    longitude: number;
  };
  schedule: [number, number];
  description: string;
  telegramLink: string;
  speakers: {
    imgUrl: string;
    name: string;
    position: string;
  }[];
}
