export type FilterApi = {
  id_kategori: number;
  nama: string;
  produk: FilterProduk[];
};

export type FilterProduk = {
  nama_sub_kategori_produk: string;
  sub_kategori_produk: string;
  merk: any;
  nama_produk: string;
  kode_item: string;
  nama_produk_asli: string;
  kode_supplier: string;
  satuan_kecil: string;
  satuan_besar: any;
  isi_satuan_besar: any;
  harga_pokok: number;
  harga_1: number;
  harga_2: number;
  harga_3: number;
  harga_4: number;
  harga_5: number;
  harga_6: number;
  gudang: string;
  rak: string;
  stok: number;
  stok_aman: number;
  nama_produk_sebutan: any;
  konversi: any;
  berat: any;
  volume: any;
  tipe: any;
  barcode: any;
  kode_pabrik: any;
  kode_toko: any;
};
