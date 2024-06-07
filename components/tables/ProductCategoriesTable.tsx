import CustomTooltip from "@/components/tooltip";
import usePagination from "@/hooks/usepagination";
import { ProdukKategoriType } from "@/types/products.type";
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
import { Eye, Pencil } from "@phosphor-icons/react";
import { useRouter } from "next/router";

type KategoriTable = Pick<
  ProdukKategoriType,
  "id_kategori" | "nama" | "created_at"
>;

export default function ProductCategoriesTable({
  kategori,
  role,
}: {
  kategori: ProdukKategoriType[] | undefined;
  role: string;
}) {
  const { page, pages, data, setPage } = usePagination(
    kategori ? kategori : [],
    10,
  );
  const router = useRouter();

  const columnsKategori = [
    { name: "Kode", uid: "kode" },
    { name: "Nama", uid: "nama" },
    { name: "Dibuat Pada", uid: "created_at" },
    { name: "Aksi", uid: "action" },
  ];

  function renderCellKategori(kategori: KategoriTable, columnKey: React.Key) {
    const cellValue = kategori[columnKey as keyof KategoriTable];

    switch (columnKey) {
      case "kode":
        return <div className="text-default-900">{kategori.id_kategori}</div>;
      case "nama":
        return <div className="w-max text-default-900">{kategori.nama}</div>;
      case "created_at":
        return (
          <div className="w-max text-default-900">
            {formatDate(kategori.created_at)}
          </div>
        );
      case "action":
        return (
          <div className="flex max-w-[110px] items-center gap-1">
            <CustomTooltip content="Detail">
              <Button
                isIconOnly
                variant="light"
                size="sm"
                onClick={() =>
                  router.push(
                    `/${role}/products/categories/detail/${kategori.id_kategori}`,
                  )
                }
              >
                <Eye weight="bold" size={20} className="text-default-600" />
              </Button>
            </CustomTooltip>

            <CustomTooltip content="Edit">
              <Button
                isIconOnly
                variant="light"
                size="sm"
                onClick={() =>
                  router.push(
                    `/${role}/products/categories/edit?id_kategori=${kategori.id_kategori}&nama=${kategori.nama}`,
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
        aria-label="products categories table"
        color="primary"
        selectionMode="none"
        classNames={customStyleTable}
        className="scrollbar-hide"
      >
        <TableHeader columns={columnsKategori}>
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>

        <TableBody items={data}>
          {(item) => (
            <TableRow key={item.id_kategori}>
              {(columnKey) => (
                <TableCell>{renderCellKategori(item, columnKey)}</TableCell>
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
