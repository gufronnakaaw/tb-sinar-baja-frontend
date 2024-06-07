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
import { fetcher } from "@/utils/fetcher";
import { formatDate } from "@/utils/formatDate";
import { Pencil, Trash } from "@phosphor-icons/react";
import { KeyedMutator } from "swr";
import CustomTooltip from "../tooltip";

export default function LevelsTable({
  level,
  role,
  mutate,
}: {
  level: LevelType[] | undefined;
  role: string;
  mutate: KeyedMutator<any>;
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

            <CustomTooltip content="Hapus">
              <Button
                isIconOnly
                variant="light"
                size="sm"
                onClick={() => handleDeleteLevel(level.id_level)}
              >
                <Trash weight="bold" size={20} className="text-default-600" />
              </Button>
            </CustomTooltip>
          </div>
        );

      default:
        return cellValue;
    }
  }

  async function handleDeleteLevel(id_level: string) {
    if (!confirm("apakah anda yakin?")) return;

    try {
      await fetcher({
        url: "/level/" + id_level,
        method: "DELETE",
      });
      alert("level berhasil dihapus");
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
        aria-label="level table"
        color="primary"
        selectionMode="none"
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
