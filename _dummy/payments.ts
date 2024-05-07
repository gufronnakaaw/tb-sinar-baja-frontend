export type PaymentsType = {
  id: string;
  date: string;
  from: string;
  status: "lunas" | "hutang";
  total: number;
};

export const payments: PaymentsType[] = [
  {
    id: "PAY02022024",
    date: "10 Mei 2024 10:00",
    from: "Supplier A",
    status: "hutang",
    total: 1000000,
  },
  {
    id: "PAY02022024",
    date: "10 Mei 2024 10:00",
    from: "Supplier B",
    status: "lunas",
    total: 17600000,
  },
  {
    id: "PAY02022024",
    date: "10 Mei 2024 10:00",
    from: "Umum",
    status: "lunas",
    total: 1000000,
  },
];
