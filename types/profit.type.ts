export type ProfitType = {
  today: {
    tanggal: string;
    total: number;
  };
  last_week: {
    tanggal: string;
    total: number;
  }[];
  total_items: number;
  page: number;
};

export type ProfitDetail = {
  id_transaksi: string;
  total_pembayaran: number;
  created_at: string;
};
