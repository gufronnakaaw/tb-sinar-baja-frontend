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
import { customStyleTable } from "@/utils/customStyleTable";
import { formatRupiah } from "@/utils/formatRupiah";

// dummy data
import { transactions } from "@/_dummy/transactions";

type TransactionType = (typeof transactions)[0];

export default function TransactionPage() {
  const router = useRouter();

  const { page, pages, data, setPage } = usePagination(transactions, 10);

  const columns = [
    { name: "ID Transaksi", uid: "transactions_id", sortable: false },
    { name: "Tanggal", uid: "transactions_date", sortable: true },
    { name: "Total", uid: "total", sortable: true },
    { name: "Aksi", uid: "action", sortable: false },
  ];

  const renderCell = (transaction: TransactionType, columnKey: React.Key) => {
    const cellValue = transaction[columnKey as keyof TransactionType];

    switch (columnKey) {
      case "transactions_id":
        return <div className="text-default-900">{transaction.id}</div>;
      case "transactions_date":
        return <div className="w-max text-default-900">{transaction.date}</div>;
      case "total":
        return (
          <div className="text-default-900">
            {formatRupiah(transaction.total)}
          </div>
        );
      case "action":
        return (
          <Button
            variant="bordered"
            color="default"
            size="sm"
            onClick={() => alert(`ID Transactions: ${transaction.id}`)}
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
                {(transaction) => (
                  <TableRow key={transaction.id}>
                    {(columnKey) => (
                      <TableCell>
                        {renderCell(transaction, columnKey)}
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
