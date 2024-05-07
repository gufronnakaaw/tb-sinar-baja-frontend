export type InvoicesInType = {
  id: string;
  reference: string;
  from: string;
  total: number;
  due_date: string;
  description: string;
};

export type InvoicesOutType = {
  id: string;
  date: string;
  total: number;
  to: string;
};

export const invin: InvoicesInType[] = [
  {
    id: "INVIN02022024",
    reference: "0909091212212",
    from: "Supplier A",
    total: 100000000,
    due_date: "10 Mei 2024 23:59",
    description: "Invoice pembelian helikopter",
  },
  {
    id: "INVIN02022024",
    reference: "0909091212212",

    from: "Supplier B",
    total: 24000000,
    due_date: "10 Mei 2024 23:59",
    description: "Invoice pembelian cat dinding",
  },
  {
    id: "INVIN02022024",
    reference: "0909091212212",

    from: "Supplier A",
    total: 9000000,
    due_date: "10 Mei 2024 23:59",
    description: "Invoice pembelian pasir 20 kg",
  },
];

export const invout: InvoicesOutType[] = [
  {
    id: "INVOUT02022024",
    date: "3 Mei 2024 09:45",
    total: 1000000,
    to: "Pelanggan A",
  },
  {
    id: "INVOUT02022024",
    date: "3 Mei 2024 09:45",
    total: 12900000,
    to: "Pelanggan B",
  },
  {
    id: "INVOUT02022024",
    date: "3 Mei 2024 09:45",
    total: 24400000,
    to: "Pelanggan C",
  },
];