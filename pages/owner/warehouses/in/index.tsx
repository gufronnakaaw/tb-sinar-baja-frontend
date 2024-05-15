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
  columnsWarehousesIn,
  renderCellWarehousesIn,
} from "@/headers/owner/warehouses/in";

// utils
import usePagination from "@/hooks/usepagination";
import { customStyleTable } from "@/utils/customStyleTable";

import { warehouseIn } from "@/_dummy/warehouses";

export default function WarehousesInPage() {
  const { page, pages, data, setPage } = usePagination(warehouseIn, 10);
  const router = useRouter();

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

            <Button
              variant="solid"
              color="primary"
              className="w-full font-medium sm:w-max"
            >
              Tambah Barang Masuk
            </Button>
          </div>

          <Table
            isHeaderSticky
            aria-label="warehouseIn table"
            color="primary"
            selectionMode="single"
            classNames={customStyleTable}
            className="scrollbar-hide"
          >
            <TableHeader columns={columnsWarehousesIn}>
              {(column) => (
                <TableColumn key={column.uid}>{column.name}</TableColumn>
              )}
            </TableHeader>

            <TableBody items={data}>
              {(warehouseIn) => (
                <TableRow key={warehouseIn.product}>
                  {(columnKey) => (
                    <TableCell>
                      {renderCellWarehousesIn(warehouseIn, columnKey, router)}
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
