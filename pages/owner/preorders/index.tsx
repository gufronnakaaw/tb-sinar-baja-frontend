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
import React from "react";

// components
import InputSearchBar from "@/components/input/InputSearchBar";
import CustomTooltip from "@/components/tooltip";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";

// utils
import usePagination from "@/hooks/usepagination";
import { customStyleTable } from "@/utils/customStyleTable";
import { formatRupiah } from "@/utils/formatRupiah";

// dummy data
import { preorders, PreOrdersType } from "@/_dummy/preorders";

export default function PreOrdersPage() {
  const { page, pages, data, setPage } = usePagination(preorders, 10);

  const columns = [
    { name: "ID Pre Order", uid: "preorders_id", sortable: false },
    {
      name: "Nama Pelanggan",
      uid: "customer",
      sortable: false,
    },
    { name: "Total", uid: "total", sortable: true },
    { name: "Tanggal", uid: "preorders_date", sortable: true },
    { name: "Aksi", uid: "action", sortable: false },
  ];

  const renderCell = (preorders: PreOrdersType, columnKey: React.Key) => {
    const cellValue = preorders[columnKey as keyof PreOrdersType];

    switch (columnKey) {
      case "preorders_id":
        return <div className="text-default-900">{preorders.id}</div>;
      case "customer":
        return (
          <div className="w-max text-default-900">{preorders.customer}</div>
        );
      case "total":
        return (
          <div className="w-max text-default-900">
            {formatRupiah(preorders.total)}
          </div>
        );
      case "preorders_date":
        return <div className="w-max text-default-900">{preorders.date}</div>;
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
    <Layout title="Pre Order List">
      <Container className="gap-8">
        <h4 className="text-lg font-semibold text-default-900">Pre Order</h4>

        <div className="grid gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <InputSearchBar
              placeholder="Cari pre order..."
              className="w-full sm:max-w-[500px]"
            />

            <Button
              variant="solid"
              color="primary"
              className="w-full font-medium sm:w-max"
            >
              Buat Pre Order
            </Button>
          </div>

          <Table
            isHeaderSticky
            aria-label="preorders table"
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
              {(preorders) => (
                <TableRow key={preorders.id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(preorders, columnKey)}</TableCell>
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
