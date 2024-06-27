import ButtonBack from "@/components/button/ButtonBack";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";
import { GlobalResponse } from "@/types/global.type";
import { InvoiceDetailType } from "@/types/invoice.type";
import { InvoutType } from "@/types/invoices.type";
import { customStyleTable } from "@/utils/customStyleTable";
import { fetcher } from "@/utils/fetcher";
import { formatDate } from "@/utils/formatDate";
import { formatRupiah } from "@/utils/formatRupiah";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";

export const getServerSideProps = (async ({ query }) => {
  const invout: GlobalResponse<InvoutType> = await fetcher({
    url: "/invoice/out?id_invoice=" + query?.id_invoice,
    method: "GET",
  });

  return {
    props: {
      invout: invout.data,
    },
  };
}) satisfies GetServerSideProps<{ invout: InvoutType }>;

export default function InvoutHistories({
  invout,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const columnsInvoice = [
    { name: "ID Transaksi Bank", uid: "id_transaksi" },
    { name: "Nama Bank", uid: "nama_bank" },
    { name: "Atas Nama", uid: "atas_nama" },
    { name: "Tipe", uid: "tipe" },
    { name: "Jumlah", uid: "jumlah" },
    { name: "Dibayar pada", uid: "created_at" },
  ];

  const renderCellInvoice = (item: InvoiceDetailType, columnKey: React.Key) => {
    const cellValue = item[columnKey as keyof InvoiceDetailType];

    switch (columnKey) {
      case "id_transaksi":
        return (
          <div className="text-default-900">
            {!item.id_transaksi ? "-" : item.id_transaksi}
          </div>
        );
      case "nama_bank":
        return (
          <div className="text-default-900">
            {!item.nama_bank ? "-" : item.nama_bank}
          </div>
        );
      case "atas_nama":
        return (
          <div className="text-default-900">
            {!item.atas_nama ? "-" : item.atas_nama}
          </div>
        );
      case "tipe":
        return <div className="text-default-900">{item.tipe}</div>;
      case "jumlah":
        return (
          <div className="text-default-900">{formatRupiah(item.jumlah)}</div>
        );
      case "created_at":
        return (
          <div className="text-default-900">{formatDate(item.created_at)}</div>
        );
      default:
        return cellValue;
    }
  };

  return (
    <Layout title={`Riwayat Pembayaran ${invout.id_invoice}`}>
      <Container className="gap-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <ButtonBack onClick={() => router.back()}>Kembali</ButtonBack>
        </div>

        <div className="grid w-max gap-2 border-l-4 border-primary p-[1rem_0_1rem_1rem]">
          <h4 className="text-[18px] font-bold text-default-900">
            Informasi Invoice
          </h4>

          <div className="grid gap-[2px]">
            <div className="grid grid-cols-[170px_10px_10fr]  gap-1 text-sm text-default-900">
              <div className="text-sm font-medium text-default-600">
                ID Invoice Keluar
              </div>
              <div className="font-medium">:</div>
              <p className="font-bold text-primary">{invout.id_invoice}</p>
            </div>
            <div className="grid grid-cols-[170px_10px_10fr]  gap-1 text-sm text-default-900">
              <div className="text-sm font-medium text-default-600">
                ID Transaksi
              </div>
              <div className="font-medium">:</div>
              <p className="font-bold text-primary">
                {invout.transaksi.id_transaksi}
              </p>
            </div>
            <div className="grid grid-cols-[170px_10px_10fr]  gap-1 text-sm text-default-900">
              <div className="text-sm font-medium text-default-600">
                Nama Pembeli
              </div>
              <div className="font-medium">:</div>
              <p className="font-bold text-primary">
                {invout.transaksi.penerima}
              </p>
            </div>
            <div className="grid grid-cols-[170px_10px_10fr]  gap-1 text-sm text-default-900">
              <div className="text-sm font-medium text-default-600">Metode</div>
              <div className="font-medium">:</div>
              <p className="font-bold capitalize text-primary">
                {invout.transaksi.metode == "tempo"
                  ? "Preorder"
                  : invout.transaksi.metode}
              </p>
            </div>
            <div className="grid grid-cols-[170px_10px_10fr]  gap-1 text-sm text-default-900">
              <div className="text-sm font-medium text-default-600">Status</div>
              <div className="font-medium">:</div>
              <p className="font-bold capitalize text-primary">
                {invout.transaksi.status == "piutang"
                  ? "Belum Lunas"
                  : invout.transaksi.status}
              </p>
            </div>
          </div>
        </div>

        <h4 className="text-lg font-semibold text-default-900">
          Riwayat Pembayaran
        </h4>

        <Table
          isHeaderSticky
          aria-label="histories table"
          color="default"
          selectionMode="none"
          classNames={customStyleTable}
          className="scrollbar-hide"
        >
          <TableHeader columns={columnsInvoice}>
            {(column) => (
              <TableColumn key={column.uid}>{column.name}</TableColumn>
            )}
          </TableHeader>

          <TableBody
            items={invout.invoicekeluardetail}
            emptyContent="Riwayat pembayaran tidak ditemukan!"
          >
            {(item) => (
              <TableRow key={item.id_transaksi}>
                {(columnKey) => (
                  <TableCell>{renderCellInvoice(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="grid justify-end">
          <div className="grid w-[220px] grid-cols-[100px_6px_1fr] gap-1 text-[14px] text-black">
            <div className="font-medium">Tagihan</div>
            <div className="font-medium">:</div>
            <p className="font-medium">{formatRupiah(invout.tagihan)}</p>
          </div>
          <div className="grid w-[220px] grid-cols-[100px_6px_1fr] gap-1 text-[14px] text-black">
            <div className="font-medium">Total Dibayar</div>
            <div className="font-medium">:</div>
            <p className="font-medium">
              {formatRupiah(
                invout.transaksi.metode == "tempo"
                  ? invout.invoicekeluardetail.reduce((a, b) => a + b.jumlah, 0)
                  : invout.tagihan,
              )}
            </p>
          </div>
          <div className="grid w-[220px] grid-cols-[100px_6px_1fr] gap-1 text-[14px] text-black">
            <div className="font-medium">Sisa</div>
            <div className="font-medium">:</div>
            <p className="font-medium">{formatRupiah(invout.sisa)}</p>
          </div>
        </div>
      </Container>
    </Layout>
  );
}
