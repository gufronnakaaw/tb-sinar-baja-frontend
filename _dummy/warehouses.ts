export type WarehouseInType = {
  product: string;
  total: number;
  from: string;
  created_at: string;
};

export const warehouseIn: WarehouseInType[] = [
  {
    product: "Cat Dulux",
    total: 1000,
    from: "Supplier A",
    created_at: "10 Mei 2024 10:00",
  },
  {
    product: "Cat Dulux",
    total: 500,
    from: "Supplier B",
    created_at: "10 Mei 2024 10:00",
  },
];

export type WarehouseOutType = {
  product: string;
  total: number;
  reason: string;
  created_at: string;
};

export const warehouseOut: WarehouseOutType[] = [
  {
    product: "Cat Vinilex",
    total: 10,
    reason: "Rusak",
    created_at: "10 Mei 2024 20:00",
  },
  {
    product: "Cat Vinilex",
    total: 2,
    reason: "Hilang",
    created_at: "10 Mei 2024 20:00",
  },
];

export type WarehouseDocuments = {
  invoice: string;
  to: string;
};

export const warehouseDocuments: WarehouseDocuments[] = [
  {
    invoice: "INVOUT02022024",
    to: "Pelanggan A",
  },
  {
    invoice: "INVOUT02022024",
    to: "Pelanggan B",
  },
];

export type WarehouseLists = {
  code: string;
  name: string;
  created_at: string;
};

export const warehouseLists: WarehouseLists[] = [
  {
    code: "GUDANGA",
    name: "Gudang A",
    created_at: "10 Mei 2024 10:00",
  },
  {
    code: "GUDANGB",
    name: "Gudang B",
    created_at: "10 Mei 2024 10:00",
  },
];
