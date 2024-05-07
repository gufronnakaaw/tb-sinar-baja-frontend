export type ProductsType = {
  id: string;
  nama: string;
  stok: number;
  kategori: string;
  harga_umum: number;
  harga_reseller: number;
  harga_agen: number;
  harga_diskon: number;
  created_at: string;
};

export const products: ProductsType[] = [
  {
    id: "TESTPRODUCT01",
    nama: "Cat Dulux",
    stok: 100,
    kategori: "Cat - Cat Dinding",
    harga_umum: 100000,
    harga_reseller: 98000,
    harga_agen: 96000,
    harga_diskon: 98500,
    created_at: "10 Mei 2024 09:00",
  },
  {
    id: "TESTPRODUCT02",
    nama: "Cat Vinilex",
    stok: 100,
    kategori: "Cat - Cat Dinding",
    harga_umum: 120000,
    harga_reseller: 118000,
    harga_agen: 116000,
    harga_diskon: 118500,
    created_at: "10 Mei 2024 09:00",
  },
];
