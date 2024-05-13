export type PaymentsType = {
  id: string;
  date: string;
  from: string;
  status: "lunas" | "piutang";
  total: number;
};
