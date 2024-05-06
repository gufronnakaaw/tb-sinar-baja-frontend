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

// components
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";

// utils
import InputSearchBar from "@/components/input/InputSearchBar";
import usePagination from "@/hooks/usepagination";
import { customStyleTable } from "@/utils/customStyleTable";
import { formatRupiah } from "@/utils/formatRupiah";

import { payments, PaymentsType } from "@/_dummy/payments";

export default function InvoicesOutPage() {
  const { page, pages, data, setPage } = usePagination(payments, 10);

  const columns = [
    { name: "ID Pembayaran", uid: "payments_id", sortable: false },
    { name: "Tanggal", uid: "payments_date", sortable: true },
    {
      name: "Dari",
      uid: "from",
      sortable: false,
    },
    { name: "Status", uid: "status", sortable: true },
    { name: "Total", uid: "total", sortable: true },
    { name: "Aksi", uid: "action", sortable: false },
  ];

  const renderCell = (payments: PaymentsType, columnKey: React.Key) => {
    const cellValue = payments[columnKey as keyof PaymentsType];

    switch (columnKey) {
      case "payments_id":
        return <div className="text-default-900">{payments.id}</div>;
      case "payments_date":
        return <div className="text-default-900">{payments.date}</div>;
      case "from":
        return <div className="text-default-900">{payments.from}</div>;
      case "status":
        return (
          <div
            className={`${payments.status == "lunas" ? "text-green-500" : "text-red-500"}`}
          >
            {payments.status}
          </div>
        );
      case "total":
        return (
          <div className="text-default-900">{formatRupiah(payments.total)}</div>
        );
      case "action":
        return (
          <Button
            variant="bordered"
            color="default"
            size="sm"
            onClick={() => alert(`ID Order: ${payments.id}`)}
            className="font-medium"
          >
            Detail
          </Button>
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
          </div>

          <Table
            isHeaderSticky
            aria-label="payments table"
            color="primary"
            selectionMode="single"
            classNames={customStyleTable}
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
