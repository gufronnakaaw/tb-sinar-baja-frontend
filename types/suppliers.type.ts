export type SuppliersType = {
  code: string;
  name: string;
  price: number;
  product: string;
  created_at: string;
};

export type SupplierType = {
  id_supplier: string;
  nama: string;
  email: string;
  no_telp: string;
  alamat_kantor: string;
  alamat_gudang: string;
  keterangan: string;
  bank: string;
  atas_nama: string;
  no_rekening: string;
  created_at: string;
};

export type SupplierPricelistProdukType = {
  nama: string;
  kode_item: string;
  kategori: string;
  harga: number;
  created_at: string;
};
