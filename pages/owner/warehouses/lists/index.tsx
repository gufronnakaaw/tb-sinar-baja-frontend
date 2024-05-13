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
import InputSearchBar from "@/components/input/InputSearchBar";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";

// utils
import usePagination from "@/hooks/usepagination";
import { customStyleTable } from "@/utils/customStyleTable";

import { columnsGudang, renderCellGudang } from "@/headers/owner/warehouses";
import { WarehousesType } from "@/types/warehouses.type";
import { fetcher } from "@/utils/fetcher";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export default function WarehousesListsPage({
  gudang,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { page, pages, data, setPage } = usePagination(gudang, 10);

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
            className="scrollbar-hide"
          >
            <TableHeader columns={columnsGudang}>
              {(column) => (
                <TableColumn key={column.uid}>{column.name}</TableColumn>
              )}
            </TableHeader>

            <TableBody items={data}>
              {(warehouseLists) => (
                <TableRow key={warehouseLists.kode_gudang}>
                  {(columnKey) => (
                    <TableCell>
                      {renderCellGudang(warehouseLists, columnKey)}
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

export const getServerSideProps = (async () => {
  const result = await fetcher({
    url: "/gudang",
    method: "GET",
  });

  const gudang: WarehousesType[] = result.data as WarehousesType[];

  return {
    props: {
      gudang,
    },
  };
}) satisfies GetServerSideProps<{ gudang: WarehousesType[] }>;
