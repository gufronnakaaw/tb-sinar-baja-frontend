import usePagination from "@/hooks/usepagination";
import { InvoutType } from "@/types/invoices.type";
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
import {
  ClockCounterClockwise,
  Eye,
  HandCoins,
  Pencil,
} from "@phosphor-icons/react";
import { useRouter } from "next/router";
import StatusPayment from "../status/StatusPayment";
import CustomTooltip from "../tooltip";

export default function InvoutTable({
  role,
  invout,
}: {
  role: string;
  invout: InvoutType[] | undefined;
}) {
  const { page, pages, data, setPage } = usePagination(
    invout ? invout : [],
    10,
  );
  const router = useRouter();

  return (
    <>
      <Table
        isHeaderSticky
        aria-label="invout table"
        color="default"
        selectionMode="none"
        classNames={customStyleTable}
        className="scrollbar-hide"
      >
        <TableHeader>
          <TableColumn className="text-center">ID Invoice Out</TableColumn>
          <TableColumn className="text-center">ID Transaksi</TableColumn>
          <TableColumn className="text-center">Total</TableColumn>
          <TableColumn className="text-center">Sisa</TableColumn>
          <TableColumn className="text-center">Status</TableColumn>
          <TableColumn className="text-center">Jatuh Tempo</TableColumn>
          <TableColumn className="text-center">Aksi</TableColumn>
        </TableHeader>
        <TableBody items={data} emptyContent="Invoice kosong">
          {(item) => (
            <TableRow key={item.id_invoice}>
              <TableCell className="text-center">{item.id_invoice}</TableCell>
              <TableCell className="text-center">{item.transaksi_id}</TableCell>
              <TableCell className="text-center">
                {formatRupiah(item.tagihan)}
              </TableCell>
              <TableCell className="text-center">
                {formatRupiah(item.sisa)}
              </TableCell>
              <TableCell className="text-center">
                <StatusPayment text={item.status} />
              </TableCell>
              <TableCell className="text-center">
                {item.jatuh_tempo ?? "-"}
              </TableCell>
              <TableCell className="text-center">
                <CustomTooltip content="Riwayat Pembayaran">
                  <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    onClick={() =>
                      router.push(
                        `/${role}/purchases/invout/histories?id_invoice=${item.id_invoice}`,
                      )
                    }
                  >
                    <ClockCounterClockwise
                      weight="bold"
                      size={20}
                      className="text-default-600"
                    />
                  </Button>
                </CustomTooltip>
                <CustomTooltip content="Detail">
                  <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    onClick={() =>
                      router.push(
                        `/${role}/purchases/invout/detail?id_invoice=${item.id_invoice}`,
                      )
                    }
                  >
                    <Eye weight="bold" size={20} className="text-default-600" />
                  </Button>
                </CustomTooltip>
                <CustomTooltip content="Bayar">
                  <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    onClick={() =>
                      router.push(
                        `/${role}/purchases/invout/payment?id_invoice=${item.id_invoice}`,
                      )
                    }
                  >
                    <HandCoins
                      weight="bold"
                      size={20}
                      className="text-default-600"
                    />
                  </Button>
                </CustomTooltip>
                <CustomTooltip content="Edit Jatuh Tempo">
                  <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    onClick={() =>
                      router.push(
                        `/${role}/purchases/invout/edit?id_invoice=${item.id_invoice}`,
                      )
                    }
                  >
                    <Pencil
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
