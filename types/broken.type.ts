export type BrokenItem = {
  kode_item: string;
  nama_produk: string;
  jumlah: number;
  alasan: string;
  satuan: string;
  tipe_harga: string;
  harga: number;
  harga_pokok: number;
  harga_1: number;
  harga_2: number;
  harga_3: number;
  harga_4: number;
  harga_5: number;
  harga_6: number;
  gudang: {
    stok: number;
    stok_aman: null;
    nama: string;
    kode_gudang: string;
  }[];
  gudang_id: string;
  rak: string;
};

export type BrokenData = {
  id_ba: string;
  jumlah_barang: number;
  created_at: string;
};

export type BrokenDetailType = {
  id_ba: string;
  jumlah_barang: number;
  created_at: string;
  list_produk: {
    kode_item: string;
    nama_produk: string;
    jumlah: number;
    harga: number;
    satuan: string;
    gudang: string;
    rak: string;
    alasan: string;
    tipe_harga: string;
    total: number;
  }[];
};
