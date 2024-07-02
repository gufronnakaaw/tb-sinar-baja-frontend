import { TransaksiType } from "./transactions.type";

export type ReturnType = {
  id_return: string;
  transaksi_id: string;
  id_transaksi_bank: any;
  nama_bank: any;
  atas_nama: any;
  no_rekening: any;
  metode: string;
  jumlah: number;
  penalti_keseluruhan: any;
  created_at: string;
  updated_at: string;
  penerima: string;
  total_item: string;
};

export type ReturnDetailPage = {
  id_return: string;
  transaksi_id: string;
  id_transaksi_bank: any;
  nama_bank: any;
  atas_nama: any;
  no_rekening: any;
  metode: string;
  jumlah: number;
  penalti_keseluruhan: number;
  created_at: string;
  updated_at: string;
  transaksi: TransaksiType;
  returndetail: ReturnDetail[];
};

export type ReturnDetail = {
  jumlah: number;
  satuan: string;
  nama_produk: string;
  kode_item: string;
  gudang: string;
  rak: string;
  harga: number;
  diskon_langsung_item: number;
  diskon_persen_item: number;
  sub_total: number;
  diskon_per_item: number;
  penalti_item: number;
  total_pengembalian: number;
  harga_setelah_diskon: number;
};
