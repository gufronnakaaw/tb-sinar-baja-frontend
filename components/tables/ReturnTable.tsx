import usePagination from "@/hooks/usepagination";
import { ReturnType } from "@/types/return.type";
import { customStyleTable } from "@/utils/customStyleTable";
import { formatRupiah } from "@/utils/formatRupiah";
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
import StatusMetode from "../status/StatusMetode";
import CustomTooltip from "../tooltip";

export default function ReturnTable({
  retur,
  role,
}: {
  retur: ReturnType[] | undefined;
  role: string;
}) {
  const { page, pages, data, setPage } = usePagination(retur ? retur : [], 10);
  const router = useRouter();

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
          <TableColumn className="w-max text-center">ID Retur</TableColumn>
          <TableColumn className="w-max text-center">ID Transaksi</TableColumn>
          <TableColumn className="w-max text-center">Penerima</TableColumn>
          <TableColumn className="w-max text-center">Total Item</TableColumn>
          <TableColumn className="w-max text-center">Metode</TableColumn>
          <TableColumn className="w-max text-center">
            Total Pengembalian
          </TableColumn>
          <TableColumn className="w-max text-center">Aksi</TableColumn>
        </TableHeader>
        <TableBody items={data} emptyContent="retur kosong">
          {(item) => (
            <TableRow key={item.id_return}>
              <TableCell className="text-center">{item.id_return}</TableCell>
              <TableCell className="text-center">{item.transaksi_id}</TableCell>
              <TableCell className="text-center">{item.penerima}</TableCell>
              <TableCell className="text-center">{item.total_item}</TableCell>
              <TableCell className="text-center">
                <StatusMetode text={item.metode} />
              </TableCell>
              <TableCell className="text-center">
                {formatRupiah(item.jumlah)}
              </TableCell>
              <TableCell>
                <div className="flex max-w-[110px] items-center gap-1">
                  <CustomTooltip content="Detail Lengkap">
                    <Button
                      isIconOnly
                      variant="light"
                      size="sm"
                      onClick={() =>
                        router.push(
                          `/${role}/selling/return/detail?id_retur=${item.id_return}`,
                        )
                      }
                    >
                      <Eye
                        weight="bold"
                        size={20}
                        className="text-default-600"
                      />
                    </Button>
                  </CustomTooltip>

                  <CustomTooltip content="Print">
                    <Button
                      isIconOnly
                      variant="light"
                      size="sm"
                      onClick={() =>
                        router.push(
                          `/${role}/selling/return/print?id_retur=${item.id_return}`,
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
                </div>
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
