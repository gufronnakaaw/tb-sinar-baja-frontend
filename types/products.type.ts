export type ProdukType = {
  kode_item: string;
  barcode?: any;
  kode_pabrik?: any;
  kode_toko?: any;
  kode_supplier?: any;
  nama_produk: string;
  nama_produk_asli?: string;
  nama_produk_sebutan?: any;
  merk?: any;
  tipe?: any;
  satuan_besar?: any;
  satuan_kecil?: string;
  isi_satuan_besar?: any;
  konversi?: any;
  harga_pokok?: number;
  harga_1?: number;
  harga_2?: number;
  harga_3?: number;
  harga_4: number;
  harga_5?: any;
  harga_6?: any;
  stok?: number;
  created_at: string;
  updated_at: string;
  rak?: string;
  stok_aman: number;
  subkategori?: string;
  gudang?: string;
  kategori: string;
  status_stok: string;
};

export type ProdukKategoriType = {
  id_kategori: string;
  nama: string;
  created_at: string;
  updated_at: string;
};

export type ProdukSubKategoriType = {
  id_subkategori: number;
  nama: string;
  created_at: string;
};

export type ProdukSearchType = {
  kode_item: string;
  barcode?: any;
  kode_pabrik?: any;
  kode_toko?: any;
  kode_supplier?: any;
  nama_produk: string;
  nama_produk_asli?: string;
  nama_produk_sebutan?: any;
  merk?: any;
  tipe?: any;
  satuan_besar?: any;
  satuan_kecil?: string;
  isi_satuan_besar?: any;
  konversi?: any;
  harga_pokok?: number;
  harga_1?: number;
  harga_2?: number;
  harga_3?: number;
  harga_4: number;
  harga_5?: any;
  harga_6?: any;
  stok?: number;
  created_at: string;
  updated_at: string;
  rak?: string;
  stok_aman: number;
  subkategori?: string;
  gudang?: string;
  kategori: string;
  status_stok: string;
  hargaquantity: HargaQuantity[];
};

export type HargaQuantity = {
  id_table: number;
  harga: number;
  quantity: number;
  keterangan: string;
  produk_id: string;
};
