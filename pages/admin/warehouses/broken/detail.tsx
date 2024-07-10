// components
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";
import { BrokenDetailType } from "@/types/broken.type";
import { GlobalResponse } from "@/types/global.type";
import { customStyleTable } from "@/utils/customStyleTable";
import { fetcher } from "@/utils/fetcher";
import { formatDate } from "@/utils/formatDate";
import { formatRupiah } from "@/utils/formatRupiah";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { ArrowLeft } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";

type Harga = {
  harga_1: string;
  harga_2: string;
  harga_3: string;
  harga_4: string;
  harga_5: string;
  harga_6: string;
};

const translateHarga = {
  harga_pokok: "Harga Pokok",
  harga_1: "Harga Distributor",
  harga_2: "Harga Agen",
  harga_3: "Harga Grosir",
  harga_4: "Harga Toko",
  harga_5: "Harga Aplikator",
  harga_6: "Harga Retail",
};

export default function BrokenDetail({
  broken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  return (
    <Layout title={`Detail Berita Acara ${broken.id_ba}`}>
      <Container className="gap-8">
        <div className="grid gap-8">
          <Button
            variant="light"
            size="sm"
            startContent={<ArrowLeft weight="bold" size={16} />}
            onClick={() => router.back()}
            className="w-max font-semibold text-teal-500"
          >
            Kembali
          </Button>

          <div className="grid w-max gap-2 border-l-4 border-teal-500 p-[1rem_0_1rem_1rem]">
            <h4 className="text-[18px] font-bold text-default-900">
              Informasi Berita Acara
            </h4>

            <div className="grid gap-[2px]">
              <div className="grid grid-cols-[120px_10px_10fr]  gap-1 text-sm text-default-900">
                <div className="text-sm font-medium text-default-600">
                  ID Berita Acara
                </div>
                <div className="font-medium">:</div>
                <p className="font-bold text-teal-500">{broken.id_ba}</p>
              </div>
            </div>

            <div className="grid gap-[2px]">
              <div className="grid grid-cols-[120px_10px_10fr]  gap-1 text-sm text-default-900">
                <div className="text-sm font-medium text-default-600">
                  Dibuat pada
                </div>
                <div className="font-medium">:</div>
                <p className="font-bold text-teal-500">
                  {formatDate(broken.created_at)}
                </p>
              </div>
            </div>
          </div>

          <Table
            isHeaderSticky
            aria-label="broken table"
            color="default"
            selectionMode="none"
            classNames={customStyleTable}
            className="scrollbar-hide"
          >
            <TableHeader>
              <TableColumn>Jumlah</TableColumn>
              <TableColumn>Kode Item</TableColumn>
              <TableColumn>Nama Produk</TableColumn>
              <TableColumn>Keterangan</TableColumn>
              <TableColumn>Landasan Harga</TableColumn>
              <TableColumn>Harga</TableColumn>
              <TableColumn>Subtotal</TableColumn>
            </TableHeader>
            <TableBody items={broken.list_produk}>
              {(item) => (
                <TableRow key={item.kode_item}>
                  <TableCell>
                    {item.jumlah} {item.satuan}
                  </TableCell>
                  <TableCell>{item.kode_item}</TableCell>
                  <TableCell>{item.nama_produk}</TableCell>
                  <TableCell className="capitalize">{item.alasan}</TableCell>
                  <TableCell>
                    {translateHarga[item.tipe_harga as keyof Harga]} (
                    {item.tipe_harga})
                  </TableCell>
                  <TableCell>{formatRupiah(item.harga)}</TableCell>
                  <TableCell>{formatRupiah(item.total)}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <div className="grid justify-self-end p-2">
            <div className="grid grid-cols-[120px_6px_1fr] gap-1 text-[12px] text-black">
              <div className="font-medium">Estimasi Kerugian</div>
              <div className="font-medium">:</div>
              <p className="font-medium">
                {formatRupiah(
                  broken.list_produk.reduce((a, b) => a + b.total, 0),
                )}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
}

export const getServerSideProps = (async ({ query }) => {
  const result: GlobalResponse<BrokenDetailType> = await fetcher({
    url: "/beritaacara?id_ba=" + query?.id_ba,
    method: "GET",
  });

  return {
    props: {
      broken: result.data,
    },
  };
}) satisfies GetServerSideProps<{ broken: BrokenDetailType }>;
