import usePagination from "@/hooks/usepagination";
import { BrokenData } from "@/types/broken.type";
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
import { Eye, Printer } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import CustomTooltip from "../tooltip";

export default function BrokenTable({
  role,
  brokenItems,
}: {
  role: string;
  brokenItems: BrokenData[] | undefined;
}) {
  const { page, pages, data, setPage } = usePagination(brokenItems ?? [], 10);
  const router = useRouter();

  return (
    <>
      <Table
        isHeaderSticky
        aria-label="broken table"
        color="default"
        selectionMode="none"
        classNames={customStyleTable}
        className="scrollbar-hide"
      >
        <TableHeader>
          <TableColumn>ID Berita Acara</TableColumn>
          <TableColumn>Jumlah Barang Rusak</TableColumn>
          <TableColumn>Dibuat pada</TableColumn>
          <TableColumn>Aksi</TableColumn>
        </TableHeader>
        <TableBody items={data}>
          {(item) => (
            <TableRow key={item.id_ba}>
              <TableCell>{item.id_ba}</TableCell>
              <TableCell>{item.jumlah_barang}</TableCell>
              <TableCell>{formatDate(item.created_at)}</TableCell>
              <TableCell>
                <CustomTooltip content="Detail">
                  <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    onClick={() =>
                      router.push(
                        `/${role}/warehouses/broken/detail?id_ba=${item.id_ba}`,
                      )
                    }
                  >
                    <Eye weight="bold" size={20} className="text-default-600" />
                  </Button>
                </CustomTooltip>
                <CustomTooltip content="Print">
                  <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    onClick={() =>
                      router.push(
                        `/${role}/warehouses/broken/print?id_ba=${item.id_ba}`,
                      )
                    }
                  >
                    <Printer
                      weight="bold"
                      size={20}
                      className="text-default-600"
                    />
                  </Button>
                </CustomTooltip>
              </TableCell>
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
