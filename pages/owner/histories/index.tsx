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
import { Eye } from "@phosphor-icons/react";
import React from "react";

// components
import InputSearchBar from "@/components/input/InputSearchBar";
import CustomTooltip from "@/components/tooltip";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";

// utils
import usePagination from "@/hooks/usepagination";
import { customStyleTable } from "@/utils/customStyleTable";
import { formatRupiah } from "@/utils/formatRupiah";

// dummy data
import { transactions } from "@/_dummy/transactions";

type TransactionType = (typeof transactions)[0];

export default function HistoriesPage() {
  const { page, pages, data, setPage } = usePagination(transactions, 10);

  const columns = [
    { name: "ID Transaksi", uid: "transactions_id", sortable: false },
    { name: "Total", uid: "total", sortable: true },
    { name: "Tanggal", uid: "transactions_date", sortable: true },
    { name: "Aksi", uid: "action", sortable: false },
  ];

  const renderCell = (transaction: TransactionType, columnKey: React.Key) => {
    const cellValue = transaction[columnKey as keyof TransactionType];

    switch (columnKey) {
      case "transactions_id":
        return <div className="text-default-900">{transaction.id}</div>;
      case "total":
        return (
          <div className="w-max text-default-900">
            {formatRupiah(transaction.total)}
          </div>
        );
      case "transactions_date":
        return <div className="w-max text-default-900">{transaction.date}</div>;
      case "action":
        return (
          <CustomTooltip content="Detail">
            <Button
              isIconOnly
              variant="light"
              size="sm"
              onClick={() => alert(`ID Transactions ${transaction.id}`)}
            >
              <Eye weight="bold" size={20} className="text-default-600" />
            </Button>
          </CustomTooltip>
        );

      default:
        return cellValue;
    }
  };

  return (
    <Layout title="Transactions List">
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
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.uid}>{column.name}</TableColumn>
              )}
            </TableHeader>

            <TableBody items={data}>
              {(transaction) => (
                <TableRow key={transaction.id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(transaction, columnKey)}</TableCell>
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
