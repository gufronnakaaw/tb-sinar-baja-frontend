export type OrdersType = {
  id: string;
  date: string;
  total: number;
  to: string;
};

export const orders: OrdersType[] = [
  {
    id: "ORDER02022024",
    date: "3 Mei 2024 09:45",
    total: 1000000,
    to: "Supplier A",
  },
  {
    id: "ORDER02022024",
    date: "3 Mei 2024 09:45",
    total: 1020000,
    to: "Supplier B",
  },
  {
    id: "ORDER02022024",
    date: "3 Mei 2024 09:45",
    total: 29000000,
    to: "Supplier B",
  },
  {
    id: "ORDER02022024",
    date: "3 Mei 2024 09:45",
    total: 3500000,
    to: "Toko Lain",
  },
];
