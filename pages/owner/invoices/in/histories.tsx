import ButtonBack from "@/components/button/ButtonBack";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";
import { GlobalResponse } from "@/types/global.type";
import { InvoiceDetail, InvoiceDetailType } from "@/types/invoice.type";
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
  const invoice: GlobalResponse<InvoiceDetail> = await fetcher({
    url: "/invoice?id_invoice=" + query?.id_invoice,
    method: "GET",
  });

  return {
    props: {
      invoice: invoice.data,
    },
  };
}) satisfies GetServerSideProps<{ invoice: InvoiceDetail }>;

export default function InvoiceHistories({
  invoice,
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
    <Layout title={`Riwayat Pembayaran ${invoice.id_invoice}`}>
      <Container className="gap-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <ButtonBack onClick={() => router.push("/owner/invoices/in")}>
            Kembali
          </ButtonBack>
        </div>

        <div className="grid w-max gap-2 border-l-4 border-primary p-[1rem_0_1rem_1rem]">
          <h4 className="text-[18px] font-bold text-default-900">
            Informasi Invoice
          </h4>

          <div className="grid gap-[2px]">
            <div className="grid grid-cols-[170px_10px_10fr]  gap-1 text-sm text-default-900">
              <div className="text-sm font-medium text-default-600">
                Nomor Invoice
              </div>
              <div className="font-medium">:</div>
              <p className="font-bold text-primary">{invoice.nomor_invoice}</p>
            </div>
            <div className="grid grid-cols-[170px_10px_10fr]  gap-1 text-sm text-default-900">
              <div className="text-sm font-medium text-default-600">
                ID Preorder
              </div>
              <div className="font-medium">:</div>
              <p className="font-bold text-primary">{invoice.preorder_id}</p>
            </div>
            <div className="grid grid-cols-[170px_10px_10fr]  gap-1 text-sm text-default-900">
              <div className="text-sm font-medium text-default-600">
                Tujuan Preorder
              </div>
              <div className="font-medium">:</div>
              <p className="font-bold text-primary">{invoice.nama_supplier}</p>
            </div>
            <div className="grid grid-cols-[170px_10px_10fr]  gap-1 text-sm text-default-900">
              <div className="text-sm font-medium text-default-600">
                Sumber Preorder
              </div>
              <div className="font-medium">:</div>
              <p className="font-bold text-primary capitalize">
                {invoice.sumber.split("_").join(" ")}
              </p>
            </div>
          </div>
        </div>

        <h4 className="text-lg font-semibold text-default-900">
          Riwayat Pembayaran
        </h4>

        <Table
          isHeaderSticky
          aria-label="po table"
          color="primary"
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
            items={invoice.invoicedetail}
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
            <p className="font-medium">{formatRupiah(invoice.tagihan)}</p>
          </div>
          <div className="grid w-[220px] grid-cols-[100px_6px_1fr] gap-1 text-[14px] text-black">
            <div className="font-medium">Total Dibayar</div>
            <div className="font-medium">:</div>
            <p className="font-medium">
              {formatRupiah(
                invoice.invoicedetail.reduce((a, b) => a + b.jumlah, 0),
              )}
            </p>
          </div>
          <div className="grid w-[220px] grid-cols-[100px_6px_1fr] gap-1 text-[14px] text-black">
            <div className="font-medium">Sisa</div>
            <div className="font-medium">:</div>
            <p className="font-medium">
              {formatRupiah(
                invoice.tagihan -
                  invoice.invoicedetail.reduce((a, b) => a + b.jumlah, 0),
              )}
            </p>
          </div>
        </div>
      </Container>
    </Layout>
  );
}
