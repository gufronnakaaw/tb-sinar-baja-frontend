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
  columnsInvoicesIn,
  renderCellInvoicesIn,
} from "@/headers/owner/invoices";

// utils
import usePagination from "@/hooks/usepagination";
import { customStyleTable } from "@/utils/customStyleTable";

import { invin } from "@/_dummy/invoices";

export default function InvoicesInPage() {
  const { page, pages, data, setPage } = usePagination(invin, 10);
  const router = useRouter();

  return (
    <Layout title="Invoice Masuk">
      <Container className="gap-8">
        <h4 className="text-lg font-semibold text-default-900">
          Invoice Masuk
        </h4>

        <div className="grid gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <InputSearchBar
              placeholder="Cari invoice masuk..."
              className="w-full sm:max-w-[500px]"
            />

            <Button
              variant="solid"
              color="primary"
              className="w-full font-medium sm:w-max"
            >
              Buat Invoice Masuk
            </Button>
          </div>

          <Table
            isHeaderSticky
            aria-label="invin table"
            color="primary"
            selectionMode="single"
            classNames={customStyleTable}
            className="scrollbar-hide"
          >
            <TableHeader columns={columnsInvoicesIn}>
              {(column) => (
                <TableColumn key={column.uid}>{column.name}</TableColumn>
              )}
            </TableHeader>

            <TableBody items={data}>
              {(invin) => (
                <TableRow key={invin.id}>
                  {(columnKey) => (
                    <TableCell>
                      {renderCellInvoicesIn(invin, columnKey, router)}
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
