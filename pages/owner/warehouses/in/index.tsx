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
import { warehouseIn, WarehouseInType } from "@/_dummy/warehouses";
import InputSearchBar from "@/components/input/InputSearchBar";
import usePagination from "@/hooks/usepagination";
import { customStyleTable } from "@/utils/customStyleTable";

export default function WarehousesInPage() {
  const { page, pages, data, setPage } = usePagination(warehouseIn, 10);

  const columns = [
    { name: "Produk", uid: "product", sortable: false },
    { name: "Total", uid: "total", sortable: true },
    { name: "Dari", uid: "from", sortable: true },
    { name: "Dikirim Pada", uid: "created_at", sortable: true },
    { name: "Aksi", uid: "action", sortable: false },
  ];

  const renderCell = (warehouseIn: WarehouseInType, columnKey: React.Key) => {
    const cellValue = warehouseIn[columnKey as keyof WarehouseInType];

    switch (columnKey) {
      case "product":
        return <div className="text-default-900">{warehouseIn.product}</div>;
      case "total":
        return <div className="text-default-900">{warehouseIn.total}</div>;
      case "from":
        return <div className="text-default-900">{warehouseIn.from}</div>;
      case "created_at":
        return <div className="text-default-900">{warehouseIn.created_at}</div>;
      case "action":
        return (
          <Button
            variant="bordered"
            color="default"
            size="sm"
            onClick={() => alert(`ID Order: ${warehouseIn.product}`)}
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
    <Layout title="Barang Masuk">
      <Container className="gap-8">
        <h4 className="text-lg font-semibold text-default-900">Barang Masuk</h4>

        <div className="grid gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <InputSearchBar
              placeholder="Cari barang..."
              className="w-full sm:max-w-[500px]"
            />
          </div>

          <Table
            isHeaderSticky
            aria-label="warehouseIn table"
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
              {(warehouseIn) => (
                <TableRow key={warehouseIn.product}>
                  {(columnKey) => (
                    <TableCell>{renderCell(warehouseIn, columnKey)}</TableCell>
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
