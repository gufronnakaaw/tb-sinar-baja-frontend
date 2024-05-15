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
import { useRouter } from "next/router";

// components
import InputSearchBar from "@/components/input/InputSearchBar";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";
import {
  columnsSuppliersPricelists,
  renderCellSuppliersPricelists,
} from "@/headers/owner/suppliers/pricelists";

// utils
import usePagination from "@/hooks/usepagination";
import { customStyleTable } from "@/utils/customStyleTable";

import { suppliers } from "@/_dummy/suppliers";

export default function SupplierPriceListsPage() {
  const { page, pages, data, setPage } = usePagination(suppliers, 10);
  const router = useRouter();

  return (
    <Layout title="Daftar Harga Supplier">
      <Container className="gap-8">
        <h4 className="text-lg font-semibold text-default-900">
          Daftar Harga Supplier
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
              Tambah Harga Supplier
            </Button>
          </div>

          <Table
            isHeaderSticky
            aria-label="suppliers table"
            color="primary"
            selectionMode="single"
            classNames={customStyleTable}
            className="scrollbar-hide"
          >
            <TableHeader columns={columnsSuppliersPricelists}>
              {(column) => (
                <TableColumn key={column.uid}>{column.name}</TableColumn>
              )}
            </TableHeader>

            <TableBody items={data}>
              {(supplier) => (
                <TableRow key={supplier.code}>
                  {(columnKey) => (
                    <TableCell>
                      {renderCellSuppliersPricelists(
                        supplier,
                        columnKey,
                        router,
                      )}
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
