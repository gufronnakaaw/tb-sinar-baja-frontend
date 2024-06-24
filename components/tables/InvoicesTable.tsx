import usePagination from "@/hooks/usepagination";
import { InvoiceType } from "@/types/invoice.type";
import { customStyleTable } from "@/utils/customStyleTable";
import { formatDate } from "@/utils/formatDate";
import { formatRupiah } from "@/utils/formatRupiah";
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
import { Eye, HandCoins } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import CustomTooltip from "../tooltip";

export default function InvoiceTable({
  invoice,
  role,
}: {
  invoice: InvoiceType[] | undefined;
  role: string;
}) {
  const { page, pages, data, setPage } = usePagination(
    invoice ? invoice : [],
    10,
  );

  const router = useRouter();

  const columnsInvoice = [
    { name: "Nomor Invoice", uid: "nomor_invoice" },
    { name: "Jatuh Tempo", uid: "jatuh_tempo" },
    { name: "Status", uid: "status" },
    { name: "Tagihan", uid: "tagihan" },
    { name: "Sisa", uid: "sisa" },
    { name: "Dibuat Pada", uid: "created_at" },
    { name: "Aksi", uid: "action" },
  ];

  function getStatus(status: string) {
    if (status == "hutang") {
      return {
        text: "Unpaid",
        classname: "bg-danger-100 text-danger",
      };
    }

    if (status == "pembayaran") {
      return {
        text: "Paid",
        classname: "bg-warning-100 text-warning",
      };
    }

    if (status == "lunas") {
      return {
        text: "lunas",
        classname: "bg-success-100 text-success",
      };
    }
  }

  function renderCellInvoice(item: InvoiceType, columnKey: React.Key) {
    const cellValue = item[columnKey as keyof InvoiceType];

    switch (columnKey) {
      case "nomor_invoice":
        return (
          <div className="w-max text-default-900">{item.nomor_invoice}</div>
        );
      case "jatuh_tempo":
        return <div className="w-max text-default-900">{item.jatuh_tempo}</div>;
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
              className={getStatus(item.status)?.classname}
            >
              {getStatus(item.status)?.text}
            </Chip>
          </div>
        );
      case "tagihan":
        return (
          <div className="w-max text-default-900">
            {formatRupiah(item.tagihan)}
          </div>
        );
      case "sisa":
        return (
          <div className="w-max text-default-900">
            {formatRupiah(item.sisa)}
          </div>
        );
      case "created_at":
        return (
          <div className="w-max text-default-900">
            {formatDate(item.created_at)}
          </div>
        );
      case "action":
        return (
          <div className="flex max-w-[110px] items-center gap-1">
            <CustomTooltip content="Riwayat Pembayaran">
              <Button
                isIconOnly
                variant="light"
                size="sm"
                onClick={() =>
                  router.push(
                    `/${role}/purchases/invin/histories?id_invoice=${item.id_invoice}`,
                  )
                }
              >
                <Eye weight="bold" size={20} className="text-default-600" />
              </Button>
            </CustomTooltip>

            {item.status != "lunas" ? (
              <CustomTooltip content="Bayar">
                <Button
                  isIconOnly
                  variant="light"
                  size="sm"
                  onClick={() =>
                    router.push(
                      `/${role}/purchases/invin/payments?id_invoice=${item.id_invoice}`,
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
        aria-label="invoice table"
        color="default"
        selectionMode="none"
        classNames={customStyleTable}
        className="scrollbar-hide"
      >
        <TableHeader columns={columnsInvoice}>
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>

        <TableBody items={data} emptyContent="Invoice tidak ditemukan!">
          {(item) => (
            <TableRow key={item.id_invoice}>
              {(columnKey) => (
                <TableCell>{renderCellInvoice(item, columnKey)}</TableCell>
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
