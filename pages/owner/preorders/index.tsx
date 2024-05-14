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
  columnsPreOrders,
  renderCellPreOrders,
} from "@/headers/owner/preorders";

// utils
import usePagination from "@/hooks/usepagination";
import { customStyleTable } from "@/utils/customStyleTable";

import { preorders } from "@/_dummy/preorders";

export default function PreOrdersPage() {
  const { page, pages, data, setPage } = usePagination(preorders, 10);
  const router = useRouter();

  return (
    <Layout title="Pre Order List">
      <Container className="gap-8">
        <h4 className="text-lg font-semibold text-default-900">Pre Order</h4>

        <div className="grid gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <InputSearchBar
              placeholder="Cari pre order..."
              className="w-full sm:max-w-[500px]"
            />

            <Button
              variant="solid"
              color="primary"
              className="w-full font-medium sm:w-max"
            >
              Buat Pre Order
            </Button>
          </div>

          <Table
            isHeaderSticky
            aria-label="preorders table"
            color="primary"
            selectionMode="single"
            classNames={customStyleTable}
            className="scrollbar-hide"
          >
            <TableHeader columns={columnsPreOrders}>
              {(column) => (
                <TableColumn key={column.uid}>{column.name}</TableColumn>
              )}
            </TableHeader>

            <TableBody items={data}>
              {(preorder) => (
                <TableRow key={preorder.id_preorder}>
                  {(columnKey) => (
                    <TableCell>
                      {renderCellPreOrders(preorder, columnKey, router)}
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
