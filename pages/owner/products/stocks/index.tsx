import {
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
  columnsProductsStocks,
  renderCellProductsStocks,
} from "@/headers/owner/products/stocks";

// utils
import { customStyleTable } from "@/utils/customStyleTable";

import { ProdukType } from "@/types/products.type";
import { fetcher } from "@/utils/fetcher";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useState } from "react";
import useSWR from "swr";

export default function ProductsStocksPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const router = useRouter();
  const [page, setPage] = useState(1);

  const {
    data: produk,
    error,
    isLoading,
  } = useSWR(
    {
      url: "/produk?page=" + page,
      method: "GET",
    },
    fetcher,
    {
      fallbackData: props.produk,
      revalidateOnFocus: false,
    },
  );

  if (isLoading) {
    return;
  }

  if (error) {
    console.log(error);
  }

  return (
    <Layout title="Stok Produk">
      <Container className="gap-8">
        <h4 className="text-lg font-semibold text-default-900">Stok Produk</h4>

        <div className="grid gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <InputSearchBar
              placeholder="Cari produk..."
              className="w-full sm:max-w-[500px]"
            />
          </div>

          <Table
            isHeaderSticky
            aria-label="products stocks table"
            color="primary"
            selectionMode="single"
            classNames={customStyleTable}
            className="scrollbar-hide"
          >
            <TableHeader columns={columnsProductsStocks}>
              {(column) => (
                <TableColumn key={column.uid}>{column.name}</TableColumn>
              )}
            </TableHeader>

            <TableBody items={produk.data.produk}>
              {(item) => (
                <TableRow key={item.kode_item}>
                  {(columnKey) => (
                    <TableCell>
                      {renderCellProductsStocks(item, columnKey, router)}
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
            page={produk.data.page}
            total={produk.data.total_page}
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
    url: "/produk",
    method: "GET",
  });

  const produk: ProdukType = result.data as ProdukType;

  return {
    props: {
      produk,
    },
  };
}) satisfies GetServerSideProps<{ produk: ProdukType }>;
