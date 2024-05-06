export type CategoriesType = {
  code: string;
  name: string;
  created_at: string;
};

export const categories: CategoriesType[] = [
  {
    code: "TEST01",
    name: "Cat",
    created_at: "10 Mei 2024 19:00",
  },
  {
    code: "TEST02",
    name: "Atap",
    created_at: "10 Mei 2024 19:00",
  },
  {
    code: "TEST03",
    name: "Peralatan Rumah",
    created_at: "10 Mei 2024 19:00",
  },
];

export type SubCategoriesType = {
  code: string;
  name: string;
  category: string;
  created_at: string;
};

export const subcategories: SubCategoriesType[] = [
  {
    code: "SUBTEST01",
    category: "TEST01",
    name: "Cat Dinding",
    created_at: "10 Mei 2024 19:00",
  },
  {
    code: "SUBTEST02",
    category: "TEST02",
    name: "Atap Rumah",
    created_at: "10 Mei 2024 19:00",
  },
  {
    code: "SUBTEST03",
    category: "TEST02",
    name: "Peralatan Masak",
    created_at: "10 Mei 2024 19:00",
  },
];
