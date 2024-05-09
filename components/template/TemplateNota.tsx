import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";

// utils
import { customStyleTable } from "@/utils/customStyleTable";
import { formatRupiah } from "@/utils/formatRupiah";

type NotaProps = {
  id: number;
  product_name: string;
  amount: number | string;
  price: number;
  total: number;
};

// dummy data
const transactions: NotaProps[] = [
  {
    id: 1,
    product_name: "C-truss Mini SNI tbl KD 10",
    amount: "3 btg",
    price: 93577,
    total: 280750,
  },
  {
    id: 2,
    product_name: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    amount: "6 lbr",
    price: 110372,
    total: 662250,
  },
];

export default function TemplateNota() {
  const columns = [
    { name: "Jumlah", uid: "amount" },
    { name: "Nama Produk", uid: "product_name" },
    { name: "Harga", uid: "price" },
    { name: "Total", uid: "total" },
  ];

  const renderCell = (transaction: NotaProps, columnKey: React.Key) => {
    const cellValue = transaction[columnKey as keyof NotaProps];

    switch (columnKey) {
      case "amount":
        return (
          <div className="font-semibold text-default-900">
            {transaction.amount}
          </div>
        );
      case "product_name":
        return (
          <div className="max-w-[300px] font-semibold text-default-900">
            {transaction.product_name}
          </div>
        );
      case "price":
        return (
          <div className="font-semibold text-default-900">
            {formatRupiah(transaction.price)}
          </div>
        );
      case "total":
        return (
          <div className="font-semibold text-default-900">
            {formatRupiah(transaction.total)}
          </div>
        );

      default:
        return cellValue;
    }
  };

  return (
    <div className="grid gap-16 pt-8">
      <h4 className="text-center text-2xl font-bold uppercase text-black">
        Nota
      </h4>

      <div className="grid grid-cols-2 items-start gap-8">
        <div className="grid gap-1">
          <div className="grid grid-cols-[30px_6px_1fr] gap-1 text-sm text-default-900">
            <div className="font-semibold">No</div>
            <div className="font-semibold">:</div>
            <p className="font-semibold">SB.816824676735</p>
          </div>

          <div className="grid grid-cols-[30px_6px_1fr] gap-1 text-sm text-default-900">
            <div className="font-semibold">Tgl</div>
            <div className="font-semibold">:</div>
            <p className="font-semibold">3 Mei 2024</p>
          </div>

          <div className="grid grid-cols-[30px_6px_1fr] gap-1 text-sm text-default-900">
            <div className="font-semibold">Ket</div>
            <div className="font-semibold">:</div>
            <p className="font-semibold">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse,
              est?
            </p>
          </div>
        </div>

        <div className="grid gap-1">
          <div className="grid grid-cols-[80px_6px_1fr] gap-1 text-sm text-default-900">
            <div className="font-semibold">Penerima</div>
            <div className="font-semibold">:</div>
            <p className="font-semibold">Umum</p>
          </div>

          <div className="grid grid-cols-[80px_6px_1fr] gap-1 text-sm text-default-900">
            <div className="font-semibold">No. Telp</div>
            <div className="font-semibold">:</div>
            <p className="font-semibold">0891234567890</p>
          </div>

          <div className="grid grid-cols-[80px_6px_1fr] gap-1 text-sm text-default-900">
            <div className="font-semibold">Alamat</div>
            <div className="font-semibold">:</div>
            <p className="font-semibold">
              TB. Sinar Baja - Jl. Letjend Sutoyo No.67, Burengan, Kec.
              Pesantren, Kabupaten Kediri, Jawa Timur 64131
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        <Table
          isHeaderSticky
          aria-label="nota table"
          selectionMode="single"
          classNames={customStyleTable}
          className="scrollbar-hide"
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid}>{column.name}</TableColumn>
            )}
          </TableHeader>

          <TableBody items={transactions}>
            {(transaction) => (
              <TableRow key={transaction.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(transaction, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="grid gap-1 justify-self-end rounded-xl border-[2px] border-default-200 p-4">
          <div className="grid grid-cols-[100px_6px_1fr] gap-1 text-sm text-default-900">
            <div className="w-24 font-semibold">Total</div>
            <div className="font-semibold">:</div>
            <p className="font-semibold">943.000</p>
          </div>

          <div className="grid grid-cols-[100px_6px_1fr] gap-1 text-sm text-default-900">
            <div className="w-24 font-semibold">Ongkir</div>
            <div className="font-semibold">:</div>
            <p className="font-semibold">25.000</p>
          </div>

          <div className="grid grid-cols-[100px_6px_1fr] gap-1 text-sm text-default-900">
            <div className="w-24 font-semibold">Tagihan</div>
            <div className="font-semibold">:</div>
            <p className="font-semibold">968.000</p>
          </div>
        </div>
      </div>
    </div>
  );
}
