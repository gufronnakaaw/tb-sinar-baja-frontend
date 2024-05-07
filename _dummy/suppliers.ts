export type SuppliersType = {
  code: string;
  name: string;
  price: number;
  product: string;
  created_at: string;
};

export const suppliers: SuppliersType[] = [
  {
    code: "SUP1",
    name: "Supplier 1",
    price: 110000,
    product: "Cat Dulux",
    created_at: "10 Mei 2024 10:00",
  },
  {
    code: "SUP2",
    name: "Supplier 2",
    price: 109000,
    product: "Cat Dulux",
    created_at: "10 Mei 2024 10:00",
  },
];
