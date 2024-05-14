import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";

// components
import InputSearchBar from "@/components/input/InputSearchBar";
import PopupImportProducts from "@/components/popup/PopupImportProducts";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";
import {
  columnsProduk,
  renderCellProduk,
} from "@/headers/owner/products/lists";

// utils
import { ProdukType } from "@/types/products.type";
import { customStyleTable } from "@/utils/customStyleTable";
import { fetcher } from "@/utils/fetcher";

export default function ProductsListsPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const [page, setPage] = useState(1);
  const router = useRouter();

  const {
    data: produk,
    error,
    isLoading,
    mutate,
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
        <h4 className="text-lg font-semibold text-default-900">
          Daftar Produk
        </h4>

        <div className="grid gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <InputSearchBar
              placeholder="Cari produk..."
              className="w-full sm:max-w-[500px]"
            />

            <PopupImportProducts {...{ mutate }} />
          </div>

          <Table
            isHeaderSticky
            aria-label="products table"
            color="primary"
            selectionMode="single"
            classNames={customStyleTable}
            className="scrollbar-hide"
          >
            <TableHeader columns={columnsProduk}>
              {(column) => (
                <TableColumn key={column.uid}>{column.name}</TableColumn>
              )}
            </TableHeader>

            <TableBody items={produk.data.produk}>
              {(item) => (
                <TableRow key={item.kode_item}>
                  {(columnKey) => (
                    <TableCell>
                      {renderCellProduk(item, columnKey, router)}
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
            total={produk.data.total_page}
            onChange={(e) => setPage(e)}
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
