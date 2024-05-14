import {
  ProductsCategoriesType,
  ProductsSubCategoriesType,
} from "@/types/productsCategories.type";

export const categories: ProductsCategoriesType[] = [
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
];

export const subcategories: ProductsSubCategoriesType[] = [
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
