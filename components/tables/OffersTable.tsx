import usePagination from "@/hooks/usepagination";
import { PenawaranType } from "@/types/preorders.type";
import { customStyleTable } from "@/utils/customStyleTable";
import { formatDate } from "@/utils/formatDate";
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
import { Eye, Pencil } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import CustomTooltip from "../tooltip";

export default function OffersTable({
  penawaran,
  role,
}: {
  penawaran: PenawaranType[] | undefined;
  role: string;
}) {
  const { page, pages, data, setPage } = usePagination(
    penawaran ? penawaran : [],
    10,
  );

  const router = useRouter();

  const columnsPenawaran = [
    { name: "ID Penawaran", uid: "id_penawaran" },
    { name: "Tujuan", uid: "tujuan" },
    { name: "Status", uid: "status" },
    { name: "Dibuat Pada", uid: "created_at" },
    { name: "Aksi", uid: "action" },
  ];

  function renderCellPenawaran(penawaran: PenawaranType, columnKey: React.Key) {
    const cellValue = penawaran[columnKey as keyof PenawaranType];

    switch (columnKey) {
      case "id_penawaran":
        return <div className="text-default-900">{penawaran.id_penawaran}</div>;
      case "tujuan":
        return (
          <div className="w-max text-default-900">
            {penawaran.nama_supplier}
          </div>
        );
      case "status":
        return (
          <div className="w-max text-default-900">
            <Chip
              variant="flat"
              size="sm"
              classNames={{
                base: "px-3",
                content: "font-semibold capitalize",
              }}
              className={
                penawaran.status === "selesai"
                  ? "bg-success-100 text-success"
                  : "bg-warning-100 text-warning"
              }
            >
              {penawaran.status}
            </Chip>
          </div>
        );
      case "created_at":
        return (
          <div className="w-max text-default-900">
            {formatDate(penawaran.created_at)}
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
                onClick={() =>
                  router.push(
                    `/${role}/purchases/offers/edit/${penawaran.id_penawaran}`,
                  )
                }
              >
                <Pencil weight="bold" size={20} className="text-default-600" />
              </Button>
            </CustomTooltip>
            <CustomTooltip content="Detail">
              <Button
                isIconOnly
                variant="light"
                size="sm"
                onClick={() =>
                  router.push(
                    `/${role}/purchases/offers/detail?id_penawaran=${penawaran.id_penawaran}`,
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
        aria-label="offers table"
        color="primary"
        selectionMode="none"
        classNames={customStyleTable}
        className="scrollbar-hide"
      >
        <TableHeader columns={columnsPenawaran}>
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>

        <TableBody items={data} emptyContent="Level tidak ditemukan!">
          {(level) => (
            <TableRow key={level.id_penawaran}>
              {(columnKey) => (
                <TableCell>{renderCellPenawaran(level, columnKey)}</TableCell>
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
