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

import { GlobalResponse } from "@/types/global.type";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useState } from "react";
import useSWR from "swr";

export default function TransactionsPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const [search, setSearch] = useState("");
  const swr = useSWR<GlobalResponse<TransaksiType[]>>(
    {
      url: "/transaksi",
      method: "GET",
    },
    fetcher,
    {
      fallbackData: props.transaksi,
      refreshInterval: 15000,
    },
  );

  if (swr.isLoading) {
    return;
  }

  if (swr.error) {
    console.log(swr.error);
  }

  const filter = swr.data?.data.filter((item) => {
    return item.id_transaksi.toLowerCase().includes(search.toLowerCase());
  });

  return <SubComponentTransactionsPage {...{ transaksi: filter, setSearch }} />;
}

function SubComponentTransactionsPage({
  transaksi,
  setSearch,
}: {
  transaksi: TransaksiType[] | undefined;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) {
  const router = useRouter();
  const { page, pages, data, setPage } = usePagination(
    transaksi ? transaksi : [],
    10,
  );

  return (
    <Layout title="Daftar Transaksi">
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
                placeholder="Cari ID Transaksi"
                className="w-full sm:max-w-[500px]"
                onChange={(e) => setSearch(e.target.value)}
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

  const transaksi: GlobalResponse<TransaksiType[]> = result;

  return {
    props: {
      transaksi,
    },
  };
}) satisfies GetServerSideProps<{ transaksi: GlobalResponse<TransaksiType[]> }>;
