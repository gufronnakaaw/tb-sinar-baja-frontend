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
    name: "Fajar Fadillah Agustian",
    price: 110000,
    product: "Pipa UPVC Alderon AW 1 Pipa UPVC Alderon AW 1",
    created_at: "10 Mei 2024 10:00",
  },
  {
    code: "SUP2",
    name: "Supplier 2",
    price: 109000,
    product: "Pipa UPVC Alderon D 3",
    created_at: "10 Mei 2024 10:00",
  },
];
