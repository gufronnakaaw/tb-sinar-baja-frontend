import { Button, Input, Spinner } from "@nextui-org/react";
import { WarningCircle } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

// components
import ButtonBack from "@/components/button/ButtonBack";
import CustomTooltip from "@/components/tooltip";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";

// utils
import { GlobalResponse } from "@/types/global.type";
import { fetcher } from "@/utils/fetcher";

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
  stok_aman: number;
  subkategori: string;
  gudang: { nama: string; kode_gudang: string; rak: string }[];
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
  const [loading, setLoading] = useState(false);

  async function handleUpdate() {
    setLoading(true);
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
    <Layout title="Edit Produk">
      <Container className="gap-12">
        <ButtonBack
          onClick={() => router.back()}
          className="justify-self-start text-primary"
        >
          Kembali
        </ButtonBack>

        <div className="grid gap-12">
          <div className="grid grid-cols-3 gap-6">
            <h3 className="col-span-3 border-l-4 border-primary pl-4 text-[18px] font-semibold text-default-900">
              Informasi Utama Produk
            </h3>

            <Input
              isRequired
              variant="flat"
              label="Kode Pabrik"
              labelPlacement="outside"
              name="kode_pabrik"
              placeholder="Masukan Kode Pabrik"
              defaultValue={produk.data.kode_pabrik}
              onChange={(e) => {
                setInput({
                  ...input,
                  [e.target.name]: e.target.value,
                });
              }}
            />

            <Input
              isRequired
              variant="flat"
              label="Kode Toko"
              labelPlacement="outside"
              name="kode_toko"
              placeholder="Masukan Kode Toko"
              defaultValue={produk.data.kode_toko}
              onChange={(e) => {
                setInput({
                  ...input,
                  [e.target.name]: e.target.value,
                });
              }}
            />

            <Input
              isRequired
              variant="flat"
              label="Nama Produk"
              labelPlacement="outside"
              name="nama_produk"
              placeholder="Masukan Kode Produk"
              defaultValue={produk.data.nama_produk}
              onChange={(e) => {
                setInput({
                  ...input,
                  [e.target.name]: e.target.value,
                });
              }}
            />

            <Input
              isRequired
              variant="flat"
              label="Nama Produk Asli"
              labelPlacement="outside"
              name="nama_produk_asli"
              placeholder="Masukan Nama Produk Asli"
              defaultValue={produk.data.nama_produk_asli}
              onChange={(e) => {
                setInput({
                  ...input,
                  [e.target.name]: e.target.value,
                });
              }}
            />

            <Input
              isRequired
              variant="flat"
              label="Nama Produk Sebutan"
              labelPlacement="outside"
              name="nama_produk_sebutan"
              placeholder="Masukan Produk Sebutan"
              defaultValue={produk.data.nama_produk_sebutan}
              onChange={(e) => {
                setInput({
                  ...input,
                  [e.target.name]: e.target.value,
                });
              }}
            />

            <Input
              isRequired
              variant="flat"
              label="Merk"
              labelPlacement="outside"
              name="merk"
              placeholder="Masukan Merk"
              defaultValue={produk.data.merk}
              onChange={(e) => {
                setInput({
                  ...input,
                  [e.target.name]: e.target.value,
                });
              }}
            />

            <Input
              isRequired
              variant="flat"
              label="Tipe"
              labelPlacement="outside"
              name="tipe"
              placeholder="Masukan Tipe"
              defaultValue={produk.data.tipe}
              onChange={(e) => {
                setInput({
                  ...input,
                  [e.target.name]: e.target.value,
                });
              }}
            />
          </div>

          <div className="w-full border-b border-default-200" />

          <div className="grid grid-cols-2 gap-6">
            <h3 className="col-span-2 border-l-4 border-primary pl-4 text-[18px] font-semibold text-default-900">
              Satuan Produk
            </h3>

            <Input
              isRequired
              variant="flat"
              label="Satuan Besar"
              labelPlacement="outside"
              name="satuan_besar"
              placeholder="Masukan Besaran"
              defaultValue={produk.data.satuan_besar}
              onChange={(e) => {
                setInput({
                  ...input,
                  [e.target.name]: e.target.value,
                });
              }}
            />

            <Input
              isRequired
              variant="flat"
              labelPlacement="outside"
              label="Satuan Kecil"
              name="satuan_kecil"
              placeholder="Masukan Satuan Kecil"
              defaultValue={produk.data.satuan_kecil}
              onChange={(e) => {
                setInput({
                  ...input,
                  [e.target.name]: e.target.value,
                });
              }}
            />

            <Input
              isRequired
              variant="flat"
              label="Isi Satuan Besar"
              labelPlacement="outside"
              name="isi_satuan_besar"
              placeholder="Masukan Satuan Besar"
              defaultValue={produk.data.isi_satuan_besar}
              onChange={(e) => {
                setInput({
                  ...input,
                  [e.target.name]: e.target.value,
                });
              }}
            />

            <Input
              isRequired
              variant="flat"
              label="Konversi"
              labelPlacement="outside"
              name="konversi"
              placeholder="Masukan Konversi"
              defaultValue={produk.data.konversi}
              onChange={(e) => {
                setInput({
                  ...input,
                  [e.target.name]: parseInt(e.target.value),
                });
              }}
            />
          </div>

          <div className="w-full border-b border-default-200" />

          <div className="grid grid-cols-3 gap-6">
            <h3 className="col-span-3 border-l-4 border-primary pl-4 text-[18px] font-semibold text-default-900">
              Harga Produk
            </h3>

            <Input
              isRequired
              variant="flat"
              label="Harga Pokok"
              labelPlacement="outside"
              name="harga_pokok"
              placeholder="Masukan Harga Pokok"
              defaultValue={`${produk.data.harga_pokok}`}
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
              isRequired
              variant="flat"
              label="Harga Distributor"
              labelPlacement="outside"
              name="harga_1"
              placeholder="Masukan Harga Distributor"
              defaultValue={`${produk.data.harga_1}`}
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
              isRequired
              variant="flat"
              label="Harga Agen"
              labelPlacement="outside"
              name="harga_2"
              placeholder="Masukan Harga Agen"
              defaultValue={`${produk.data.harga_2}`}
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
              isRequired
              variant="flat"
              label="Harga Grosir"
              labelPlacement="outside"
              name="harga_3"
              placeholder="Masukan Harga Grosir"
              defaultValue={`${produk.data.harga_3}`}
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
              isRequired
              variant="flat"
              label="Harga Toko"
              labelPlacement="outside"
              name="harga_4"
              placeholder="Masukan Harga Toko"
              defaultValue={`${produk.data.harga_4}`}
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
              isRequired
              variant="flat"
              label="Harga Aplikator"
              labelPlacement="outside"
              name="harga_5"
              placeholder="Masukan Harga Aplikator"
              defaultValue={`${produk.data.harga_5}`}
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
              isRequired
              variant="flat"
              label="Harga Retail"
              labelPlacement="outside"
              name="harga_6"
              placeholder="Masukan Harga Retail"
              defaultValue={`${produk.data.harga_6}`}
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
              isRequired
              variant="flat"
              label="Harga Diskon"
              labelPlacement="outside"
              name="harga_diskon"
              placeholder="Masukan Harga Disskon"
              defaultValue={`${produk.data.harga_diskon}`}
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

          <div className="w-full border-b border-default-200" />

          <div className="grid grid-cols-3 gap-6">
            <h3 className="col-span-3 border-l-4 border-primary pl-4 text-[18px] font-semibold text-default-900">
              Informasi Tambahan
            </h3>

            <Input
              isRequired
              variant="flat"
              label="Berat"
              labelPlacement="outside"
              name="berat"
              placeholder="Masukan Berat"
              defaultValue={`${produk.data.berat}`}
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
              isRequired
              variant="flat"
              label="Volume"
              labelPlacement="outside"
              name="volume"
              placeholder="Masukan Volume"
              defaultValue={`${produk.data.volume}`}
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
              isRequired
              variant="flat"
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
              labelPlacement="outside"
              name="subkategori_id"
              placeholder="Masukan Subkategori"
              defaultValue={produk.data.subkategori}
              onChange={(e) => {
                setInput({
                  ...input,
                  [e.target.name]: e.target.value,
                });
              }}
            />
          </div>
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
            className="w-max justify-self-end bg-primary font-medium text-white"
          >
            Update Produk
          </Button>
        )}
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
