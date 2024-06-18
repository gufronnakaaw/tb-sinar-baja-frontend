import usePagination from "@/hooks/usepagination";
import { PriceQuantity } from "@/pages/admin/settings/quantityprice";
import { customStyleTable } from "@/utils/customStyleTable";
import { fetcher } from "@/utils/fetcher";
import { formatDate } from "@/utils/formatDate";
import { formatRupiah } from "@/utils/formatRupiah";
import {
  Button,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { Pencil, Trash } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import { KeyedMutator } from "swr";
import CustomTooltip from "../tooltip";

export default function PriceQuantityTable({
  pricequantity,
  role,
  mutate,
}: {
  pricequantity: PriceQuantity[] | undefined;
  role: string;
  mutate: KeyedMutator<any>;
}) {
  const router = useRouter();
  const { page, pages, data, setPage } = usePagination(
    pricequantity ? pricequantity : [],
    10,
  );

  const columns = [
    { name: "ID", uid: "id_table" },
    { name: "Kode Item", uid: "produk_id" },
    { name: "Nama Produk", uid: "nama_produk_asli" },
    { name: "Harga", uid: "harga" },
    { name: "Qty", uid: "quantity" },
    { name: "Keterangan", uid: "keterangan" },
    { name: "Dibuat Pada", uid: "created_at" },
    { name: "Aksi", uid: "action" },
  ];

  function renderCell(item: PriceQuantity, columnKey: React.Key) {
    const cellValue = item[columnKey as keyof PriceQuantity];

    switch (columnKey) {
      case "id_table":
        return <div className="text-default-900">{item.id_table}</div>;
      case "produk_id":
        return <div className="text-default-900">{item.produk_id}</div>;
      case "nama_produk_asli":
        return <div className="text-default-900">{item.nama_produk_asli}</div>;
      case "harga":
        return (
          <div className="text-default-900">{formatRupiah(item.harga)}</div>
        );
      case "quantity":
        return (
          <div className="text-default-900">
            {item.quantity} {item.satuan_kecil}
          </div>
        );
      case "keterangan":
        return <div className="text-default-900">{item.keterangan}</div>;
      case "created_at":
        return (
          <div className="w-max text-default-900">
            {formatDate(item.created_at)}
          </div>
        );
      case "action":
        return (
          <div className="flex max-w-[110px] items-center gap-1">
            <CustomTooltip content="Edit">
              <Button
                isIconOnly
                variant="light"
                size="sm"
                onClick={() =>
                  router.push(
                    `/${role}/settings/quantityprice/edit?id=${item.id_table}&harga=${item.harga}&qty=${item.quantity}&keterangan=${item.keterangan}&nama_produk=${item.nama_produk_asli}`,
                  )
                }
              >
                <Pencil weight="bold" size={20} className="text-default-600" />
              </Button>
            </CustomTooltip>
            <CustomTooltip content="Hapus">
              <Button
                isIconOnly
                variant="light"
                size="sm"
                onClick={() => {
                  deletePrice(item.id_table);
                }}
              >
                <Trash weight="bold" size={20} className="text-default-600" />
              </Button>
            </CustomTooltip>
          </div>
        );

      default:
        return cellValue;
    }
  }

  async function deletePrice(id: number) {
    if (!confirm("apakah anda yakin?")) return;

    try {
      await fetcher({
        url: "/setting/pricequantity/" + id,
        method: "DELETE",
      });

      alert("hapus berhasil");
      return mutate();
    } catch (error) {
      const response = error as {
        success: boolean;
        status_code: number;
        error: { name: string; message: string };
      };

      if (response.status_code >= 500) {
        console.log(response.error);
        return alert("terjadi masalah pada server");
      }

      if (response.status_code >= 400) {
        console.log(response.error);
        return alert(response.error.message);
      }

      console.log(response.error);
      return alert("terjadi error tidak diketahui pada aplikasi");
    }
  }

  return (
    <>
      <Table
        isHeaderSticky
        aria-label="pricequantity table"
        color="primary"
        selectionMode="none"
        classNames={customStyleTable}
        className="scrollbar-hide"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>

        <TableBody items={data} emptyContent="Harga quantity kosong">
          {(item) => (
            <TableRow key={item.id_table}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Pagination
        isCompact
        showControls
        color="primary"
        page={page}
        total={pages}
        onChange={setPage}
        className="justify-self-center"
        classNames={{
          cursor: role == "owner" ? "bg-primary" : "bg-teal-500",
        }}
      />
    </>
  );
}
