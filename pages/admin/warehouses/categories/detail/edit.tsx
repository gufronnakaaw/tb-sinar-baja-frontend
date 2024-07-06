import { Button, Input, Spinner } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useState } from "react";

// components & utils
import ButtonBack from "@/components/button/ButtonBack";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";
import { fetcher } from "@/utils/fetcher";

export default function SubcategoriesUpdate({
  id_subkategori,
  nama,
}: {
  id_subkategori: string;
  nama: string;
}) {
  const router = useRouter();
  const [namaSubKategori, setNamaSubKategori] = useState(nama);
  const [loading, setLoading] = useState(false);

  if (!id_subkategori) {
    return router.back();
  }

  async function handleUpdate() {
    setLoading(true);
    try {
      await fetcher({
        url: "/kategori/subkategori",
        method: "PATCH",
        data: {
          id_subkategori,
          nama: namaSubKategori,
        },
      });
      alert("update berhasil");
      return router.back();
    } catch (error) {
      setLoading(false);
      alert("ups sepertinya ada masalah pada server");
      console.log(error);
    }
  }

  return (
    <Layout title={`Update kategori ${nama}`}>
      <Container className="gap-12">
        <ButtonBack
          onClick={() => router.back()}
          className="justify-self-start text-teal-500"
        >
          Kembali
        </ButtonBack>

        <div className="grid gap-6">
          <Input
            defaultValue={namaSubKategori as string}
            isRequired
            variant="flat"
            color="default"
            labelPlacement="outside"
            label="Nama Subkategori"
            placeholder="Masukan nama subkategori..."
            onChange={(e) => setNamaSubKategori(e.target.value)}
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
              Update
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
  query: { id_subkategori: string; nama: string };
}) => {
  return {
    props: {
      id_subkategori: query?.id_subkategori,
      nama: query?.nama,
    },
  };
};
