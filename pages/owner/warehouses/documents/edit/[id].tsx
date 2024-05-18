import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/router";

// components
import ButtonBack from "@/components/button/ButtonBack";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";
import { fetcher } from "@/utils/fetcher";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useState } from "react";

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

export default function DocumentsUpdate({
  documents,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [namaDriver, setNamaDriver] = useState(documents.nama_driver);
  const [kendaraan, setKendaraan] = useState(documents.kendaraan);
  const [platKendaraan, setPlatKendaraan] = useState(documents.plat_kendaraan);

  async function handleUpdate() {
    try {
      await fetcher({
        url: "/suratjalan",
        method: "PATCH",
        data: {
          id_suratjalan: documents.id_suratjalan,
          nama_driver: namaDriver,
          kendaraan,
          plat_kendaraan: platKendaraan,
        },
      });
      alert("update berhasil");
      return router.push("/owner/warehouses/documents");
    } catch (error) {
      alert("ups sepertinya ada masalah pada server");
      console.log(error);
    }
  }

  return (
    <Layout title={`Update Dokumen ${documents.id_suratjalan}`}>
      <Container className="gap-8">
        <div className="flex items-center justify-between gap-4">
          <ButtonBack
            onClick={() => router.push("/owner/warehouses/documents")}
          >
            Kembali
          </ButtonBack>
        </div>

        <div className="grid gap-5">
          <Input
            defaultValue={namaDriver}
            isRequired
            variant="flat"
            color="default"
            labelPlacement="outside"
            label="Nama Driver"
            placeholder="Masukan nama driver..."
            onChange={(e) => setNamaDriver(e.target.value)}
          />

          <Input
            defaultValue={kendaraan}
            isRequired
            variant="flat"
            color="default"
            labelPlacement="outside"
            label="Kendaraan"
            placeholder="Masukan kendaraan..."
            onChange={(e) => setKendaraan(e.target.value)}
          />

          <Input
            defaultValue={platKendaraan}
            isRequired
            variant="flat"
            color="default"
            labelPlacement="outside"
            label="Plat Kendaraan"
            placeholder="Masukan plat kendaraan..."
            onChange={(e) => setPlatKendaraan(e.target.value)}
          />

          <div>
            <Button
              variant="solid"
              color="primary"
              className="px-6 py-4 font-semibold text-white"
              size="md"
              onClick={handleUpdate}
            >
              Update
            </Button>
          </div>
        </div>
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
