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

// utils
import usePagination from "@/hooks/usepagination";
import { customStyleTable } from "@/utils/customStyleTable";

import {
  columnsSubKategori,
  renderCellSubKategori,
} from "@/headers/admin/subkategori";
import { fetcher } from "@/utils/fetcher";
import { ArrowLeft } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export default function ProductsSubCategoriesPage({
  subkategori,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { page, pages, data, setPage } = usePagination(
    subkategori.subkategori,
    10,
  );
  const router = useRouter();

  return (
    <Layout title="Sub Produk Kategori">
      <Container className="gap-20">
        <div className="grid gap-8">
          <Button
            variant="light"
            color="primary"
            size="sm"
            startContent={<ArrowLeft weight="bold" size={16} />}
            onClick={() => router.push("/owner/products/categories")}
            className="w-max font-semibold"
          >
            Kembali
          </Button>

          <h4 className="text-lg font-semibold text-default-900">
            Sub Kategori {subkategori.nama}
          </h4>

          <div className="grid gap-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <InputSearchBar
                placeholder="Cari Sub Kategori..."
                className="w-full sm:max-w-[500px]"
              />

              <Button
                variant="solid"
                color="primary"
                className="w-full font-medium sm:w-max"
              >
                Buat Sub Kategori
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
              <TableHeader columns={columnsSubKategori}>
                {(column) => (
                  <TableColumn key={column.uid}>{column.name}</TableColumn>
                )}
              </TableHeader>

              <TableBody items={data}>
                {(item) => (
                  <TableRow key={item.id_subkategori}>
                    {(columnKey) => (
                      <TableCell>
                        {renderCellSubKategori(item, columnKey, router)}
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

export const getServerSideProps = (async ({ params }) => {
  const result = await fetcher({
    url: "/kategori?id=" + params.id,
    method: "GET",
  });

  const subkategori: {
    id_subkategori: number;
    nama: string;
    created_at: string;
  }[] = result.data as {
    id_subkategori: number;
    nama: string;
    created_at: string;
  }[];

  return {
    props: {
      subkategori,
    },
  };
}) satisfies GetServerSideProps<{
  subkategori: { id_subkategori: number; nama: string; created_at: string }[];
}>;
