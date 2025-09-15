export type FeedingType = {
  id?: number;
  time: string;
  weight: number;
};

export const feeding: FeedingType[] = [
  {
    id: 1,
    time: '08:00',
    weight: 100,
  },
  // {
  //   id: 2,
  //   time: '12:00',
  //   weight: 300,
  // },
  // {
  //   id: 3,
  //   time: '18:00',
  //   weight: 250,
  // },
  // {
  //   id: 4,
  //   time: '22:00',
  //   weight: 300,
  // }
];
