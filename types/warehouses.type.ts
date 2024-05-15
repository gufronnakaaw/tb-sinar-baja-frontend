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

export type WarehouseDocuments = {
  invoice: string;
  to: string;
};

export type WarehouseLists = {
  code: string;
  name: string;
  created_at: string;
};
