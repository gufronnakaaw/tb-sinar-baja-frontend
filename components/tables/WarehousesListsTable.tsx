import {
  Button,
  Chip,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { CheckCircle, Pencil, Trash, XCircle } from "@phosphor-icons/react";
import { useRouter } from "next/router";

// components & utils
import CustomTooltip from "@/components/tooltip";
import usePagination from "@/hooks/usepagination";
import { WarehouseListType } from "@/types/warehouses.type";
import { customStyleTable } from "@/utils/customStyleTable";
import { formatDate } from "@/utils/formatDate";

export default function WarehousesListsTable({
  gudang,
  handleDelete,
}: {
  gudang: WarehouseListType[] | undefined;
  handleDelete: (kode_gudang: string) => void;
}) {
  const { page, pages, data, setPage } = usePagination(
    gudang ? gudang : [],
    10,
  );

  const router = useRouter();

  const columnsWarehouseList = [
    { name: "Kode Gudang", uid: "kode_gudang" },
    { name: "Nama", uid: "nama" },
    { name: "Dibuat Pada", uid: "created_at" },
    { name: "Bisa Dihapus", uid: "status" },
    { name: "Aksi", uid: "action" },
  ];

  function renderCellWarehouseList(
    gudang: WarehouseListType,
    columnKey: React.Key,
    handleDelete: (kode_gudang: string) => void,
  ) {
    const cellValue = gudang[columnKey as keyof WarehouseListType];

    switch (columnKey) {
      case "code":
        return <div className="text-default-900">{gudang.kode_gudang}</div>;
      case "name":
        return <div className="w-max text-default-900">{gudang.nama}</div>;
      case "created_at":
        return (
          <div className="w-max text-default-900">
            {formatDate(gudang.created_at)}
          </div>
        );
      case "status":
        return (
          <Chip
            variant="flat"
            color={gudang.can_delete ? "success" : "danger"}
            size="sm"
            startContent={
              gudang.can_delete ? (
                <CheckCircle className="text-success" weight="fill" size={18} />
              ) : (
                <XCircle className="text-danger" weight="fill" size={18} />
              )
            }
            classNames={{
              content: "font-medium capitalize",
            }}
          >
            {gudang.can_delete ? "Bisa" : "Tidak"}
          </Chip>
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
                    `/owner/warehouses/lists/edit?kode_gudang=${gudang.kode_gudang}&nama=${gudang.nama}`,
                  )
                }
              >
                <Pencil weight="bold" size={20} className="text-default-600" />
              </Button>
            </CustomTooltip>

            {gudang.can_delete ? (
              <CustomTooltip content="Hapus">
                <Button
                  isIconOnly
                  color="danger"
                  variant="light"
                  size="sm"
                  onClick={() => handleDelete(gudang.kode_gudang)}
                >
                  <Trash weight="bold" size={20} />
                </Button>
              </CustomTooltip>
            ) : null}
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
        aria-label="warehouseLists table"
        color="primary"
        selectionMode="single"
        classNames={customStyleTable}
        className="scrollbar-hide"
      >
        <TableHeader columns={columnsWarehouseList}>
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>

        <TableBody items={data} emptyContent="Gudang tidak ditemukan!">
          {(gudang) => (
            <TableRow key={gudang.kode_gudang}>
              {(columnKey) => (
                <TableCell>
                  {renderCellWarehouseList(gudang, columnKey, handleDelete)}
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
