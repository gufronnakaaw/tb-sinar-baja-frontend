export type SupplierType = {
  id_supplier: string;
  nama: string;
  email: string;
  no_telp: string;
  alamat_kantor: string;
  alamat_gudang: string;
  keterangan: string;
  created_at: string;
};

export type SupplierBank = {
  id_table: number;
  supplier_id: string;
  nama: string;
  atas_nama: string;
  no_rekening: string;
  created_at: string;
  updated_at: string;
};

export type PricelistType = {
  nama_produk: string;
  kode_item: string;
  satuan_besar: any;
  satuan_kecil: string;
  isi_satuan_besar: any;
  kode_pabrik: any;
  merk: any;
  nama_produk_asli: string;
  nama_produk_sebutan: any;
  kategori: string;
  harga: number;
  harga_grosir: number;
  created_at: string;
  updated_at: string;
};
