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
import React from "react";

// components
import InputSearchBar from "@/components/input/InputSearchBar";
import Layout from "@/components/wrapper/SecondaryLayout";

// utils
import usePagination from "@/hooks/usepagination";
import { TransaksiType } from "@/types/transactions.type";
import { customStyleTable } from "@/utils/customStyleTable";
import { fetcher } from "@/utils/fetcher";
import { formatDate } from "@/utils/formatDate";
import { formatRupiah } from "@/utils/formatRupiah";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export default function TransactionPage({
  transaksi,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const { page, pages, data, setPage } = usePagination(transaksi, 10);

  const columns = [
    { name: "ID Transaksi", uid: "transactions_id", sortable: false },
    { name: "Tanggal", uid: "transactions_date", sortable: true },
    { name: "Total", uid: "total", sortable: true },
    { name: "Aksi", uid: "action", sortable: false },
  ];

  const renderCell = (transaction: TransaksiType, columnKey: React.Key) => {
    const cellValue = transaction[columnKey as keyof TransaksiType];

    switch (columnKey) {
      case "transactions_id":
        return (
          <div className="text-default-900">{transaction.id_transaksi}</div>
        );
      case "transactions_date":
        return (
          <div className="w-max text-default-900">
            {formatDate(transaction.created_at)}
          </div>
        );
      case "total":
        return (
          <div className="text-default-900">
            {formatRupiah(transaction.total_pembayaran)}
          </div>
        );
      case "action":
        return (
          <Button
            variant="bordered"
            color="default"
            size="sm"
            onClick={() =>
              alert(`ID Transactions: ${transaction.id_transaksi}`)
            }
            className="font-medium"
          >
            Detail
          </Button>
        );

      default:
        return cellValue;
    }
  };

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
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn key={column.uid}>{column.name}</TableColumn>
                )}
              </TableHeader>

              <TableBody items={data}>
                {(transaksi) => (
                  <TableRow key={transaksi.id_transaksi}>
                    {(columnKey) => (
                      <TableCell>{renderCell(transaksi, columnKey)}</TableCell>
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
