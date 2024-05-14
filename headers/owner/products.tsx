import { Button } from "@nextui-org/react";
import { Eye, Pencil, Trash } from "@phosphor-icons/react";

// components
import CustomTooltip from "@/components/tooltip";

// utils
import StatusStock from "@/components/status/StatusStock";
import { formatDate } from "@/utils/formatDate";
import { formatRupiah } from "@/utils/formatRupiah";

type ProdukTable = {
  kode_item: string;
  nama_produk: string;
  kategori: string;
  harga_4: number;
  subkategori?: string;
  status_stok: string;
  stok?: number;
  created_at: string;
};

export const columnsProduk = [
  { name: "Kode Item", uid: "kode_item" },
  { name: "Nama Produk", uid: "nama_produk" },
  { name: "Kategori", uid: "kategori" },
  { name: "Stok", uid: "stok" },
  { name: "Harga Umum", uid: "harga_umum" },
  { name: "Status", uid: "status_stok" },
  { name: "Dibuat Pada", uid: "created_at" },
  { name: "Aksi", uid: "action" },
];

export function renderCellProduk(produk: ProdukTable, columnKey: React.Key) {
  const cellValue = produk[columnKey as keyof ProdukTable];

  switch (columnKey) {
    case "kode_item":
      return (
        <div className="line-clamp-1 w-max max-w-[250px] text-default-900">
          {produk.kode_item}
        </div>
      );
    case "nama_produk":
      return (
        <CustomTooltip content={produk.nama_produk}>
          <div className="line-clamp-1 w-max max-w-[250px] text-default-900">
            {produk.nama_produk}
          </div>
        </CustomTooltip>
      );
    case "kategori":
      return (
        <div className="w-max text-default-900">
          {produk.kategori} - {produk.subkategori}
        </div>
      );
    case "stok":
      return <div className="w-max text-default-900">{produk.stok}</div>;
    case "harga_umum":
      return (
        <div className="text-default-900">{formatRupiah(produk.harga_4)}</div>
      );
    case "status_stok":
      return (
        <div className="text-default-900">
          <StatusStock text={produk.status_stok} />
        </div>
      );
    case "created_at":
      return (
        <div className="w-max text-default-900">
          {formatDate(produk.created_at)}
        </div>
      );
    case "action":
      return (
        <div className="flex max-w-[110px] items-center gap-1">
          <CustomTooltip content="Detail">
            <Button
              onClick={() => alert("dalam tahap pengembangan")}
              isIconOnly
              variant="light"
              size="sm"
            >
              <Eye weight="bold" size={20} className="text-default-600" />
            </Button>
          </CustomTooltip>

          <CustomTooltip content="Edit">
            <Button
              onClick={() => alert("dalam tahap pengembangan")}
              isIconOnly
              variant="light"
              size="sm"
            >
              <Pencil weight="bold" size={20} className="text-default-600" />
            </Button>
          </CustomTooltip>

          <CustomTooltip content="Hapus">
            <Button
              onClick={() => alert("dalam tahap pengembangan")}
              isIconOnly
              variant="light"
              color="danger"
              size="sm"
            >
              <Trash weight="bold" size={20} />
            </Button>
          </CustomTooltip>
        </div>
      );

    default:
      return cellValue;
  }
}
