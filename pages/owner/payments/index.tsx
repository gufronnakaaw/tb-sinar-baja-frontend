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
import { Eye, Pencil, Trash } from "@phosphor-icons/react";

// components
import InputSearchBar from "@/components/input/InputSearchBar";
import StatusPayment from "@/components/status/StatusPayment";
import CustomTooltip from "@/components/tooltip";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";

// utils
import usePagination from "@/hooks/usepagination";
import { customStyleTable } from "@/utils/customStyleTable";
import { formatRupiah } from "@/utils/formatRupiah";

import { payments, PaymentsType } from "@/_dummy/payments";

export default function InvoicesOutPage() {
  const { page, pages, data, setPage } = usePagination(payments, 10);

  const columns = [
    { name: "ID Pembayaran", uid: "payments_id", sortable: false },
    {
      name: "Dari",
      uid: "from",
      sortable: false,
    },
    { name: "Status", uid: "status", sortable: true },
    { name: "Total", uid: "total", sortable: true },
    { name: "Tanggal", uid: "payments_date", sortable: true },
    { name: "Aksi", uid: "action", sortable: false },
  ];

  const renderCell = (payments: PaymentsType, columnKey: React.Key) => {
    const cellValue = payments[columnKey as keyof PaymentsType];

    switch (columnKey) {
      case "payments_id":
        return <div className="text-default-900">{payments.id}</div>;
      case "from":
        return <div className="w-max text-default-900">{payments.from}</div>;
      case "status":
        return <StatusPayment text={payments.status} />;
      case "total":
        return (
          <div className="text-default-900">{formatRupiah(payments.total)}</div>
        );
      case "payments_date":
        return <div className="w-max text-default-900">{payments.date}</div>;
      case "action":
        return (
          <div className="flex max-w-[110px] items-center gap-1">
            <CustomTooltip content="Detail">
              <Button isIconOnly variant="light" size="sm">
                <Eye weight="bold" size={20} className="text-default-600" />
              </Button>
            </CustomTooltip>

            <CustomTooltip content="Edit">
              <Button isIconOnly variant="light" size="sm">
                <Pencil weight="bold" size={20} className="text-default-600" />
              </Button>
            </CustomTooltip>

            <CustomTooltip content="Hapus">
              <Button isIconOnly variant="light" color="danger" size="sm">
                <Trash weight="bold" size={20} />
              </Button>
            </CustomTooltip>
          </div>
        );

      default:
        return cellValue;
    }
  };

  return (
    <Layout title="Pembayaran">
      <Container className="gap-8">
        <h4 className="text-lg font-semibold text-default-900">Pembayaran</h4>

        <div className="grid gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <InputSearchBar
              placeholder="Cari pembayaran..."
              className="w-full sm:max-w-[500px]"
            />

            <Button
              variant="solid"
              color="primary"
              className="w-full font-medium sm:w-max"
            >
              Buat Pembayaran
            </Button>
          </div>

          <Table
            isHeaderSticky
            aria-label="payments table"
            color="primary"
            selectionMode="single"
            classNames={customStyleTable}
            className="scrollbar-hide"
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.uid}>{column.name}</TableColumn>
              )}
            </TableHeader>

            <TableBody items={data}>
              {(payments) => (
                <TableRow key={payments.id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(payments, columnKey)}</TableCell>
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
          />
        </div>
      </Container>
    </Layout>
  );
}
