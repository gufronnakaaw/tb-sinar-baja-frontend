import { Button, Input, Spinner } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// components & utils
import ButtonBack from "@/components/button/ButtonBack";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";
import { fetcher } from "@/utils/fetcher";

export default function WarehousesUpdate({
  kode_gudang,
  nama,
}: {
  kode_gudang: string;
  nama: string;
}) {
  const router = useRouter();
  const [namaGudang, setNamaGudang] = useState(nama);
  const [client, setClient] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setClient(true);
  }, [router]);

  if (!client) {
    return;
  }

  if (!kode_gudang) {
    return router.back();
  }

  async function handleUpdate() {
    setLoading(true);
    try {
      await fetcher({
        url: "/gudang",
        method: "PATCH",
        data: {
          kode_gudang,
          nama: namaGudang,
        },
      });
      alert("update berhasil");
      return router.back();
    } catch (error) {
      alert("ups sepertinya ada masalah pada server");
      console.log(error);
    }
  }

  return (
    <Layout title={`Update Gudang ${kode_gudang}`}>
      <Container className="gap-12">
        <ButtonBack
          onClick={() => router.back()}
          className="justify-self-start text-teal-500"
        >
          Kembali
        </ButtonBack>

        <div className="grid gap-6">
          <Input
            defaultValue={namaGudang as string}
            isRequired
            variant="flat"
            color="default"
            labelPlacement="outside"
            label="Nama Gudang"
            placeholder="Masukan nama gudang..."
            onChange={(e) => setNamaGudang(e.target.value)}
          />

          {loading ? (
            <Button
              variant="solid"
              startContent={<Spinner color="white" size="sm" />}
              className={`bg-teal-500 text-white ${loading ? "cursor-not-allowed justify-self-end font-medium" : ""}`}
            >
              Tunggu
            </Button>
          ) : (
            <Button
              variant="solid"
              size="md"
              onClick={handleUpdate}
              className="justify-self-end bg-teal-500 font-medium text-white"
            >
              Update Gudang
            </Button>
          )}
        </div>
      </Container>
    </Layout>
  );
}

export const getServerSideProps = ({
  query,
}: {
  query: { kode_gudang: string; nama: string };
}) => {
  return {
    props: {
      kode_gudang: query?.kode_gudang,
      nama: query?.nama,
    },
  };
};
