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
import { WarehouseDocuments, warehouseDocuments } from "@/_dummy/warehouses";
import InputSearchBar from "@/components/input/InputSearchBar";
import usePagination from "@/hooks/usepagination";
import { customStyleTable } from "@/utils/customStyleTable";

export default function WarehousesDocumentsPage() {
  const { page, pages, data, setPage } = usePagination(warehouseDocuments, 10);

  const columns = [
    { name: "Invoice", uid: "invoice", sortable: false },
    { name: "Ke", uid: "to", sortable: true },
    { name: "Aksi", uid: "action", sortable: false },
  ];

  const renderCell = (
    warehouseDocuments: WarehouseDocuments,
    columnKey: React.Key,
  ) => {
    const cellValue = warehouseDocuments[columnKey as keyof WarehouseDocuments];

    switch (columnKey) {
      case "invoice":
        return (
          <div className="text-default-900">{warehouseDocuments.invoice}</div>
        );
      case "to":
        return <div className="text-default-900">{warehouseDocuments.to}</div>;
      case "action":
        return (
          <Button
            variant="bordered"
            color="default"
            size="sm"
            onClick={() => alert(`ID Order: ${warehouseDocuments.invoice}`)}
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
    <Layout title="Surat Jalan">
      <Container className="gap-8">
        <h4 className="text-lg font-semibold text-default-900">Surat Jalan</h4>

        <div className="grid gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <InputSearchBar
              placeholder="Cari surat jalan..."
              className="w-full sm:max-w-[500px]"
            />

            <Button
              variant="solid"
              color="primary"
              className="w-full font-medium sm:w-max"
            >
              Buat Surat Jalan
            </Button>
          </div>

          <Table
            isHeaderSticky
            aria-label="warehouseDocuments table"
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
              {(warehouseDocuments) => (
                <TableRow key={warehouseDocuments.invoice}>
                  {(columnKey) => (
                    <TableCell>
                      {renderCell(warehouseDocuments, columnKey)}
                    </TableCell>
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
