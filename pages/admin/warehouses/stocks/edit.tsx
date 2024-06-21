import { Button, Input, Spinner } from "@nextui-org/react";
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
  nama_produk,
}: {
  kode_item: string;
  stok: string;
  stok_aman: string;
  nama_produk: string;
}) {
  const [stokSekarang, setStokSekarang] = useState("0");
  const [stokAmanSekarang, setStokAmanSekarang] = useState(stok_aman);
  const [client, setClient] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setClient(true);
  }, [router]);

  if (!client) {
    return;
  }

  if (!kode_item) {
    return router.back();
  }

  async function handleUpdate() {
    setLoading(true);

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

    try {
      await fetcher({
        url: "/produk/stok",
        method: "PATCH",
        data,
      });
      alert("update stok berhasil");
      return router.back();
    } catch (error) {
      const response = error as {
        success: boolean;
        status_code: number;
        error: { name: string; message: string };
      };

      if (response.status_code >= 500) {
        console.log(response.error);
        return alert("terjadi masalah pada server");
      }

      if (response.status_code >= 400) {
        console.log(response.error);
        return alert(response.error.message);
      }

      console.log(response.error);
      return alert("terjadi error tidak diketahui pada aplikasi");
    }
  }

  return (
    <Layout title="Update Produk">
      <Container className="gap-12">
        <ButtonBack
          onClick={() => router.back()}
          className="justify-self-start text-teal-500"
        >
          Kembali
        </ButtonBack>

        <div className="grid gap-8">
          <div className="grid w-max gap-2 border-l-4 border-teal-500 p-[1rem_0_1rem_1rem]">
            <h4 className="text-[18px] font-bold text-default-900">
              Informasi Stok Produk
            </h4>

            <div className="grid gap-[2px]">
              <div className="grid grid-cols-[170px_10px_10fr]  gap-1 text-sm text-default-900">
                <div className="text-sm font-medium text-default-600">
                  Nama Produk
                </div>
                <div className="font-medium">:</div>
                <p className="font-bold text-teal-500">{nama_produk}</p>
              </div>
              <div className="grid grid-cols-[170px_10px_10fr]  gap-1 text-sm text-default-900">
                <div className="text-sm font-medium text-default-600">
                  Stok Sekarang
                </div>
                <div className="font-medium">:</div>
                <p className="font-bold text-teal-500">{stok}</p>
              </div>
              <div className="grid grid-cols-[170px_10px_10fr]  gap-1 text-sm text-default-900">
                <div className="grid text-sm font-medium text-default-600">
                  Stok Aman Sekarang
                </div>
                <div className="font-medium">:</div>
                <p className="font-bold text-teal-500">{stok_aman}</p>
              </div>
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
              className="w-max justify-self-end bg-teal-500 font-medium text-white "
            >
              Update Produk
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
  query: {
    kode_item: string;
    stok: string;
    stok_aman: string;
    nama_produk: string;
  };
}) => {
  return {
    props: {
      kode_item: query?.kode_item,
      stok: query?.stok,
      stok_aman: query?.stok_aman,
      nama_produk: query?.nama_produk,
    },
  };
};
