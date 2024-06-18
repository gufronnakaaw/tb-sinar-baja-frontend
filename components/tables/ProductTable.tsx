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
import CustomTooltip from "@/components/tooltip";

import usePagination from "@/hooks/usepagination";
import { FilterProduk } from "@/types/filter.type";
import { customStyleTable } from "@/utils/customStyleTable";
import { formatRupiah } from "@/utils/formatRupiah";
import React, { useState } from "react";
import InputSearchBar from "../input/InputSearchBar";

export default function ProductTable({
  produk,
  role,
  isLoading,
  selectionChange,
}: {
  produk: FilterProduk[] | undefined;
  role: "owner" | "admin";
  isLoading: boolean;
  selectionChange: any;
}) {
  const { page, pages, data, setPage } = usePagination(produk ? produk : [], 2);
  const [search, setSearch] = useState("");

  const filter = data.filter((item) => {
    return (
      item.kode_item.toLowerCase().includes(search.toLowerCase()) ||
      item.nama_produk.toLowerCase().includes(search.toLowerCase())
    );
  });

  const columnsProduk = [
    { name: "Kode Item", uid: "kode_item" },
    { name: "Nama Produk", uid: "nama_produk" },
    { name: "Harga Distributor", uid: "harga_1" },
    { name: "Harga Agen", uid: "harga_2" },
    { name: "Harga Grosir", uid: "harga_3" },
    { name: "Harga Toko", uid: "harga_4" },
    { name: "Harga Aplikator", uid: "harga_5" },
    { name: "Harga Retail", uid: "harga_6" },
  ];

  function renderCellProduk(produk: FilterProduk, columnKey: React.Key) {
    const cellValue = produk[columnKey as keyof FilterProduk];

    switch (columnKey) {
      case "kode_item":
        return (
          <div className="w-max max-w-[250px] text-default-900">
            {produk.kode_item}
          </div>
        );
      case "nama_produk":
        return (
          <CustomTooltip content={produk.nama_produk}>
            <div className="w-max max-w-[250px] text-default-900">
              {produk.nama_produk}
            </div>
          </CustomTooltip>
        );
      case "harga_1":
        return (
          <div className="text-default-900">{formatRupiah(produk.harga_1)}</div>
        );
      case "harga_2":
        return (
          <div className="text-default-900">{formatRupiah(produk.harga_2)}</div>
        );
      case "harga_3":
        return (
          <div className="text-default-900">{formatRupiah(produk.harga_3)}</div>
        );
      case "harga_4":
        return (
          <div className="text-default-900">{formatRupiah(produk.harga_4)}</div>
        );
      case "harga_5":
        return (
          <div className="text-default-900">{formatRupiah(produk.harga_5)}</div>
        );
      case "harga_6":
        return (
          <div className="text-default-900">{formatRupiah(produk.harga_6)}</div>
        );
      default:
        return cellValue;
    }
  }

  return (
    <div className="grid gap-4">
      <InputSearchBar
        placeholder="Cari Kode Item atau Nama Produk"
        className="w-full"
        onChange={(e) => setSearch(e.target.value)}
      />

      <Table
        isHeaderSticky
        aria-label="products table"
        color="primary"
        selectionMode="single"
        classNames={customStyleTable}
        className="scrollbar-hide"
        onSelectionChange={selectionChange}
      >
        <TableHeader columns={columnsProduk}>
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>

        <TableBody
          items={filter}
          emptyContent="Produk kosong"
          isLoading={isLoading}
        >
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
    </div>
  );
}
