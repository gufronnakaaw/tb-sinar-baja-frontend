import CustomTooltip from "@/components/tooltip";
import usePagination from "@/hooks/usepagination";
import { ProdukSubKategoriType } from "@/types/products.type";
import { customStyleTable } from "@/utils/customStyleTable";
import { formatDate } from "@/utils/formatDate";
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
import { Pencil } from "@phosphor-icons/react";

export default function ProductSubCategoriesTable({
  subkategori,
  role,
}: {
  subkategori: ProdukSubKategoriType[] | undefined;
  role: string;
}) {
  const { page, pages, data, setPage } = usePagination(
    subkategori ? subkategori : [],
    10,
  );

  const columnsSubKategori = [
    { name: "Kode", uid: "kode" },
    { name: "Nama", uid: "nama" },
    { name: "Dibuat Pada", uid: "created_at" },
    { name: "Aksi", uid: "action" },
  ];

  function renderCellSubKategori(
    subkategori: ProdukSubKategoriType,
    columnKey: React.Key,
  ) {
    const cellValue = subkategori[columnKey as keyof ProdukSubKategoriType];

    switch (columnKey) {
      case "kode":
        return (
          <div className="text-default-900">{subkategori.id_subkategori}</div>
        );
      case "nama":
        return <div className="w-max text-default-900">{subkategori.nama}</div>;
      case "created_at":
        return (
          <div className="w-max text-default-900">
            {formatDate(subkategori.created_at)}
          </div>
        );
      case "action":
        return (
          <div className="flex max-w-[110px] items-center gap-1">
            <CustomTooltip content="Edit">
              <Button isIconOnly variant="light" size="sm">
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
        aria-label="products categories table"
        color="primary"
        selectionMode="none"
        classNames={customStyleTable}
        className="scrollbar-hide"
      >
        <TableHeader columns={columnsSubKategori}>
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>

        <TableBody items={data}>
          {(item) => (
            <TableRow key={item.id_subkategori}>
              {(columnKey) => (
                <TableCell>{renderCellSubKategori(item, columnKey)}</TableCell>
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
          cursor: role == "owner" ? "bg-primary" : "bg-lime-500",
        }}
      />
    </>
  );
}
