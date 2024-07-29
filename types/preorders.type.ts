export type PenawaranType = {
  id_penawaran: string;
  supplier_id: string;
  nama_supplier: string;
  status: string;
  created_at: string;
};

export type PenawaranDetail = {
  id_penawaran: string;
  supplier_id: string;
  nama_supplier: string;
  alamat: string;
  no_telp: string;
  email_supplier: string;
  status: string;
  produk: ProdukPenawaran[];
  created_at: string;
};

export type ProdukPenawaran = {
  kode_item: string;
  kode_pabrik: string | null;
  nama_produk: string;
  qty: number;
  satuan: string;
  harga: number | null;
  jumlah: number | null;
};

export type ProdukFinal = {
  kode_item: string;
  kode_pabrik: string | null;
  nama_produk: string;
  qty: number;
  satuan: string;
  harga: number;
  jumlah: number;
};

export type ProdukFinalSupplier = {
  kode_item: string;
  kode_pabrik: string | null;
  nama_produk: string;
  harga: number;
  harga_grosir: number;
  tipe_harga: string;
  qty: number;
  satuan: string;
  subharga: number;
  jumlah: number;
};

export type FinalType = {
  id_preorder: string;
  supplier_id: string;
  nama_supplier: string;
  email_supplier: string;
  no_telp: string;
  alamat: string;
  keterangan: string;
  tipe: string;
  total: number;
  created_at: string;
  sumber: string;
  status: string;
  entry_gudang: boolean;
  item_masuk: number;
  item_order: number;
};

export type FinalDetail = {
  id_preorder: string;
  supplier_id: string;
  nama_supplier: string;
  email_supplier: string;
  no_telp: string;
  alamat: string;
  keterangan: string;
  tipe: string;
  total: number;
  created_at: string;
  produk: ProdukFinal[];
  sumber: string;
};
