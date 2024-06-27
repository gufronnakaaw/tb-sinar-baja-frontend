import usePagination from "@/hooks/usepagination";
import { customStyleTable } from "@/utils/customStyleTable";
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

export default function ReturnTable({ role }: { role: string }) {
  const { page, pages, data, setPage } = usePagination([{ name: "aku" }], 10);

  return (
    <>
      <Table
        isHeaderSticky
        aria-label="return table"
        color="default"
        selectionMode="none"
        classNames={customStyleTable}
        className="scrollbar-hide"
      >
        <TableHeader className="text-center">
          <TableColumn className="w-[150px] text-center">Kode Item</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>oke gas</TableCell>
          </TableRow>
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
