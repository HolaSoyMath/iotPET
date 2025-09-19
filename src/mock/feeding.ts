export type FeedingType = {
  id?: number;
  time: string;
  weight: number;
};

export const feeding: FeedingType[] = [
  {
    time: '08:00',
    weight: 100,
  },
  {
    time: '12:00',
    weight: 300,
  },
  {
    time: '18:00',
    weight: 250,
  },
];
