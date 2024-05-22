import { Button } from "@nextui-org/react";
import { Check, Printer, SealCheck } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

// components & utils
import ButtonBack from "@/components/button/ButtonBack";
import { TemplateSuratJalan } from "@/components/template/TemplateSuratJalan";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";
import { fetcher } from "@/utils/fetcher";

export type DocumentResponse = {
  id_suratjalan: string;
  nama_driver: string;
  kendaraan: string;
  plat_kendaraan: string;
  verifikasi: boolean;
  transaksi: {
    id_transaksi: string;
    created_at: string;
    penerima: string;
    alamat: string;
    keterangan: string;
    no_telp: string;
    transaksidetail: TransaksiDetail[];
  };
};

export type TransaksiDetail = {
  jumlah: number;
  satuan: string;
  nama_produk: string;
  gudang: string;
  rak: string;
};

export default function DocumentDetails({
  documents,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    documentTitle: documents.id_suratjalan,
    content: () => componentRef.current,
  });

  async function handleVerifikasi() {
    if (!confirm("apakah anda yakin ingin memverifikasi surat jalan ini"))
      return;

    try {
      await fetcher({
        url: "/suratjalan",
        method: "PATCH",
        data: {
          id_suratjalan: documents.id_suratjalan,
          verifikasi: true,
        },
      });
      alert("verifikasi berhasil");
      return router.reload();
    } catch (error) {
      alert("ups sepertinya ada masalah pada server");
      console.log(error);
    }
  }

  return (
    <Layout title={`Detail Dokumen ${documents.id_suratjalan}`}>
      <Container className="gap-8">
        <div className="flex items-center justify-between gap-4">
          <ButtonBack
            onClick={() => router.push("/owner/warehouses/documents")}
          >
            Kembali
          </ButtonBack>

          <div className="flex items-center gap-4 justify-self-end">
            {!documents.verifikasi ? (
              <Button
                variant="solid"
                color="success"
                endContent={<Check weight="bold" size={17} />}
                onClick={handleVerifikasi}
                className="font-semibold text-white"
              >
                Verifikasi
              </Button>
            ) : (
              <div className="flex items-center gap-1">
                <SealCheck className="text-success" weight="fill" size={20} />
                <span className="text-sm font-medium text-default-600">
                  Terverifikasi
                </span>
              </div>
            )}

            <Button
              variant="solid"
              color="primary"
              endContent={<Printer weight="bold" size={16} />}
              onClick={handlePrint}
              className="font-semibold"
            >
              Cetak Dokumen
            </Button>
          </div>
        </div>

        <TemplateSuratJalan {...documents} ref={componentRef} />
      </Container>
    </Layout>
  );
}

export const getServerSideProps = (async ({ params }) => {
  const result = await fetcher({
    url: "/suratjalan?id=" + params?.id,
    method: "GET",
  });

  const documents: DocumentResponse = result.data as DocumentResponse;

  return {
    props: {
      documents,
    },
  };
}) satisfies GetServerSideProps<{ documents: DocumentResponse }>;
