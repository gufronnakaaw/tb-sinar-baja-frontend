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
import CustomTooltip from "@/components/tooltip";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";

// utils
import usePagination from "@/hooks/usepagination";
import { customStyleTable } from "@/utils/customStyleTable";
import { formatRupiah } from "@/utils/formatRupiah";

import { orders, OrdersType } from "@/_dummy/orders";

export default function OrderPage() {
  const { page, pages, data, setPage } = usePagination(orders, 10);

  const columns = [
    { name: "ID Order", uid: "orders_id", sortable: false },
    {
      name: "Pembelian Ke",
      uid: "to",
      sortable: false,
    },
    { name: "Total", uid: "total", sortable: true },
    { name: "Tanggal", uid: "orders_date", sortable: true },
    { name: "Aksi", uid: "action", sortable: false },
  ];

  const renderCell = (orders: OrdersType, columnKey: React.Key) => {
    const cellValue = orders[columnKey as keyof OrdersType];

    switch (columnKey) {
      case "orders_id":
        return <div className="text-default-900">{orders.id}</div>;
      case "customer":
        return <div className="w-max text-default-900">{orders.to}</div>;
      case "total":
        return (
          <div className="w-max text-default-900">
            {formatRupiah(orders.total)}
          </div>
        );
      case "orders_date":
        return <div className="w-max text-default-900">{orders.date}</div>;
      case "action":
        return (
          <div className="flex max-w-[110px] items-center gap-1">
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
    <Layout title="Order">
      <Container className="gap-8">
        <h4 className="text-lg font-semibold text-default-900">Order</h4>

        <div className="grid gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <InputSearchBar
              placeholder="Cari order..."
              className="w-full sm:max-w-[500px]"
            />

            <Button
              variant="solid"
              color="primary"
              className="w-full font-medium sm:w-max"
            >
              Buat Order
            </Button>
          </div>

          <Table
            isHeaderSticky
            aria-label="orders table"
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
              {(orders) => (
                <TableRow key={orders.id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(orders, columnKey)}</TableCell>
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
