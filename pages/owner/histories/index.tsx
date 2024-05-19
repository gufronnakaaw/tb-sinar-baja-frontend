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

// components
import InputSearchBar from "@/components/input/InputSearchBar";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";
import {
  columnsTransaksi,
  renderCellTransaksi,
} from "@/headers/owner/histories";

// utils
import usePagination from "@/hooks/usepagination";
import { GlobalResponse } from "@/types/global.type";
import { TransaksiType } from "@/types/transactions.type";
import { customStyleTable } from "@/utils/customStyleTable";
import { fetcher } from "@/utils/fetcher";
import React, { useState } from "react";
import useSWR from "swr";

export default function HistoriesPage(
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

  return <SubComponentHistoriesPage {...{ transaksi: filter, setSearch }} />;
}

function SubComponentHistoriesPage({
  transaksi,
  setSearch,
}: {
  transaksi: TransaksiType[] | undefined;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { page, pages, data, setPage } = usePagination(
    transaksi ? transaksi : [],
    10,
  );
  const router = useRouter();

  return (
    <Layout title="Daftar Transaksi">
      <Container className="gap-8">
        <h4 className="text-lg font-semibold text-default-900">
          Riwayat Transaksi
        </h4>

        <div className="grid gap-4">
          <InputSearchBar
            placeholder="Cari ID Transaksi"
            className="w-full sm:max-w-[500px]"
            onChange={(e) => setSearch(e.target.value)}
          />

          <Table
            isHeaderSticky
            aria-label="transactions table"
            color="primary"
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
              {(transaction) => (
                <TableRow key={transaction.id_transaksi}>
                  {(columnKey) => (
                    <TableCell>
                      {renderCellTransaksi(transaction, columnKey, router)}
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
    url: "/transaksi",
    method: "GET",
  });

  const transaksi: GlobalResponse<TransaksiType[]> = result.data;

  return {
    props: {
      transaksi,
    },
  };
}) satisfies GetServerSideProps<{ transaksi: GlobalResponse<TransaksiType[]> }>;
