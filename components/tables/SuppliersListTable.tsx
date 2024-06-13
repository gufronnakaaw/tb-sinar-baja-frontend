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
import { Eye, Pencil, Trash } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import { KeyedMutator } from "swr";

import CustomTooltip from "@/components/tooltip";
import usePagination from "@/hooks/usepagination";
import { GlobalResponse } from "@/types/global.type";
import { SupplierBank, SupplierType } from "@/types/suppliers.type";
import { customStyleTable } from "@/utils/customStyleTable";
import { fetcher } from "@/utils/fetcher";
import { formatDate } from "@/utils/formatDate";
import React from "react";

export default function SuppliersListTable({
  supplier,
  mutate,
  role,
  onOpen,
  setBank,
}: {
  supplier: SupplierType[] | undefined;
  mutate: KeyedMutator<any>;
  role: string;
  onOpen: () => void;
  setBank: React.Dispatch<React.SetStateAction<SupplierBank[]>>;
}) {
  const { page, pages, data, setPage } = usePagination(
    supplier ? supplier : [],
    10,
  );

  const router = useRouter();

  const columnsSuppliersLists = [
    { name: "ID Supplier", uid: "id_supplier" },
    { name: "Nama", uid: "nama" },
    { name: "Email", uid: "email" },
    { name: "No Telpon", uid: "no_telp" },
    { name: "Alamat Gudang", uid: "alamat_gudang" },
    { name: "Alamat Kantor", uid: "alamat_kantor" },
    { name: "Keterangan", uid: "keterangan" },
    { name: "Bank", uid: "bank" },
    { name: "Dibuat Pada", uid: "created_at" },
    { name: "Aksi", uid: "action" },
  ];

  function renderCellSuppliersLists(
    supplier: SupplierType,
    columnKey: React.Key,
  ) {
    const cellValue = supplier[columnKey as keyof SupplierType];

    switch (columnKey) {
      case "id_supplier":
        return <div className="text-default-900">{supplier.id_supplier}</div>;
      case "nama":
        return <div className="w-max text-default-900">{supplier.nama}</div>;
      case "email":
        return <div className="w-max text-default-900">{supplier.email}</div>;
      case "no_telp":
        return <div className="w-max text-default-900">{supplier.no_telp}</div>;
      case "alamat_gudang":
        return (
          <div className="w-max text-default-900">{supplier.alamat_gudang}</div>
        );
      case "alamat_kantor":
        return (
          <div className="w-max text-default-900">{supplier.alamat_kantor}</div>
        );
      case "keterangan":
        return (
          <div className="w-max text-default-900">{supplier.keterangan}</div>
        );
      case "bank":
        return (
          <div className="w-max text-default-900">
            <CustomTooltip content="Lihat Daftar Bank">
              <Button
                isIconOnly
                variant="light"
                size="sm"
                onClick={() => {
                  handleBank(supplier.id_supplier);
                }}
              >
                <Eye weight="bold" size={20} className="text-default-600" />
              </Button>
            </CustomTooltip>
          </div>
        );
      case "created_at":
        return (
          <div className="w-max text-default-900">
            {formatDate(supplier.created_at)}
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
                onClick={() => {
                  router.push(
                    `/${role}/suppliers/lists/edit?id_supplier=${supplier.id_supplier}`,
                  );
                }}
              >
                <Pencil weight="bold" size={20} className="text-default-600" />
              </Button>
            </CustomTooltip>

            <CustomTooltip content="Hapus">
              <Button
                isIconOnly
                variant="light"
                color="danger"
                size="sm"
                onClick={() => {
                  handleDeleteSupplier(supplier.id_supplier);
                }}
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

  async function handleBank(id_supplier: string) {
    try {
      const response: GlobalResponse<SupplierBank[]> = await fetcher({
        url: "/supplier/bank?id_supplier=" + id_supplier,
        method: "GET",
      });

      setBank(response.data);
      onOpen();
    } catch (error) {
      setBank([]);
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

  async function handleDeleteSupplier(id_supplier: string) {
    if (!confirm("apakah anda yakin?")) return;

    try {
      await fetcher({
        url: "/supplier/" + id_supplier,
        method: "DELETE",
      });
      alert("supplier berhasil dihapus");
      mutate();
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
        aria-label="suppliers table"
        color="primary"
        selectionMode="none"
        classNames={customStyleTable}
        className="scrollbar-hide"
      >
        <TableHeader columns={columnsSuppliersLists}>
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>

        <TableBody items={data}>
          {(supplier) => (
            <TableRow key={supplier.id_supplier}>
              {(columnKey) => (
                <TableCell>
                  {renderCellSuppliersLists(supplier, columnKey)}
                </TableCell>
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
