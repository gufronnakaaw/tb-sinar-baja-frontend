import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/router";

// components
import ButtonBack from "@/components/button/ButtonBack";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";
import { fetcher } from "@/utils/fetcher";
import { useState } from "react";

export default function WarehousesUpdate() {
  const router = useRouter();
  const [namaGudang, setNamaGudang] = useState(router.query?.nama);

  if (!router.query?.kode_gudang) {
    return router.push("/owner/warehouses/lists");
  }

  async function handleUpdate() {
    try {
      await fetcher({
        url: "/gudang",
        method: "PATCH",
        data: {
          kode_gudang: router.query?.kode_gudang,
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
    <Layout title={`Update Gudang ${router.query?.kode_gudang}`}>
      <Container className="gap-8">
        <div className="flex items-center justify-between gap-4">
          <ButtonBack onClick={() => router.push("/owner/warehouses/lists")}>
            Kembali
          </ButtonBack>
        </div>

        <div className="grid gap-5">
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
