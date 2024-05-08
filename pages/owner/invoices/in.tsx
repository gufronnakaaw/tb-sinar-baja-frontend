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

import { invin, InvoicesInType } from "@/_dummy/invoices";

export default function InvoicesInPage() {
  const { page, pages, data, setPage } = usePagination(invin, 10);

  const columns = [
    { name: "ID Invoice Masuk", uid: "invin_id", sortable: false },
    {
      name: "Dari",
      uid: "from",
      sortable: false,
    },
    { name: "Nomor", uid: "reference", sortable: false },
    { name: "Total", uid: "total", sortable: true },
    {
      name: "Jatuh Tempo",
      uid: "due_date",
      sortable: false,
    },
    {
      name: "Deskripsi",
      uid: "description",
      sortable: false,
    },

    { name: "Aksi", uid: "action", sortable: false },
  ];

  const renderCell = (invin: InvoicesInType, columnKey: React.Key) => {
    const cellValue = invin[columnKey as keyof InvoicesInType];

    switch (columnKey) {
      case "invin_id":
        return <div className="text-default-900">{invin.id}</div>;
      case "from":
        return <div className="w-max text-default-900">{invin.from}</div>;
      case "reference":
        return <div className="text-default-900">{invin.reference}</div>;
      case "total":
        return (
          <div className="text-default-900">{formatRupiah(invin.total)}</div>
        );
      case "due_date":
        return <div className="w-max text-default-900">{invin.due_date}</div>;
      case "description":
        return (
          <CustomTooltip content={invin.description}>
            <div className="line-clamp-1 max-w-[250px] text-default-900">
              {invin.description}
            </div>
          </CustomTooltip>
        );
      case "action":
        return (
          <div className="flex items-center gap-1">
            <CustomTooltip content="Edit">
              <Button isIconOnly variant="light" size="sm">
                <Pencil weight="bold" size={20} className="text-default-600" />
              </Button>
            </CustomTooltip>

            <CustomTooltip content="Detail">
              <Button isIconOnly variant="light" size="sm">
                <Eye weight="bold" size={20} className="text-default-600" />
              </Button>
            </CustomTooltip>

            <CustomTooltip content="Cetak">
              <Button isIconOnly variant="light" size="sm">
                <Printer weight="bold" size={20} className="text-default-600" />
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
    <Layout title="Invoice Masuk">
      <Container className="gap-8">
        <h4 className="text-lg font-semibold text-default-900">
          Invoice Masuk
        </h4>

        <div className="grid gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <InputSearchBar
              placeholder="Cari invoice masuk..."
              className="w-full sm:max-w-[500px]"
            />

            <Button
              variant="solid"
              color="primary"
              className="w-full font-medium sm:w-max"
            >
              Buat Invoice Masuk
            </Button>
          </div>

          <Table
            isHeaderSticky
            aria-label="invin table"
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
              {(invin) => (
                <TableRow key={invin.id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(invin, columnKey)}</TableCell>
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
