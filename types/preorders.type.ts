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
  kode_pabrik: string;
  nama_produk: string;
  qty: number;
  satuan: string;
  harga: number;
  jumlah: number;
};
