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
import { TransaksiType } from "@/types/transactions.type";
import { customStyleTable } from "@/utils/customStyleTable";
import { fetcher } from "@/utils/fetcher";

export default function HistoriesPage({
  transaksi,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { page, pages, data, setPage } = usePagination(transaksi, 10);
  const router = useRouter();

  return (
    <Layout title="Daftar Transaksi">
      <Container className="gap-8">
        <h4 className="text-lg font-semibold text-default-900">
          Riwayat Transaksi
        </h4>

        <div className="grid gap-4">
          <InputSearchBar
            placeholder="Cari transaksi..."
            className="w-full sm:max-w-[500px]"
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

  const transaksi: TransaksiType[] = result.data as TransaksiType[];

  return {
    props: {
      transaksi,
    },
  };
}) satisfies GetServerSideProps<{ transaksi: TransaksiType[] }>;
