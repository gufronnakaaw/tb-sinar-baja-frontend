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
  columnsInvoicesOut,
  renderCellInvoicesOut,
} from "@/headers/owner/invoice";

// utils
import usePagination from "@/hooks/usepagination";
import { customStyleTable } from "@/utils/customStyleTable";

import { invout } from "@/_dummy/invoices";

export default function InvoicesOutPage() {
  const { page, pages, data, setPage } = usePagination(invout, 10);
  const router = useRouter();

  return (
    <Layout title="Invoice Keluar">
      <Container className="gap-8">
        <h4 className="text-lg font-semibold text-default-900">
          Invoice Keluar
        </h4>

        <div className="grid gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <InputSearchBar
              placeholder="Cari invoice keluar..."
              className="w-full sm:max-w-[500px]"
            />

            <Button
              variant="solid"
              color="primary"
              className="w-full font-medium sm:w-max"
            >
              Buat Invoice Keluar
            </Button>
          </div>

          <Table
            isHeaderSticky
            aria-label="invout table"
            color="primary"
            selectionMode="single"
            classNames={customStyleTable}
            className="scrollbar-hide"
          >
            <TableHeader columns={columnsInvoicesOut}>
              {(column) => (
                <TableColumn key={column.uid}>{column.name}</TableColumn>
              )}
            </TableHeader>

            <TableBody items={data}>
              {(invout) => (
                <TableRow key={invout.id}>
                  {(columnKey) => (
                    <TableCell>
                      {renderCellInvoicesOut(invout, columnKey, router)}
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
