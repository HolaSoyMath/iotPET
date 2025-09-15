export type PetInfoType = {
  id?: number;
  name: string;
  type: string;
  image: string;
  gender: string;
  age: number;
  lastFeeding: Date;
};

export const pets: PetInfoType[] = [
  {
    id: 1,
    name: "Bola",
    type: "Pinscher",
    image: "/bola.png",
    gender: "Feminino",
    age: 6,
    lastFeeding: new Date("2025-09-13T13:40:00-03:00"),
  },
  {
    id: 2,
    name: "Bonnie",
    type: "Vira-Lata",
    image: "/bonnie.png",
    gender: "Feminino",
    age: 10,
    lastFeeding: minutesAgo(8),
  },
];


function minutesAgo(min: number): Date {
  return new Date(Date.now() - min * 60_000);
}