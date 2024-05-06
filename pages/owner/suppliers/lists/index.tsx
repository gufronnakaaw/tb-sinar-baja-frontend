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
import { SuppliersType, suppliers } from "@/_dummy/suppliers";
import InputSearchBar from "@/components/input/InputSearchBar";
import usePagination from "@/hooks/usepagination";
import { customStyleTable } from "@/utils/customStyleTable";

export default function SupplierListsPage() {
  const { page, pages, data, setPage } = usePagination(suppliers, 10);

  const columns = [
    { name: "Kode", uid: "code", sortable: false },
    { name: "Nama", uid: "name", sortable: true },
    { name: "Dibuat Pada", uid: "created_at", sortable: true },
    { name: "Aksi", uid: "action", sortable: false },
  ];

  const renderCell = (suppliers: SuppliersType, columnKey: React.Key) => {
    const cellValue = suppliers[columnKey as keyof SuppliersType];

    switch (columnKey) {
      case "code":
        return <div className="text-default-900">{suppliers.code}</div>;
      case "name":
        return <div className="text-default-900">{suppliers.name}</div>;
      case "created_at":
        return <div className="text-default-900">{suppliers.created_at}</div>;
      case "action":
        return (
          <Button
            variant="bordered"
            color="default"
            size="sm"
            onClick={() => alert(`ID Order: ${suppliers.code}`)}
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
    <Layout title="Daftar Supplier">
      <Container className="gap-8">
        <h4 className="text-lg font-semibold text-default-900">
          Daftar Supplier
        </h4>

        <div className="grid gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <InputSearchBar
              placeholder="Cari supplier..."
              className="w-full sm:max-w-[500px]"
            />

            <Button
              variant="solid"
              color="primary"
              className="w-full font-medium sm:w-max"
            >
              Tambah Supplier
            </Button>
          </div>

          <Table
            isHeaderSticky
            aria-label="suppliers table"
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
              {(suppliers) => (
                <TableRow key={suppliers.code}>
                  {(columnKey) => (
                    <TableCell>{renderCell(suppliers, columnKey)}</TableCell>
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
