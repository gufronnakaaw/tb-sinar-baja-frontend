import ButtonBack from "@/components/button/ButtonBack";
import CustomTooltip from "@/components/tooltip";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";
import { GlobalResponse } from "@/types/global.type";
import { fetcher } from "@/utils/fetcher";
import { Button, Input } from "@nextui-org/react";
import { WarningCircle } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

type ProdukDetailType = {
  kode_item: string;
  barcode: any;
  kode_pabrik: any;
  kode_toko: any;
  kode_supplier: any;
  nama_produk: string;
  nama_produk_asli: string;
  nama_produk_sebutan: any;
  merk: any;
  tipe: any;
  satuan_besar: any;
  satuan_kecil: string;
  isi_satuan_besar: any;
  konversi: any;
  harga_pokok: number;
  harga_1: number;
  harga_2: number;
  harga_3: number;
  harga_4: number;
  harga_5: any;
  harga_6: any;
  stok: number;
  created_at: string;
  updated_at: string;
  rak: string;
  stok_aman: number;
  subkategori: string;
  gudang: string;
  kategori: string;
  status_stok: string;
  berat: number;
  volume: number;
  harga_diskon: number;
};

export default function ProductDetail({
  produk,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [input, setInput] = useState({});

  async function handleUpdate() {
    try {
      await fetcher({
        url: "/produk",
        method: "PATCH",
        data: {
          kode_item: produk.data.kode_item,
          ...input,
        },
      });
      alert("update berhasil");
      return router.push("/owner/products/lists");
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
    <Layout title="Edit Produk">
      <Container className="gap-8">
        <ButtonBack onClick={() => router.push("/owner/products/lists")}>
          Kembali
        </ButtonBack>

        <div className="grid gap-10">
          <div className="grid grid-cols-3 gap-3">
            <Input
              defaultValue={produk.data.kode_pabrik}
              variant="flat"
              color="default"
              labelPlacement="outside"
              label="Kode Pabrik"
              name="kode_pabrik"
              onChange={(e) => {
                setInput({
                  ...input,
                  [e.target.name]: e.target.value,
                });
              }}
            />

            <Input
              defaultValue={produk.data.kode_toko}
              variant="flat"
              color="default"
              labelPlacement="outside"
              label="Kode Toko"
              name="kode_toko"
              onChange={(e) => {
                setInput({
                  ...input,
                  [e.target.name]: e.target.value,
                });
              }}
            />

            <Input
              defaultValue={produk.data.nama_produk}
              variant="flat"
              color="default"
              labelPlacement="outside"
              label="Nama Produk"
              name="nama_produk"
              onChange={(e) => {
                setInput({
                  ...input,
                  [e.target.name]: e.target.value,
                });
              }}
            />
          </div>

          <div className="grid grid-cols-4 gap-3">
            <Input
              defaultValue={produk.data.nama_produk_asli}
              variant="flat"
              color="default"
              labelPlacement="outside"
              label="Nama Produk Asli"
              name="nama_produk_asli"
              onChange={(e) => {
                setInput({
                  ...input,
                  [e.target.name]: e.target.value,
                });
              }}
            />

            <Input
              defaultValue={produk.data.nama_produk_sebutan}
              variant="flat"
              color="default"
              labelPlacement="outside"
              label="Nama Produk Sebutan"
              name="nama_produk_sebutan"
              onChange={(e) => {
                setInput({
                  ...input,
                  [e.target.name]: e.target.value,
                });
              }}
            />

            <Input
              defaultValue={produk.data.merk}
              variant="flat"
              color="default"
              labelPlacement="outside"
              label="Merk"
              name="merk"
              onChange={(e) => {
                setInput({
                  ...input,
                  [e.target.name]: e.target.value,
                });
              }}
            />

            <Input
              defaultValue={produk.data.tipe}
              variant="flat"
              color="default"
              labelPlacement="outside"
              label="Tipe"
              name="tipe"
              onChange={(e) => {
                setInput({
                  ...input,
                  [e.target.name]: e.target.value,
                });
              }}
            />
          </div>

          <div className="grid grid-cols-4 gap-3">
            <Input
              defaultValue={produk.data.satuan_besar}
              variant="flat"
              color="default"
              labelPlacement="outside"
              label="Satuan Besar"
              name="satuan_besar"
              onChange={(e) => {
                setInput({
                  ...input,
                  [e.target.name]: e.target.value,
                });
              }}
            />

            <Input
              defaultValue={produk.data.satuan_kecil}
              variant="flat"
              color="default"
              labelPlacement="outside"
              label="Satuan Kecil"
              name="satuan_kecil"
              onChange={(e) => {
                setInput({
                  ...input,
                  [e.target.name]: e.target.value,
                });
              }}
            />

            <Input
              defaultValue={produk.data.isi_satuan_besar}
              variant="flat"
              color="default"
              labelPlacement="outside"
              label="Isi Satuan Besar"
              name="isi_satuan_besar"
              onChange={(e) => {
                setInput({
                  ...input,
                  [e.target.name]: e.target.value,
                });
              }}
            />

            <Input
              defaultValue={produk.data.konversi}
              variant="flat"
              color="default"
              labelPlacement="outside"
              label="Konversi"
              name="konversi"
              onChange={(e) => {
                setInput({
                  ...input,
                  [e.target.name]: parseInt(e.target.value),
                });
              }}
            />
          </div>

          <div className="grid grid-cols-4 gap-3">
            <Input
              defaultValue={`${produk.data.harga_pokok}`}
              variant="flat"
              color="default"
              labelPlacement="outside"
              label="Harga Pokok"
              name="harga_pokok"
              onChange={(e) => {
                setInput({
                  ...input,
                  [e.target.name]: parseInt(e.target.value),
                });
              }}
              type="number"
              min={0}
            />

            <Input
              defaultValue={`${produk.data.harga_1}`}
              variant="flat"
              color="default"
              labelPlacement="outside"
              label="Harga Distributor"
              name="harga_1"
              onChange={(e) => {
                setInput({
                  ...input,
                  [e.target.name]: parseInt(e.target.value),
                });
              }}
              type="number"
              min={0}
            />

            <Input
              defaultValue={`${produk.data.harga_2}`}
              variant="flat"
              color="default"
              labelPlacement="outside"
              label="Harga Agen"
              name="harga_2"
              onChange={(e) => {
                setInput({
                  ...input,
                  [e.target.name]: parseInt(e.target.value),
                });
              }}
              type="number"
              min={0}
            />

            <Input
              defaultValue={`${produk.data.harga_3}`}
              variant="flat"
              color="default"
              labelPlacement="outside"
              label="Harga Grosir"
              name="harga_3"
              onChange={(e) => {
                setInput({
                  ...input,
                  [e.target.name]: parseInt(e.target.value),
                });
              }}
              type="number"
              min={0}
            />
          </div>

          <div className="grid grid-cols-4 gap-3">
            <Input
              defaultValue={`${produk.data.harga_4}`}
              variant="flat"
              color="default"
              labelPlacement="outside"
              label="Harga Toko"
              name="harga_4"
              onChange={(e) => {
                setInput({
                  ...input,
                  [e.target.name]: parseInt(e.target.value),
                });
              }}
              type="number"
              min={0}
            />

            <Input
              defaultValue={`${produk.data.harga_5}`}
              variant="flat"
              color="default"
              labelPlacement="outside"
              label="Harga Aplikator"
              name="harga_5"
              onChange={(e) => {
                setInput({
                  ...input,
                  [e.target.name]: parseInt(e.target.value),
                });
              }}
              type="number"
              min={0}
            />

            <Input
              defaultValue={`${produk.data.harga_6}`}
              variant="flat"
              color="default"
              labelPlacement="outside"
              label="Harga Retail"
              name="harga_6"
              onChange={(e) => {
                setInput({
                  ...input,
                  [e.target.name]: parseInt(e.target.value),
                });
              }}
              type="number"
              min={0}
            />

            <Input
              defaultValue={`${produk.data.harga_diskon}`}
              variant="flat"
              color="default"
              labelPlacement="outside"
              label="Harga Diskon"
              name="harga_diskon"
              onChange={(e) => {
                setInput({
                  ...input,
                  [e.target.name]: parseInt(e.target.value),
                });
              }}
              type="number"
              min={0}
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Input
              defaultValue={`${produk.data.berat}`}
              variant="flat"
              color="default"
              labelPlacement="outside"
              label="Berat"
              name="berat"
              onChange={(e) => {
                setInput({
                  ...input,
                  [e.target.name]: parseInt(e.target.value),
                });
              }}
              type="number"
              min={0}
            />

            <Input
              defaultValue={`${produk.data.volume}`}
              variant="flat"
              color="default"
              labelPlacement="outside"
              label="Volume"
              name="volume"
              onChange={(e) => {
                setInput({
                  ...input,
                  [e.target.name]: parseInt(e.target.value),
                });
              }}
              type="number"
              min={0}
            />

            <Input
              defaultValue={produk.data.rak}
              variant="flat"
              color="default"
              labelPlacement="outside"
              label="Rak"
              name="rak"
              onChange={(e) => {
                setInput({
                  ...input,
                  [e.target.name]: e.target.value,
                });
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              defaultValue={produk.data.gudang}
              variant="flat"
              color="default"
              labelPlacement="outside"
              label={
                <span className="inline-flex items-center">
                  Gudang
                  {
                    <CustomTooltip content="Jika ingin merubah gudang wajib isi dengan Kode Gudang bukan Nama Gudang!">
                      <WarningCircle
                        weight="bold"
                        size={16}
                        className="ml-1 cursor-pointer text-default-600"
                      />
                    </CustomTooltip>
                  }
                </span>
              }
              name="gudang_id"
              onChange={(e) => {
                setInput({
                  ...input,
                  [e.target.name]: e.target.value,
                });
              }}
            />

            <Input
              defaultValue={produk.data.subkategori}
              variant="flat"
              color="default"
              labelPlacement="outside"
              label={
                <span className="inline-flex items-center">
                  Subkategori
                  {
                    <CustomTooltip content="Jika ingin merubah subkategori wajib isi dengan Kode Subkategori bukan Nama Subkategori!">
                      <WarningCircle
                        weight="bold"
                        size={16}
                        className="ml-1 cursor-pointer text-default-600"
                      />
                    </CustomTooltip>
                  }
                </span>
              }
              name="subkategori_id"
              onChange={(e) => {
                setInput({
                  ...input,
                  [e.target.name]: e.target.value,
                });
              }}
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

export const getServerSideProps = (async ({ query }) => {
  const result = await fetcher({
    url: "/produk?kode_item=" + query?.kode_item,
    method: "GET",
  });

  const produk: GlobalResponse<ProdukDetailType> = result;

  return {
    props: {
      produk,
    },
  };
}) satisfies GetServerSideProps<{ produk: GlobalResponse<ProdukDetailType> }>;
