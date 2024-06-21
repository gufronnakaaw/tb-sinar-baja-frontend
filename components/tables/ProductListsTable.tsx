import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useRouter } from "next/router";

// utils
import CustomTooltip from "@/components/tooltip";
import { formatDate } from "@/utils/formatDate";
import { formatRupiah } from "@/utils/formatRupiah";
import { PRICENAME } from "@/utils/price";
import { Button } from "@nextui-org/react";
import { Eye, Pencil } from "@phosphor-icons/react";

import usePagination from "@/hooks/usepagination";
import { ProdukType } from "@/types/products.type";
import { customStyleTable } from "@/utils/customStyleTable";

export default function ProductListsTable({
  produk,
  role,
}: {
  produk: ProdukType[] | undefined;
  role: "owner" | "admin";
}) {
  const { page, pages, data, setPage } = usePagination(
    produk ? produk : [],
    10,
  );

  const router = useRouter();

  const columnsProduk = [
    { name: "Kode Item", uid: "kode_item" },
    { name: "Nama Produk", uid: "nama_produk" },
    { name: "Kategori", uid: "kategori" },
    { name: "Harga Retail", uid: "harga_retail" },
    { name: "Dibuat Pada", uid: "created_at" },
    { name: "Diubah Pada", uid: "updated_at" },
    { name: "Aksi", uid: "action" },
  ];

  function renderCellProduk(produk: ProdukType, columnKey: React.Key) {
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
      case "kategori":
        return (
          <div className="w-max text-default-900">
            {produk.kategori} - {produk.subkategori}
          </div>
        );
      case "harga_retail":
        return (
          <div className="text-default-900">
            {formatRupiah(produk[PRICENAME.harga_retail as keyof ProdukType])}
          </div>
        );
      case "created_at":
        return (
          <div className="w-max text-default-900">
            {formatDate(produk.created_at)}
          </div>
        );
      case "updated_at":
        return (
          <div className="w-max text-default-900">
            {formatDate(produk.updated_at)}
          </div>
        );
      case "action":
        return (
          <div className="flex max-w-[110px] items-center gap-1">
            <CustomTooltip content="Detail">
              <Button
                onClick={() =>
                  router.push(
                    `/${role}/warehouses/products/detail?kode_item=${encodeURIComponent(produk.kode_item)}`,
                  )
                }
                isIconOnly
                variant="light"
                size="sm"
              >
                <Eye weight="bold" size={20} className="text-default-600" />
              </Button>
            </CustomTooltip>

            <CustomTooltip content="Edit">
              <Button
                onClick={() =>
                  router.push(
                    `/${role}/warehouses/products/edit?kode_item=${encodeURIComponent(produk.kode_item)}`,
                  )
                }
                isIconOnly
                variant="light"
                size="sm"
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
        aria-label="products table"
        color="primary"
        selectionMode="none"
        classNames={customStyleTable}
        className="scrollbar-hide"
      >
        <TableHeader columns={columnsProduk}>
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>

        <TableBody items={data}>
          {(item) => (
            <TableRow key={item.kode_item}>
              {(columnKey) => (
                <TableCell>{renderCellProduk(item, columnKey)}</TableCell>
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
          cursor: role == "owner" ? "bg-primary" : "bg-teal-500",
        }}
      />
    </>
  );
}
