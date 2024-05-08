export type MembersLevelsType = {
  id: string;
  name: string;
  created_at: string;
};

export const memberLevels: MembersLevelsType[] = [
  {
    id: "LEVEL100520241",
    name: "Level 1",
    created_at: "10 Mei 2024 20:00",
  },
  {
    id: "LEVEL070520241",
    name: "Level 2",
    created_at: "7 Mei 2024 20:00",
  },
];

export type MembersType = {
  id: string;
  name: string;
  level: string;
  created_at: string;
};

export const members: MembersType[] = [
  {
    id: "MEMBER01",
    name: "Agen 1",
    level: "Level 1",
    created_at: "10 Mei 2024 05:00",
  },
  {
    id: "MEMBER02",
    name: "Agen 2",
    level: "Level 2",
    created_at: "10 Mei 2024 05:00",
  },
];
