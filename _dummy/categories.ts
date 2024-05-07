export type CategoriesType = {
  code: string;
  name: string;
  created_at: string;
};

export const categories: CategoriesType[] = [
  {
    code: "CAT01",
    name: "Paralon",
    created_at: "10 Mei 2024 19:00",
  },
  {
    code: "CAT02",
    name: "Selang",
    created_at: "10 Mei 2024 19:00",
  },
  {
    code: "CAT03",
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
    code: "SUBCAT01",
    category: "CAT01",
    name: "Pipa Bulat UPVC",
    created_at: "10 Mei 2024 19:00",
  },
  {
    code: "SUBCAT02",
    category: "CAT02",
    name: "Selang Benang",
    created_at: "10 Mei 2024 19:00",
  },
];
