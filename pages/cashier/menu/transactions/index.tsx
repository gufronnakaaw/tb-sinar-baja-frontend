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
import { ArrowLeft } from "@phosphor-icons/react";
import { useRouter } from "next/router";

// components
import InputSearchBar from "@/components/input/InputSearchBar";
import Layout from "@/components/wrapper/SecondaryLayout";

// utils
import {
  columnsTransaksi,
  renderCellTransaksi,
} from "@/headers/cashier/transactions";
import usePagination from "@/hooks/usepagination";
import { TransaksiType } from "@/types/transactions.type";
import { customStyleTable } from "@/utils/customStyleTable";
import { fetcher } from "@/utils/fetcher";

import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export default function TransactionPage({
  transaksi,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { page, pages, data, setPage } = usePagination(transaksi, 10);

  return (
    <Layout title="Transactions List">
      <section className="py-24">
        <div className="container mt-8 grid gap-8">
          <Button
            variant="light"
            color="danger"
            size="sm"
            startContent={<ArrowLeft weight="bold" size={16} />}
            onClick={() => router.push("/cashier/menu")}
            className="w-max font-semibold"
          >
            Kembali ke Menu
          </Button>

          <div className="grid gap-4">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h4 className="text-center text-lg font-semibold text-default-900">
                Daftar Transaksi
              </h4>

              <InputSearchBar
                placeholder="Cari transaksi..."
                className="w-full sm:max-w-[500px]"
              />
            </div>

            <Table
              isHeaderSticky
              aria-label="transactions table"
              color="danger"
              selectionMode="single"
              classNames={customStyleTable}
              className="scrollbar-hide"
            >
              <TableHeader columns={columnsTransaksi}>
                {(column) => (
                  <TableColumn key={column.uid}>{column.name}</TableColumn>
                )}
              </TableHeader>

              <TableBody items={data}>
                {(transaksi) => (
                  <TableRow key={transaksi.id_transaksi}>
                    {(columnKey) => (
                      <TableCell>
                        {renderCellTransaksi(transaksi, columnKey, router)}
                      </TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <Pagination
              isCompact
              showControls
              color="danger"
              page={page}
              total={pages}
              onChange={setPage}
              className="justify-self-center"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getServerSideProps = (async () => {
  const result = await fetcher({
    url: "/transaksi",
    method: "GET",
  });

  const transaksi: TransaksiType[] = result.data as TransaksiType[];

  return {
    props: {
      transaksi,
    },
  };
}) satisfies GetServerSideProps<{ transaksi: TransaksiType[] }>;
