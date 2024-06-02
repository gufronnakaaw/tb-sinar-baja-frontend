import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

// utils
import usePagination from "@/hooks/usepagination";
import { ProdukType } from "@/types/products.type";
import { customStyleTable } from "@/utils/customStyleTable";
import { useRouter } from "next/router";

import { Button } from "@nextui-org/react";
import { Pencil } from "@phosphor-icons/react";

import StatusStock from "@/components/status/StatusStock";
import CustomTooltip from "@/components/tooltip";

export default function ProductStocksTable({
  produk,
  role,
}: {
  produk: ProdukType[] | undefined;
  role: "owner" | "admin";
}) {
  const router = useRouter();
  const { page, pages, data, setPage } = usePagination(
    produk ? produk : [],
    10,
  );

  const columnsProdukStok = [
    { name: "Kode Item", uid: "kode_item" },
    { name: "Nama Produk", uid: "nama_produk" },
    { name: "Stok", uid: "stok" },
    { name: "Stok Aman", uid: "stok_aman" },
    { name: "Status", uid: "status" },
    { name: "Aksi", uid: "action" },
  ];

  function renderCellProdukStok(produk: ProdukType, columnKey: React.Key) {
    const cellValue = produk[columnKey as keyof ProdukType];

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
      case "stok":
        return <div className="text-default-900">{produk.stok}</div>;
      case "stok_aman":
        return <div className="text-default-900">{produk.stok_aman}</div>;
      case "status":
        return (
          <div className="text-default-900">
            <StatusStock
              text={produk.status_stok}
              size="sm"
              className="gap-1"
            />
          </div>
        );
      case "action":
        return (
          <div className="flex max-w-[110px] items-center gap-1">
            <CustomTooltip content="Edit Stok">
              <Button
                isIconOnly
                variant="light"
                size="sm"
                onClick={() =>
                  router.push(
                    `/${role}/products/stocks/edit?kode_item=${produk.kode_item}&stok=${produk.stok}&stok_aman=${produk.stok_aman}&nama_produk=${produk.nama_produk}`,
                  )
                }
              >
                <Pencil weight="bold" size={20} className="text-default-600" />
              </Button>
            </CustomTooltip>
          </div>
        );

      default:
        return cellValue;
    }
  }

  return (
    <>
      <Table
        isHeaderSticky
        aria-label="products stocks table"
        color="primary"
        selectionMode="single"
        classNames={customStyleTable}
        className="scrollbar-hide"
      >
        <TableHeader columns={columnsProdukStok}>
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>

        <TableBody items={data}>
          {(item) => (
            <TableRow key={item.kode_item}>
              {(columnKey) => (
                <TableCell>{renderCellProdukStok(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Pagination
        isCompact
        showControls
        page={page}
        total={pages}
        onChange={setPage}
        className="justify-self-center"
        classNames={{
          cursor: role == "owner" ? "bg-primary" : "bg-lime-500",
        }}
      />
    </>
  );
}
