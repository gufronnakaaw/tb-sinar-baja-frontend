export type InvoiceType = {
  id_invoice: string;
  preorder_id: string;
  nomor_invoice: string;
  tagihan: number;
  sisa: number;
  jatuh_tempo: string;
  created_at: string;
  status: string;
};

export type InvoiceDetail = {
  id_invoice: string;
  preorder_id: string;
  nomor_invoice: string;
  tagihan: number;
  sisa: number;
  jatuh_tempo: string;
  status: string;
  sumber: string;
  created_at: string;
  nama_supplier: string;
  invoicedetail: InvoiceDetailType[];
};

export type InvoiceDetailType = {
  id_transaksi: string;
  nama_bank: string;
  atas_nama: string;
  no_rekening: string;
  tipe: string;
  jumlah: number;
  created_at: string;
};
