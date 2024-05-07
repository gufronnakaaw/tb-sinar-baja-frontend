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
    id: "INVIN10052024",
    reference: "9818200198274",
    from: "Supplier A",
    total: 100000000,
    due_date: "10 Mei 2024 23:59",
    description: "Invoice pembelian Pipa Bulat UPVC",
  },
  {
    id: "INVIN05052024",
    reference: "1182900471623",

    from: "Supplier B",
    total: 24000000,
    due_date: "5 Mei 2024 23:59",
    description: "Invoice pembelian Selang Benang",
  },
];

export const invout: InvoicesOutType[] = [
  {
    id: "INVOUT03052024",
    date: "3 Mei 2024 09:45",
    total: 1000000,
    to: "Fajar Fadillah Agustian",
  },
  {
    id: "INVOUT02052024",
    date: "2 Mei 2024 09:45",
    total: 12900000,
    to: "Agen 2",
  },
  {
    id: "INVOUT29042024",
    date: "29 April 2024 09:45",
    total: 24400000,
    to: "Agen 3",
  },
];
