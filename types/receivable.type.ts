export type ReceivableTableType = {
  id: number | string;
  name: string;
  due_date: string;
  bill_amount: number;
  bill_status: "lunas" | "belum bayar";
};
