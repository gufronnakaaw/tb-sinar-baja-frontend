import { Button, Input, Select, SelectItem, Spinner } from "@nextui-org/react";
import { WarningCircle } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import { useState } from "react";

// components & utils
import ButtonBack from "@/components/button/ButtonBack";
import CustomTooltip from "@/components/tooltip";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";
import { GlobalResponse } from "@/types/global.type";
import { ProdukType } from "@/types/products.type";
import { fetcher } from "@/utils/fetcher";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export default function StockUpdate({
  produk,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [stokSekarang, setStokSekarang] = useState(0);
  const [stokAmanSekarang, setStokAmanSekarang] = useState(0);
  const [kodeGudang, setKodeGudang] = useState("");
  const [loading, setLoading] = useState(false);

  const gudang = produk.gudang as {
    stok: number;
    stok_aman: null;
    nama: string;
    kode_gudang: string;
  }[];

  const router = useRouter();

  async function handleUpdate() {
    if (!kodeGudang) {
      return alert("silahkan pilih gudang");
    }

    setLoading(true);

    const data = {
      kode_item: produk.kode_item,
      stok: stokSekarang,
      tipe: "increment",
    };

    if (stokAmanSekarang) {
      Object.assign(data, {
        stok_aman: stokAmanSekarang,
      });
    }

    try {
      await fetcher({
        url: "/produk/stok",
        method: "PATCH",
        data: {
          ...data,
          gudang: kodeGudang,
        },
      });
      alert("update stok berhasil");
      setLoading(false);

      return router.back();
    } catch (error) {
      setLoading(false);

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
          className="justify-self-start text-primary"
        >
          Kembali
        </ButtonBack>

        <div className="grid gap-8">
          <div className="grid w-max gap-2 border-l-4 border-primary p-[1rem_0_1rem_1rem]">
            <h4 className="text-[18px] font-bold text-default-900">
              Informasi Stok Produk
            </h4>

            <div className="grid gap-[2px]">
              <div className="grid grid-cols-[250px_10px_10fr]  gap-1 text-sm text-default-900">
                <div className="text-sm font-medium text-default-600">
                  Nama Produk
                </div>
                <div className="font-medium">:</div>
                <p className="font-bold text-primary">{produk.nama_produk}</p>
              </div>
              {produk.gudang?.map((item) => {
                return (
                  <>
                    <div className="grid grid-cols-[250px_10px_10fr]  gap-1 text-sm text-default-900">
                      <div className="text-sm font-medium text-default-600">
                        Stok {item.nama} Sekarang
                      </div>
                      <div className="font-medium">:</div>
                      <p className="font-bold text-primary">{item.stok}</p>
                    </div>
                    <div className="grid grid-cols-[250px_10px_10fr]  gap-1 text-sm text-default-900">
                      <div className="grid text-sm font-medium text-default-600">
                        Stok Aman {item.nama} Sekarang
                      </div>
                      <div className="font-medium">:</div>
                      <p className="font-bold text-primary">{item.stok_aman}</p>
                    </div>
                  </>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Select
              isRequired
              labelPlacement="outside"
              label="Pilih Gudang"
              size="md"
              className="w-full"
              onChange={(e) => {
                if (!e.target.value) return;
                setKodeGudang(e.target.value);
              }}
              selectedKeys={[kodeGudang]}
            >
              {gudang.map((item) => (
                <SelectItem key={item.nama} value={item.nama}>
                  {item.nama}
                </SelectItem>
              ))}
            </Select>

            <Input
              isRequired
              type="number"
              variant="flat"
              color="default"
              labelPlacement="outside"
              label="Jumlah stok yang akan ditambah"
              placeholder="Stok"
              value={!stokSekarang ? "" : `${stokSekarang}`}
              onChange={(e) => setStokSekarang(parseInt(e.target.value))}
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
              value={!stokAmanSekarang ? "" : `${stokAmanSekarang}`}
              onChange={(e) => setStokAmanSekarang(parseInt(e.target.value))}
            />
          </div>

          {loading ? (
            <Button
              variant="solid"
              startContent={<Spinner color="white" size="sm" />}
              className={`bg-primary text-white ${loading ? "cursor-not-allowed justify-self-end font-medium" : ""}`}
            >
              Tunggu
            </Button>
          ) : (
            <Button
              variant="solid"
              size="md"
              onClick={handleUpdate}
              className="w-max justify-self-end bg-primary font-medium text-white "
            >
              Update Produk
            </Button>
          )}
        </div>
      </Container>
    </Layout>
  );
}

export const getServerSideProps = (async ({ query }) => {
  const result: GlobalResponse<ProdukType> = await fetcher({
    url: "/produk?kode_item=" + query?.kode_item,
    method: "GET",
  });

  return {
    props: {
      produk: result.data,
    },
  };
}) satisfies GetServerSideProps<{
  produk: ProdukType;
}>;
