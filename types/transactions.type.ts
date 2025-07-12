export interface TransaksiType {
  id_transaksi: string;
  keterangan: string;
  penerima: string;
  no_telp: string;
  pengiriman: string;
  alamat: string;
  ongkir: number;
  pajak?: number;
  persen_pajak?: number;
  total_belanja: number;
  total_pembayaran: number;
  tunai: number;
  tipe: string;
  diskon?: number;
  persen_diskon?: number;
  unique_key: string;
  created_at: string;
  updated_at: string;
  list_produk?: ListProduk[];
  status: string;
  metode: string;
  dp: number;
  pembayaran: number;
  estimasi: string;
  asal_transaksi: string;
  state: "success" | "cancelled";
}

export interface ListProduk {
  kode_item: string;
  jumlah: number;
  satuan: string;
  nama_produk: string;
  gudang: string;
  rak: string;
  harga: number;
  sub_total: number;
  diskon_langsung_item: number;
  diskon_persen_item: number;
}
