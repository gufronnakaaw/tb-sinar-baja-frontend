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

import CustomTooltip from "@/components/tooltip";
import usePagination from "@/hooks/usepagination";
import { SupplierType } from "@/types/suppliers.type";
import { customStyleTable } from "@/utils/customStyleTable";
import { fetcher } from "@/utils/fetcher";
import { formatDate } from "@/utils/formatDate";

export default function SuppliersListTable({
  supplier,
  mutate,
}: {
  supplier: SupplierType[] | undefined;
  mutate: KeyedMutator<any>;
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
    { name: "Atas Nama", uid: "atas_nama" },
    { name: "No Rekening", uid: "no_rekening" },
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
        return <div className="w-max text-default-900">{supplier.bank}</div>;
      case "atas_nama":
        return (
          <div className="w-max text-default-900">{supplier.atas_nama}</div>
        );
      case "no_rekening":
        return (
          <div className="w-max text-default-900">{supplier.no_rekening}</div>
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
                    `/owner/suppliers/lists/edit?id_supplier=${supplier.id_supplier}`,
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
        selectionMode="single"
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
      />
    </>
  );
}
