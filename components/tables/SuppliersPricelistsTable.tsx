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
import { Eye } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import { KeyedMutator } from "swr";

import CustomTooltip from "@/components/tooltip";
import usePagination from "@/hooks/usepagination";
import { SupplierType } from "@/types/suppliers.type";
import { customStyleTable } from "@/utils/customStyleTable";

export default function SuppliersPricelistsTable({
  supplier,
  mutate,
  role,
}: {
  supplier: SupplierType[] | undefined;
  mutate: KeyedMutator<any>;
  role: string;
}) {
  const { page, pages, data, setPage } = usePagination(
    supplier ? supplier : [],
    10,
  );

  const router = useRouter();

  const columnsSupplier = [
    { name: "ID Supplier", uid: "id_supplier" },
    { name: "Nama", uid: "nama" },
    { name: "Keterangan", uid: "keterangan" },
    { name: "Aksi", uid: "action" },
  ];

  function renderCellSuppliersPricelist(
    supplier: SupplierType,
    columnKey: React.Key,
  ) {
    const cellValue = supplier[columnKey as keyof SupplierType];

    switch (columnKey) {
      case "id_supplier":
        return <div className="text-default-900">{supplier.id_supplier}</div>;
      case "nama":
        return <div className="w-max text-default-900">{supplier.nama}</div>;
      case "keterangan":
        return (
          <div className="w-max text-default-900">{supplier.keterangan}</div>
        );
      case "action":
        return (
          <div className="flex max-w-[110px] items-center gap-1">
            <CustomTooltip content="Detail Harga">
              <Button
                isIconOnly
                variant="light"
                size="sm"
                onClick={() =>
                  router.push(
                    `/${role}/purchases/pricelists/detail?id_supplier=${supplier.id_supplier}&nama=${supplier.nama}`,
                  )
                }
              >
                <Eye weight="bold" size={20} className="text-default-600" />
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
        aria-label="suppliers table"
        color="primary"
        selectionMode="none"
        classNames={customStyleTable}
        className="scrollbar-hide"
      >
        <TableHeader columns={columnsSupplier}>
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>

        <TableBody items={data} emptyContent="Supplier Tidak Ditemukan!">
          {(supplier) => (
            <TableRow key={supplier.id_supplier}>
              {(columnKey) => (
                <TableCell>
                  {renderCellSuppliersPricelist(supplier, columnKey)}
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
