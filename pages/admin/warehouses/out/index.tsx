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
  columnsWarehousesOut,
  renderCellWarehousesOut,
} from "@/headers/owner/warehouses/out";

// utils
import usePagination from "@/hooks/usepagination";
import { customStyleTable } from "@/utils/customStyleTable";

import { warehouseOut } from "@/_dummy/warehouses";

export default function WarehousesOutPage() {
  const { page, pages, data, setPage } = usePagination(warehouseOut, 10);
  const router = useRouter();

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
            className="scrollbar-hide"
          >
            <TableHeader columns={columnsWarehousesOut}>
              {(column) => (
                <TableColumn key={column.uid}>{column.name}</TableColumn>
              )}
            </TableHeader>

            <TableBody items={data}>
              {(warehouseOut) => (
                <TableRow key={warehouseOut.product}>
                  {(columnKey) => (
                    <TableCell>
                      {renderCellWarehousesOut(warehouseOut, columnKey, router)}
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
