import { PaymentsType } from "@/types/payments.type";

export const payments: PaymentsType[] = [
  {
    id: "PAY10052024",
    date: "10 Mei 2024 10:00",
    from: "Fajar Fadillah Agustian",
    status: "piutang",
    total: 1000000,
  },
  {
    id: "PAY08052024",
    date: "8 Mei 2024 10:00",
    from: "Supplier B",
    status: "lunas",
    total: 17600000,
  },
  {
    id: "PAY05052024",
    date: "5 Mei 2024 10:00",
    from: "Umum",
    status: "lunas",
    total: 1000000,
  },
];
