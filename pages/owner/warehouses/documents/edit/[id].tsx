import { Button, Input, Spinner, Textarea } from "@nextui-org/react";
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

export default function DocumentsUpdate({
  documents,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [namaDriver, setNamaDriver] = useState(documents.nama_driver);
  const [kendaraan, setKendaraan] = useState(documents.kendaraan);
  const [platKendaraan, setPlatKendaraan] = useState(documents.plat_kendaraan);
  const [alamat, setAlamat] = useState(documents.transaksi.alamat);
  const [keterangan, setKeterangan] = useState(documents.transaksi.keterangan);
  const [noTelp, setNoTelp] = useState(documents.transaksi.no_telp);
  const [loading, setLoading] = useState(false);

  async function handleUpdate() {
    setLoading(true);
    try {
      await fetcher({
        url: "/suratjalan",
        method: "PATCH",
        data: {
          id_suratjalan: documents.id_suratjalan,
          nama_driver: !namaDriver ? "" : namaDriver,
          kendaraan: !kendaraan ? "" : kendaraan,
          plat_kendaraan: !platKendaraan ? "" : platKendaraan,
          alamat,
          keterangan,
          no_telp: noTelp,
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
        <ButtonBack onClick={() => router.push("/owner/warehouses/documents")}>
          Kembali
        </ButtonBack>

        <div className="grid gap-6">
          <div className="grid grid-cols-3 gap-4">
            <Input
              isRequired
              variant="flat"
              color="default"
              label="Nama Driver"
              labelPlacement="outside"
              placeholder="Masukan nama driver..."
              defaultValue={namaDriver}
              onChange={(e) => setNamaDriver(e.target.value)}
            />

            <Input
              isRequired
              variant="flat"
              color="default"
              label="Kendaraan"
              labelPlacement="outside"
              placeholder="Masukan kendaraan..."
              defaultValue={kendaraan}
              onChange={(e) => setKendaraan(e.target.value)}
            />

            <Input
              isRequired
              variant="flat"
              color="default"
              label="Plat Kendaraan"
              labelPlacement="outside"
              placeholder="Masukan plat kendaraan..."
              defaultValue={platKendaraan}
              onChange={(e) => setPlatKendaraan(e.target.value)}
            />
          </div>

          <Textarea
            isRequired
            variant="flat"
            maxRows={3}
            label="Alamat"
            labelPlacement="outside"
            placeholder="Masukan alamat lengkap..."
            value={alamat}
            onChange={(e) => setAlamat(e.target.value)}
          />

          <Textarea
            isRequired
            variant="flat"
            maxRows={3}
            label="Keterangan"
            labelPlacement="outside"
            placeholder="Masukan keterangan..."
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
          />

          <Input
            isRequired
            type="number"
            variant="flat"
            label="No. Telp"
            labelPlacement="outside"
            placeholder="Masukan no. telp..."
            value={noTelp}
            onChange={(e) => setNoTelp(e.target.value)}
          />
        </div>

        {loading ? (
          <Button
            variant="solid"
            color="primary"
            startContent={<Spinner color="white" size="sm" />}
            className={`${loading ? "cursor-not-allowed justify-self-end font-medium" : ""}`}
          >
            Tunggu
          </Button>
        ) : (
          <Button
            variant="solid"
            color="primary"
            size="md"
            onClick={handleUpdate}
            className="w-max justify-self-end font-medium"
          >
            Update Dokumen
          </Button>
        )}
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
