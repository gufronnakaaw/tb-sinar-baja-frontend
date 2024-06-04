export type PenawaranType = {
  id_penawaran: string;
  id_supplier: string;
  supplier: string;
  status: string;
  created_at: string;
};

export type PenawaranDetail = {
  id_penawaran: string;
  id_supplier: string;
  nama: string;
  alamat_kantor: string;
  no_telp: string;
  email: string;
  status: string;
  produk: ProdukPenawaran[];
  created_at: string;
};

export type ProdukPenawaran = {
  kode_pabrik: string;
  nama_produk: string;
  qty: number;
  satuan: string;
  harga: number;
  jumlah: number;
};
