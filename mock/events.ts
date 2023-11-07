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

export const eventsInProgress: EventForm[] = [
  {
    id: 'd154475d-63db-43ca-945f-2968561c6077',
    posterImgUrl: require('./event1Image.png'),
    host: 'Dayk Jang',
    title: 'The 1st Korea-Japan Hackathon',
    country: 'Korea',
    location: {
      address: '',
      latitude: 0,
      longitude: 0,
    },
    schedule: [1703980800000, 1704178800000],
    description: `The first hackathon hosted by Coconet will focus on 'Ideas Using AI.' We encourage participants to register as soon as possible.`,
    telegramLink: '',
    speakers: [
      {
        imgUrl: '',
        name: 'Cheon',
        position: '',
      },
      {
        imgUrl: '',
        name: 'Dayk Jang',
        position: '',
      },
      {
        imgUrl: '',
        name: 'Choi',
        position: '',
      },
    ],
  },
];
