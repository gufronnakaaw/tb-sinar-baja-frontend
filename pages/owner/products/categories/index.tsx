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
  columnsKategori,
  renderCellKategori,
} from "@/headers/owner/products/categories";

// utils
import usePagination from "@/hooks/usepagination";
import { customStyleTable } from "@/utils/customStyleTable";

import { ProductsCategoriesType } from "@/types/productsCategories.type";
import { fetcher } from "@/utils/fetcher";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export default function ProductsCategoriesPage({
  kategori,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { page, pages, data, setPage } = usePagination(kategori, 10);
  const router = useRouter();

  return (
    <Layout title="Produk Kategori">
      <Container className="gap-20">
        <div className="grid gap-8">
          <h4 className="text-lg font-semibold text-default-900">
            Kategori Produk
          </h4>

          <div className="grid gap-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <InputSearchBar
                placeholder="Cari Kategori..."
                className="w-full sm:max-w-[500px]"
              />

              <Button
                variant="solid"
                color="primary"
                className="w-full font-medium sm:w-max"
              >
                Buat Kategori
              </Button>
            </div>

            <Table
              isHeaderSticky
              aria-label="products categories table"
              color="primary"
              selectionMode="single"
              classNames={customStyleTable}
              className="scrollbar-hide"
            >
              <TableHeader columns={columnsKategori}>
                {(column) => (
                  <TableColumn key={column.uid}>{column.name}</TableColumn>
                )}
              </TableHeader>

              <TableBody items={data}>
                {(item) => (
                  <TableRow key={item.id_kategori}>
                    {(columnKey) => (
                      <TableCell>
                        {renderCellKategori(item, columnKey, router)}
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
        </div>
      </Container>
    </Layout>
  );
}

export const getServerSideProps = (async () => {
  const result = await fetcher({
    url: "/kategori",
    method: "GET",
  });

  const kategori: ProductsCategoriesType[] =
    result.data as ProductsCategoriesType[];

  return {
    props: {
      kategori,
    },
  };
}) satisfies GetServerSideProps<{ kategori: ProductsCategoriesType[] }>;
