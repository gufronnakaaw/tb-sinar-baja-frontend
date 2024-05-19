import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/router";

// components
import ButtonBack from "@/components/button/ButtonBack";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";
import { fetcher } from "@/utils/fetcher";
import { useEffect, useState } from "react";

export default function StockUpdate({
  kode_item,
  stok,
  stok_aman,
}: {
  kode_item: string;
  stok: string;
  stok_aman: string;
}) {
  const [stokSekarang, setStokSekarang] = useState("0");
  const [stokAmanSekarang, setStokAmanSekarang] = useState(stok_aman);
  const [client, setClient] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setClient(true);
  }, [router]);

  if (!client) {
    return;
  }

  if (!kode_item) {
    return router.push("/admin/products/stocks");
  }

  async function handleUpdate() {
    const data = {
      kode_item,
    };

    if (stokAmanSekarang != stok_aman) {
      Object.assign(data, {
        stok_aman: parseInt(stokAmanSekarang),
      });
    } else {
      Object.assign(data, {
        stok: parseInt(stokSekarang),
        tipe: "increment",
      });
    }

    console.log({ stokAmanSekarang, stok_aman });

    try {
      await fetcher({
        url: "/produk/stok",
        method: "PATCH",
        data,
      });
      alert("update berhasil");
      return router.push("/admin/products/stocks");
    } catch (error) {
      alert("ups sepertinya ada masalah pada server");
      console.log(error);
    }
  }

  return (
    <Layout title="Update Produk">
      <Container className="gap-8">
        <div className="flex items-center justify-between gap-4">
          <ButtonBack onClick={() => router.push("/admin/products/stocks")}>
            Kembali
          </ButtonBack>
        </div>

        <div className="grid gap-8">
          <div>
            <p>Stok Sekarang : {stok}</p>
            <p>Stok Aman Sekarang : {stok_aman}</p>
          </div>

          <Input
            defaultValue={stokSekarang as string}
            isRequired
            variant="flat"
            color="default"
            labelPlacement="outside"
            label="Jumlah stok yang akan ditambah"
            placeholder="Stok"
            onChange={(e) => setStokSekarang(e.target.value)}
            type="number"
            className="mt-5"
          />

          <Input
            defaultValue={stokAmanSekarang as string}
            isRequired
            variant="flat"
            color="default"
            labelPlacement="outside"
            label="Ubah stok aman (hiraukan jika tidak ingin merubah)"
            placeholder="Stok Aman"
            onChange={(e) => setStokAmanSekarang(e.target.value)}
            type="number"
            className="mt-5"
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

export const getServerSideProps = ({ query }) => {
  return {
    props: {
      kode_item: query?.kode_item,
      stok: query?.stok,
      stok_aman: query?.stok_aman,
    },
  };
};
