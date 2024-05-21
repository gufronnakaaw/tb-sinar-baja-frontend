import { Button, Input } from "@nextui-org/react";
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

  if (!id_kategori) {
    return router.push("/owner/products/categories");
  }

  async function handleUpdate() {
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
      return router.push("/owner/products/categories");
    } catch (error) {
      alert("ups sepertinya ada masalah pada server");
      console.log(error);
    }
  }

  return (
    <Layout title={`Update kategori ${nama}`}>
      <Container className="gap-12">
        <ButtonBack onClick={() => router.push("/owner/products/categories")}>
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

          <Button
            variant="solid"
            color="primary"
            size="md"
            onClick={handleUpdate}
            className="justify-self-end font-semibold"
          >
            Update Kategori
          </Button>
        </div>
      </Container>
    </Layout>
  );
}

export const getServerSideProps = ({ query }) => {
  return {
    props: {
      id_kategori: query?.id_kategori,
      nama: query?.nama,
    },
  };
};
