export type OrdersType = {
  id: string;
  date: string;
  total: number;
  to: string;
};

export const orders: OrdersType[] = [
  {
    id: "ORDER03052024",
    date: "3 Mei 2024 09:45",
    total: 1000000,
    to: "Supplier A",
  },
  {
    id: "ORDER01052024",
    date: "1 Mei 2024 09:45",
    total: 1020000,
    to: "Supplier B",
  },
  {
    id: "ORDER29042024",
    date: "29 April 2024 09:45",
    total: 29000000,
    to: "Supplier B",
  },
  {
    id: "ORDER28042024",
    date: "28 April 2024 09:45",
    total: 3500000,
    to: "Toko Lain",
  },
];
