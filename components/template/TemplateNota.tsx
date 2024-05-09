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
          <div className="text-[10px] font-medium text-default-900">
            {transaction.amount}
          </div>
        );
      case "product_name":
        return (
          <div className="max-w-[300px] text-[10px] font-medium text-default-900">
            {transaction.product_name}
          </div>
        );
      case "price":
        return (
          <div className="text-[10px] font-medium text-default-900">
            {formatRupiah(transaction.price)}
          </div>
        );
      case "total":
        return (
          <div className="text-[10px] font-medium text-default-900">
            {formatRupiah(transaction.total)}
          </div>
        );

      default:
        return cellValue;
    }
  };

  return (
    <div className="grid gap-8 pt-8">
      <div className="grid grid-cols-3 gap-4">
        <div className="grid gap-1">
          <h1 className="font-bold text-default-900">TB. Sinar Baja</h1>
          <p className="max-w-[400px] text-[10px] font-medium text-default-600">
            Jl. Letjend Sutoyo No.67, Burengan, Kec. Pesantren, Kabupaten
            Kediri, Jawa Timur 64131
          </p>
          <p className="max-w-[300px] text-[10px] font-medium text-default-600">
            (+62) 21 3456 7890
          </p>
        </div>

        <h4 className="text-center text-xl font-bold uppercase text-black">
          Nota
        </h4>
      </div>

      <div className="grid grid-cols-2 items-start gap-8">
        <div className="grid gap-1">
          <div className="grid grid-cols-[30px_6px_1fr] gap-1 text-[10px] text-default-900">
            <div className="font-medium">No</div>
            <div className="font-medium">:</div>
            <p className="font-medium">SB.816824676735</p>
          </div>

          <div className="grid grid-cols-[30px_6px_1fr] gap-1 text-[10px] text-default-900">
            <div className="font-medium">Tgl</div>
            <div className="font-medium">:</div>
            <p className="font-medium">3 Mei 2024</p>
          </div>

          <div className="grid grid-cols-[30px_6px_1fr] gap-1 text-[10px] text-default-900">
            <div className="font-medium">Ket</div>
            <div className="font-medium">:</div>
            <p className="font-medium">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse,
              est?
            </p>
          </div>
        </div>

        <div className="grid gap-1">
          <div className="grid grid-cols-[100px_6px_1fr] gap-1 text-[10px] text-default-900">
            <div className="font-medium">Penerima</div>
            <div className="font-medium">:</div>
            <p className="font-medium">Umum</p>
          </div>

          <div className="grid grid-cols-[100px_6px_1fr] gap-1 text-[10px] text-default-900">
            <div className="font-medium">No. Telp</div>
            <div className="font-medium">:</div>
            <p className="font-medium">0891234567890</p>
          </div>

          <div className="grid grid-cols-[100px_6px_1fr] gap-1 text-[10px] text-default-900">
            <div className="font-medium">Pengiriman</div>
            <div className="font-medium">:</div>
            <p className="font-medium">Pagi</p>
          </div>

          <div className="grid grid-cols-[100px_6px_1fr] gap-1 text-[10px] text-default-900">
            <div className="font-medium">Alamat</div>
            <div className="font-medium">:</div>
            <p className="font-medium">
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
          <div className="grid grid-cols-[100px_6px_1fr] gap-1 text-[10px] text-default-900">
            <div className="w-24 font-medium">Total</div>
            <div className="font-medium">:</div>
            <p className="font-medium">943.000</p>
          </div>

          <div className="grid grid-cols-[100px_6px_1fr] gap-1 text-[10px] text-default-900">
            <div className="w-24 font-medium">Ongkir</div>
            <div className="font-medium">:</div>
            <p className="font-medium">25.000</p>
          </div>

          <div className="grid grid-cols-[100px_6px_1fr] gap-1 text-[10px] text-default-900">
            <div className="w-24 font-medium">Tagihan</div>
            <div className="font-medium">:</div>
            <p className="font-medium">968.000</p>
          </div>
        </div>
      </div>
    </div>
  );
}
