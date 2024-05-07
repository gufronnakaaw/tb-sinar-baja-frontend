export type PreOrdersType = {
  id: string;
  date: string;
  total: number;
  customer: string;
};

export const preorders: PreOrdersType[] = [
  {
    id: "PO07052024",
    date: "7 Mei 2024 09:45",
    total: 1000000,
    customer: "Agen 1",
  },
  {
    id: "PO05052024",
    date: "5 Mei 2024 09:45",
    total: 1200000,
    customer: "Agen 2",
  },
  {
    id: "PO01052024",
    date: "1 Mei 2024 09:45",
    total: 10900000,
    customer: "Agen 1",
  },
  {
    id: "PO29022024",
    date: "29 April 2024 09:45",
    total: 40000000,
    customer: "Agen 2",
  },
];
