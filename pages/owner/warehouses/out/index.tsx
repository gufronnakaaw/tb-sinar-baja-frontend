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
import { warehouseOut, WarehouseOutType } from "@/_dummy/warehouses";
import InputSearchBar from "@/components/input/InputSearchBar";
import usePagination from "@/hooks/usepagination";
import { customStyleTable } from "@/utils/customStyleTable";

export default function WarehousesOutPage() {
  const { page, pages, data, setPage } = usePagination(warehouseOut, 10);

  const columns = [
    { name: "Produk", uid: "product", sortable: false },
    { name: "Total", uid: "total", sortable: true },
    { name: "Alasan", uid: "reason", sortable: true },
    { name: "Aksi", uid: "action", sortable: false },
  ];

  const renderCell = (warehouseOut: WarehouseOutType, columnKey: React.Key) => {
    const cellValue = warehouseOut[columnKey as keyof WarehouseOutType];

    switch (columnKey) {
      case "product":
        return <div className="text-default-900">{warehouseOut.product}</div>;
      case "total":
        return <div className="text-default-900">{warehouseOut.total}</div>;
      case "reason":
        return <div className="text-default-900">{warehouseOut.reason}</div>;
      case "action":
        return (
          <Button
            variant="bordered"
            color="default"
            size="sm"
            onClick={() => alert(`ID Order: ${warehouseOut.product}`)}
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
    <Layout title="Barang Keluar">
      <Container className="gap-8">
        <h4 className="text-lg font-semibold text-default-900">
          Barang Keluar
        </h4>

        <div className="grid gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <InputSearchBar
              placeholder="Cari barang..."
              className="w-full sm:max-w-[500px]"
            />

            <Button
              variant="solid"
              color="primary"
              className="w-full font-medium sm:w-max"
            >
              Buat Barang Keluar
            </Button>
          </div>

          <Table
            isHeaderSticky
            aria-label="warehouseOut table"
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
              {(warehouseOut) => (
                <TableRow key={warehouseOut.product}>
                  {(columnKey) => (
                    <TableCell>{renderCell(warehouseOut, columnKey)}</TableCell>
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
