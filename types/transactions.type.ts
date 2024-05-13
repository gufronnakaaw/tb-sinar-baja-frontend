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
  unique_key: string;
  created_at: string;
  updated_at: string;
  list_produk?: ListProduk[];
}

export interface ListProduk {
  kode_item: string;
  jumlah: number;
  satuan: string;
  nama_produk: string;
  harga: number;
  sub_total: number;
}
