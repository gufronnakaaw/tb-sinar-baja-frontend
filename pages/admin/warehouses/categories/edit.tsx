import { Button, Input, Spinner } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useState } from "react";

// components & utils
import ButtonBack from "@/components/button/ButtonBack";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";
import { fetcher } from "@/utils/fetcher";

export default function CategoriesUpdate({
  id_kategori,
  nama,
}: {
  id_kategori: string;
  nama: string;
}) {
  const router = useRouter();
  const [namaKategori, setNamaKategori] = useState(nama);
  const [loading, setLoading] = useState(false);

  if (!id_kategori) {
    return router.back();
  }

  async function handleUpdate() {
    setLoading(true);
    try {
      await fetcher({
        url: "/kategori",
        method: "PATCH",
        data: {
          id_kategori: parseInt(id_kategori),
          nama: namaKategori,
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
            defaultValue={namaKategori as string}
            isRequired
            variant="flat"
            color="default"
            labelPlacement="outside"
            label="Nama Kategori"
            placeholder="Masukan nama kategori..."
            onChange={(e) => setNamaKategori(e.target.value)}
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
              Update Kategori
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
  query: { id_kategori: string; nama: string };
}) => {
  return {
    props: {
      id_kategori: query?.id_kategori,
      nama: query?.nama,
    },
  };
};
