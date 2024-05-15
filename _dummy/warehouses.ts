import {
  WarehouseDocuments,
  WarehouseInType,
  WarehouseLists,
  WarehouseOutType,
} from "@/types/warehouses.type";

export const warehouseIn: WarehouseInType[] = [
  {
    product: "Papan Trimpek",
    total: 1000,
    from: "Supplier A",
    created_at: "10 Mei 2024 10:00",
  },
  {
    product: "Kalsiboard",
    total: 500,
    from: "Supplier B",
    created_at: "10 Mei 2024 10:00",
  },
];

export const warehouseOut: WarehouseOutType[] = [
  {
    product: "Papan Trimpek",
    total: 10,
    reason: "Rusak",
    created_at: "10 Mei 2024 20:00",
  },
  {
    product: "Kalsiboard",
    total: 2,
    reason: "Hilang",
    created_at: "10 Mei 2024 20:00",
  },
];

export const warehouseDocuments: WarehouseDocuments[] = [
  {
    invoice: "INVOUT08052024",
    to: "Pelanggan A",
  },
  {
    invoice: "INVOUT05052024",
    to: "Pelanggan B",
  },
];

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
