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
import { Eye, Pencil, Printer, Trash } from "@phosphor-icons/react";

// components
import InputSearchBar from "@/components/input/InputSearchBar";
import CustomTooltip from "@/components/tooltip";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";

// utils
import usePagination from "@/hooks/usepagination";
import { customStyleTable } from "@/utils/customStyleTable";
import { formatRupiah } from "@/utils/formatRupiah";

import { InvoicesOutType, invout } from "@/_dummy/invoices";

export default function InvoicesOutPage() {
  const { page, pages, data, setPage } = usePagination(invout, 10);

  const columns = [
    { name: "ID Invoice Keluar", uid: "invout_id", sortable: false },
    {
      name: "Ke",
      uid: "to",
      sortable: false,
    },
    { name: "Total", uid: "total", sortable: true },
    { name: "Tanggal", uid: "invout_date", sortable: true },
    { name: "Aksi", uid: "action", sortable: false },
  ];

  const renderCell = (invout: InvoicesOutType, columnKey: React.Key) => {
    const cellValue = invout[columnKey as keyof InvoicesOutType];

    switch (columnKey) {
      case "invout_id":
        return <div className="text-default-900">{invout.id}</div>;
      case "to":
        return <div className="w-max text-default-900">{invout.to}</div>;
      case "total":
        return (
          <div className="w-max text-default-900">
            {formatRupiah(invout.total)}
          </div>
        );
      case "invout_date":
        return <div className="w-max text-default-900">{invout.date}</div>;
      case "action":
        return (
          <div className="flex items-center gap-1">
            <CustomTooltip content="Cetak">
              <Button isIconOnly variant="light" size="sm">
                <Printer weight="bold" size={20} className="text-default-600" />
              </Button>
            </CustomTooltip>

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
            className="scrollbar-hide"
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
