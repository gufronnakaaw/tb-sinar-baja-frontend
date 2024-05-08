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
    id: "PRODUCT01",
    nama: "Pipa UPVC Alderon AW 1 Pipa UPVC Alderon AW 1",
    stok: 100,
    kategori: "Paralon - Pipa Bulat UPVC",
    harga_umum: 35000,
    harga_reseller: 33000,
    harga_agen: 32000,
    harga_diskon: 34500,
    created_at: "10 Mei 2024 09:00",
  },
  {
    id: "PRODUCT02",
    nama: "Pipa UPVC Alderon D 3",
    stok: 100,
    kategori: "Paralon - Pipa Bulat UPVC",
    harga_umum: 85000,
    harga_reseller: 79000,
    harga_agen: 78000,
    harga_diskon: 83500,
    created_at: "10 Mei 2024 09:00",
  },
];
