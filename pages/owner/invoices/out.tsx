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

import { InvoicesOutType, invout } from "@/_dummy/invoices";

export default function InvoicesOutPage() {
  const { page, pages, data, setPage } = usePagination(invout, 10);

  const columns = [
    { name: "ID Invoice Keluar", uid: "invout_id", sortable: false },
    { name: "Tanggal", uid: "invout_date", sortable: true },
    {
      name: "Ke",
      uid: "to",
      sortable: false,
    },
    { name: "Total", uid: "total", sortable: true },
    { name: "Aksi", uid: "action", sortable: false },
  ];

  const renderCell = (invout: InvoicesOutType, columnKey: React.Key) => {
    const cellValue = invout[columnKey as keyof InvoicesOutType];

    switch (columnKey) {
      case "invout_id":
        return <div className="text-default-900">{invout.id}</div>;
      case "invout_date":
        return <div className="text-default-900">{invout.date}</div>;
      case "customer":
        return <div className="text-default-900">{invout.to}</div>;
      case "total":
        return (
          <div className="text-default-900">{formatRupiah(invout.total)}</div>
        );
      case "action":
        return (
          <Button
            variant="bordered"
            color="default"
            size="sm"
            onClick={() => alert(`ID Order: ${invout.id}`)}
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
    <Layout title="Invoice Keluar">
      <Container className="gap-8">
        <h4 className="text-lg font-semibold text-default-900">
          Invoice Keluar
        </h4>

        <div className="grid gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <InputSearchBar
              placeholder="Cari invoice keluar..."
              className="w-full sm:max-w-[500px]"
            />

            <Button
              variant="solid"
              color="primary"
              className="w-full font-medium sm:w-max"
            >
              Buat Invoice Keluar
            </Button>
          </div>

          <Table
            isHeaderSticky
            aria-label="invout table"
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
              {(invout) => (
                <TableRow key={invout.id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(invout, columnKey)}</TableCell>
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
