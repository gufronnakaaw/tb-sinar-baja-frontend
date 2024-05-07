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
import { WarehouseLists, warehouseLists } from "@/_dummy/warehouses";
import InputSearchBar from "@/components/input/InputSearchBar";
import usePagination from "@/hooks/usepagination";
import { customStyleTable } from "@/utils/customStyleTable";

export default function WarehousesListsPage() {
  const { page, pages, data, setPage } = usePagination(warehouseLists, 10);

  const columns = [
    { name: "Kode", uid: "code", sortable: false },
    { name: "Nama", uid: "name", sortable: true },
    { name: "Dibuat Pada", uid: "created_at", sortable: true },
    { name: "Aksi", uid: "action", sortable: false },
  ];

  const renderCell = (warehouseLists: WarehouseLists, columnKey: React.Key) => {
    const cellValue = warehouseLists[columnKey as keyof WarehouseLists];

    switch (columnKey) {
      case "code":
        return <div className="text-default-900">{warehouseLists.code}</div>;
      case "name":
        return <div className="text-default-900">{warehouseLists.name}</div>;
      case "created_at":
        return (
          <div className="text-default-900">{warehouseLists.created_at}</div>
        );
      case "action":
        return (
          <Button
            variant="bordered"
            color="default"
            size="sm"
            onClick={() => alert(`ID Order: ${warehouseLists.code}`)}
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
    <Layout title="Daftar Gudang">
      <Container className="gap-8">
        <h4 className="text-lg font-semibold text-default-900">
          Daftar Gudang
        </h4>

        <div className="grid gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <InputSearchBar
              placeholder="Cari gudang..."
              className="w-full sm:max-w-[500px]"
            />

            <Button
              variant="solid"
              color="primary"
              className="w-full font-medium sm:w-max"
            >
              Buat Gudang
            </Button>
          </div>

          <Table
            isHeaderSticky
            aria-label="warehouseLists table"
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
              {(warehouseLists) => (
                <TableRow key={warehouseLists.code}>
                  {(columnKey) => (
                    <TableCell>
                      {renderCell(warehouseLists, columnKey)}
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
