import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

// utils
import { formatRupiah } from "@/utils/formatRupiah";

type FakturProps = {
  id: number;
  nama_produk: string;
  jumlah: number | string;
  harga: number;
  subtotal: number;
};

// dummy data
const transactions: FakturProps[] = [
  {
    id: 1,
    nama_produk: "C-truss Mini SNI tbl KD 10",
    jumlah: "3 btg",
    harga: 93577,
    subtotal: 280750,
  },
  {
    id: 2,
    nama_produk: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    jumlah: "6 lbr",
    harga: 110372,
    subtotal: 662250,
  },
];

export default function TemplateFaktur() {
  const columns = [
    { name: "Jumlah", uid: "jumlah" },
    { name: "Nama Produk", uid: "nama_produk" },
    { name: "Harga", uid: "harga" },
    { name: "Sub Total", uid: "subtotal" },
  ];

  const renderCell = (transaction: FakturProps, columnKey: React.Key) => {
    const cellValue = transaction[columnKey as keyof FakturProps];

    switch (columnKey) {
      case "jumlah":
        return (
          <div className="text-[10px] font-medium text-default-900">
            {transaction.jumlah}
          </div>
        );
      case "nama_produk":
        return (
          <div className="max-w-[300px] text-[10px] font-medium text-default-900">
            {transaction.nama_produk}
          </div>
        );
      case "harga":
        return (
          <div className="text-[10px] font-medium text-default-900">
            {formatRupiah(transaction.harga)}
          </div>
        );
      case "subtotal":
        return (
          <div className="text-[10px] font-medium text-default-900">
            {formatRupiah(transaction.subtotal)}
          </div>
        );

      default:
        return cellValue;
    }
  };

  return (
    <div className="container grid gap-8 px-20 pt-12 font-inter">
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
          Faktur
        </h4>
      </div>

      <div className="grid w-full grid-cols-2 items-start gap-8">
        <div className="grid">
          <div className="grid grid-cols-[30px_6px_1fr] gap-1 text-[10px] text-default-900">
            <div className="font-medium">No</div>
            <div className="font-medium">:</div>
            <p className="font-medium">TX1005202401</p>
          </div>

          <div className="grid grid-cols-[30px_6px_1fr] gap-1 text-[10px] text-default-900">
            <div className="font-medium">Tgl</div>
            <div className="font-medium">:</div>
            <p className="font-medium">10 Mei 2024</p>
          </div>

          <div className="grid w-[250px] grid-cols-[30px_6px_1fr] gap-1 text-[10px] text-default-900">
            <div className="font-medium">Ket</div>
            <div className="font-medium">:</div>
            <p className="break-all font-medium">Pengiriman Barang Bangunan</p>
          </div>
        </div>

        <div className="grid">
          <div className="grid grid-cols-[65px_6px_1fr] gap-1 text-[10px] text-default-900">
            <div className="font-medium">Penerima</div>
            <div className="font-medium">:</div>
            <p className="font-medium">Fajar Fadillah Agustian</p>
          </div>

          <div className="grid grid-cols-[65px_6px_1fr] gap-1 text-[10px] text-default-900">
            <div className="font-medium">No. Telp</div>
            <div className="font-medium">:</div>
            <p className="font-medium">089123456789</p>
          </div>

          <div className="grid grid-cols-[65px_6px_1fr] gap-1 text-[10px] text-default-900">
            <div className="font-medium">Pengiriman</div>
            <div className="font-medium">:</div>
            <p className="font-medium">Besok Pagi</p>
          </div>

          <div className="grid grid-cols-[65px_6px_1fr] gap-1 text-[10px] text-default-900">
            <div className="font-medium">Alamat</div>
            <div className="font-medium">:</div>
            <p className="break-all font-medium">
              Jl. Pertanian, Grogol, Kota depk
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        <Table
          isHeaderSticky
          aria-label="nota table"
          classNames={{
            base: ["max-h-[calc(100vh-100px)] overflow-scroll"],
            table: ["border border-black"],
            thead: [
              "[&>tr]:first:rounded-none [&>tr]:first:shadow-none border-b border-black",
            ],
            th: [
              "px-5 h-[14px] first:rounded-none last:rounded-none bg-transparent text-default-600",
            ],
            td: ["px-5 py-0 h-[14px]"],
          }}
          className="scrollbar-hide"
          removeWrapper
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

        <div className="grid justify-self-end border border-black p-2">
          <div className="grid grid-cols-[60px_6px_1fr] gap-1 text-[10px] text-default-900">
            <div className="w-24 font-medium">Total</div>
            <div className="font-medium">:</div>
            <p className="font-medium">Rp 350.000</p>
          </div>

          <div className="grid grid-cols-[60px_6px_1fr] gap-1 text-[10px] text-default-900">
            <div className="w-24 font-medium">Ongkir</div>
            <div className="font-medium">:</div>
            <p className="font-medium">Rp 45.000</p>
          </div>

          <div className="grid grid-cols-[60px_6px_1fr] gap-1 text-[10px] text-default-900">
            <div className="w-24 font-medium">Pajak (10%)</div>
            <div className="font-medium">:</div>
            <p className="font-medium">Rp 100.000</p>
          </div>

          <div className="grid grid-cols-[60px_6px_1fr] gap-1 text-[10px] text-default-900">
            <div className="w-24 font-medium">Tagihan</div>
            <div className="font-medium">:</div>
            <p className="font-medium">Rp 400.000</p>
          </div>
        </div>
      </div>
    </div>
  );
}
