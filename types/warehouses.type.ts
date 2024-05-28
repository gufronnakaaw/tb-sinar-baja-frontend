export type WarehousesType = {
  kode_gudang: string;
  nama: string;
  created_at: string;
  updated_at: string;
};

export type WarehouseInType = {
  product: string;
  total: number;
  from: string;
  created_at: string;
};

export type WarehouseOutType = {
  product: string;
  total: number;
  reason: string;
  created_at: string;
};

// export type WarehouseDocuments = {
//   invoice: string;
//   to: string;
// };

export type WarehouseDocumentsType = {
  id_suratjalan: string;
  transaksi_id: string;
  nama_driver: string;
  kendaraan: string;
  plat_kendaraan: string;
  verifikasi: boolean;
  transaksi: {
    penerima: string;
    alamat: string;
    keterangan: string;
    no_telp: string;
  };
};

export type WarehouseLists = {
  code: string;
  name: string;
  created_at: string;
};
