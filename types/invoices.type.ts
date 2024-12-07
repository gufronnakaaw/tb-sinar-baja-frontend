import { TransaksiType } from "./transactions.type";

export type InvoutType = {
  id_invoice: string;
  transaksi_id: string;
  dp: number;
  tagihan: number;
  sisa: number;
  jatuh_tempo: any;
  created_at: string;
  status: string;
  invoicekeluardetail: InvoutDetail[];
  transaksi: TransaksiType;
  penerima: string;
};

export type InvoutDetail = {
  id_transaksi: string;
  nama_bank: string;
  atas_nama: string;
  no_rekening: string;
  tipe: string;
  jumlah: number;
  created_at: string;
};
