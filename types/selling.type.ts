export type ProdukType = {
  kode_item: string;
  nama_produk: string;
  harga_4: number;
  gudang: string;
  rak: string;
  stok: number;
  satuan_kecil: string;
};

export type ListProdukType = {
  kode_item: string;
  nama_produk: string;
  stok: number;
  qty: number;
  satuan_kecil: string;
  harga: number;
  gudang: string;
  rak: string;
  subtotal: number;
};
