import {
  Button,
  Pagination,
  Spinner,
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
import { ProdukFinal } from "@/types/preorders.type";
import { customStyleTable } from "@/utils/customStyleTable";
import { Plus } from "@phosphor-icons/react";
import React, { useState } from "react";
import InputSearchBar from "../input/InputSearchBar";

export default function ProductFinalTable({
  produk,
  role,
  isLoading,
  setPesanan,
}: {
  produk: FilterProduk[] | undefined;
  role: "owner" | "admin";
  isLoading: boolean;
  setPesanan: React.Dispatch<React.SetStateAction<ProdukFinal[]>>;
}) {
  const { page, pages, data, setPage } = usePagination(produk ? produk : [], 3);
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
    { name: "Aksi", uid: "action" },
  ];

  function renderCellProduk(item: FilterProduk, columnKey: React.Key) {
    const cellValue = item[columnKey as keyof FilterProduk];

    switch (columnKey) {
      case "kode_item":
        return <div className="text-default-900">{item.kode_item}</div>;
      case "nama_produk":
        return <div className="w-max text-default-900">{item.nama_produk}</div>;
      case "action":
        return (
          <div className="flex max-w-[110px] items-center gap-1">
            <CustomTooltip content="Tambah Ke Daftar Pesanan">
              <Button
                isIconOnly
                variant="light"
                size="sm"
                onClick={() => {
                  setPesanan((prev) => {
                    if (
                      prev.find(
                        (element) => element.nama_produk == item.nama_produk,
                      )
                    ) {
                      return [...prev];
                    }

                    return [
                      ...prev,
                      {
                        kode_item: item.kode_item,
                        kode_pabrik: item.kode_pabrik,
                        nama_produk: item.nama_produk,
                        harga: 0,
                        jumlah: 0,
                        qty: 1,
                        satuan: "",
                      },
                    ];
                  });
                }}
              >
                <Plus weight="bold" size={20} className="text-default-600" />
              </Button>
            </CustomTooltip>
          </div>
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
        selectionMode="none"
        classNames={customStyleTable}
        className="scrollbar-hide"
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
          loadingContent={<Spinner color="default" />}
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
