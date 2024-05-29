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
import { useRouter } from "next/router";

// components & utils
import usePagination from "@/hooks/usepagination";
import { LevelType } from "@/types/members";
import { customStyleTable } from "@/utils/customStyleTable";
import { formatDate } from "@/utils/formatDate";
import { Pencil } from "@phosphor-icons/react";
import CustomTooltip from "../tooltip";

export default function LevelsTable({
  level,
  role,
}: {
  level: LevelType[] | undefined;
  role: string;
}) {
  const { page, pages, data, setPage } = usePagination(level ? level : [], 10);

  const router = useRouter();

  const columnsLevel = [
    { name: "ID Level", uid: "id_level" },
    { name: "Nama", uid: "nama" },
    { name: "Dibuat Pada", uid: "created_at" },
    { name: "Aksi", uid: "action" },
  ];

  function renderCellLevel(level: LevelType, columnKey: React.Key) {
    const cellValue = level[columnKey as keyof LevelType];

    switch (columnKey) {
      case "id_level":
        return <div className="text-default-900">{level.id_level}</div>;
      case "nama":
        return <div className="w-max text-default-900">{level.nama}</div>;
      case "created_at":
        return (
          <div className="w-max text-default-900">
            {formatDate(level.created_at)}
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
                    `/${role}/members/levels/edit?id_level=${level.id_level}`,
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
        aria-label="warehouseLists table"
        color="primary"
        selectionMode="single"
        classNames={customStyleTable}
        className="scrollbar-hide"
      >
        <TableHeader columns={columnsLevel}>
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>

        <TableBody items={data} emptyContent="Level tidak ditemukan!">
          {(level) => (
            <TableRow key={level.id_level}>
              {(columnKey) => (
                <TableCell>{renderCellLevel(level, columnKey)}</TableCell>
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
