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
    return router.push("/owner/warehouses/lists");
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
      return router.push("/owner/warehouses/lists");
    } catch (error) {
      alert("ups sepertinya ada masalah pada server");
      console.log(error);
    }
  }

  return (
    <Layout title={`Update Gudang ${kode_gudang}`}>
      <Container className="gap-12">
        <ButtonBack onClick={() => router.push("/owner/warehouses/lists")}>
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
              className="justify-self-end font-medium"
            >
              Update Gudang
            </Button>
          )}
        </div>
      </Container>
    </Layout>
  );
}

export const getServerSideProps = ({ query }) => {
  return {
    props: {
      kode_gudang: query?.kode_gudang,
      nama: query?.nama,
    },
  };
};
