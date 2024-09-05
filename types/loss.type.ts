export type LossType = {
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

export type LossDetail = {
  id_ba: string;
  created_at: string;
  total: number;
};
