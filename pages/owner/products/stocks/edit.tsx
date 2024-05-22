import { Button, Input } from "@nextui-org/react";
import { WarningCircle } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// components & utils
import ButtonBack from "@/components/button/ButtonBack";
import CustomTooltip from "@/components/tooltip";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";
import { fetcher } from "@/utils/fetcher";

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
    return router.push("/owner/products/stocks");
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
      return router.push("/owner/products/stocks");
    } catch (error) {
      alert("ups sepertinya ada masalah pada server");
      console.log(error);
    }
  }

  return (
    <Layout title="Update Produk">
      <Container className="gap-12">
        <ButtonBack onClick={() => router.push("/owner/products/stocks")}>
          Kembali
        </ButtonBack>

        <div className="grid gap-8">
          <div className="grid w-max gap-2 border-l-4 border-primary p-[1rem_0_1rem_1rem]">
            <h4 className="text-[18px] font-bold text-default-900">
              Informasi Stok Produk
            </h4>

            <div className="grid gap-[2px]">
              <p className="text-sm font-medium text-default-600">
                Stok Sekarang :{" "}
                <span className="font-bold text-primary">{stok}</span>
              </p>
              <p className="text-sm font-medium text-default-600">
                Stok Aman Sekarang :{" "}
                <span className="font-bold text-primary">{stok_aman}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 md:grid md:grid-cols-2">
            <Input
              isRequired
              type="number"
              variant="flat"
              color="default"
              labelPlacement="outside"
              label="Jumlah stok yang akan ditambah"
              placeholder="Stok"
              defaultValue={stokSekarang as string}
              onChange={(e) => setStokSekarang(e.target.value)}
            />

            <Input
              isRequired
              type="number"
              variant="flat"
              color="default"
              labelPlacement="outside"
              label={
                <span className="inline-flex items-center">
                  Ubah stok aman{" "}
                  {
                    <CustomTooltip content="Hiraukan jika tidak ingin merubah!">
                      <WarningCircle
                        weight="bold"
                        size={16}
                        className="ml-1 cursor-pointer text-default-600"
                      />
                    </CustomTooltip>
                  }
                </span>
              }
              placeholder="Stok Aman"
              defaultValue={stokAmanSekarang as string}
              onChange={(e) => setStokAmanSekarang(e.target.value)}
            />
          </div>

          <Button
            variant="solid"
            color="primary"
            size="md"
            onClick={handleUpdate}
            className="w-max justify-self-end font-semibold"
          >
            Update Produk
          </Button>
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
