import { Button, Input, Spinner } from "@nextui-org/react";
import { WarningCircle } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import { useState } from "react";

// components
import ButtonBack from "@/components/button/ButtonBack";
import CustomTooltip from "@/components/tooltip";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";

// utils
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

export default function ProductEdit() {
  const router = useRouter();
  const [input, setInput] = useState<any>({});
  const [loading, setLoading] = useState(false);

  async function handleCreate() {
    setLoading(true);
    try {
      await fetcher({
        url: "/produk/bulk",
        method: "POST",
        data: {
          gudang_id: input.gudang_id,
          produk: [input],
        },
      });

      setLoading(false);

      alert("buat produk berhasil");
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
    <Layout title="Buat Produk">
      <Container className="gap-12">
        <ButtonBack
          onClick={() => router.back()}
          className="justify-self-start text-teal-500"
        >
          Kembali
        </ButtonBack>

        <div className="grid gap-12">
          <div className="grid grid-cols-3 gap-6">
            <h3 className="col-span-3 border-l-4 border-teal-500 pl-4 text-[18px] font-semibold text-default-900">
              Informasi Utama Produk
            </h3>

            <Input
              isRequired
              variant="flat"
              label={
                <span className="inline-flex items-center">
                  Kode Item
                  {
                    <CustomTooltip content="Pembuatan Kode Item harus jelas, tidak disarankan menggunakan tanda selain strip!">
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
              name="kode_item"
              placeholder="Masukan Kode Item"
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
              label="Kode Pabrik"
              labelPlacement="outside"
              name="kode_pabrik"
              placeholder="Masukan Kode Pabrik"
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
            <h3 className="col-span-2 border-l-4 border-teal-500 pl-4 text-[18px] font-semibold text-default-900">
              Satuan Produk
            </h3>

            <Input
              isRequired
              variant="flat"
              label="Satuan Besar"
              labelPlacement="outside"
              name="satuan_besar"
              placeholder="Masukan Besaran"
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
            <h3 className="col-span-3 border-l-4 border-teal-500 pl-4 text-[18px] font-semibold text-default-900">
              Harga Produk
            </h3>

            <Input
              isRequired
              variant="flat"
              label="Harga Pokok"
              labelPlacement="outside"
              name="harga_pokok"
              placeholder="Masukan Harga Pokok"
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

          <div className="grid grid-cols-4 gap-6">
            <h3 className="col-span-4 border-l-4 border-teal-500 pl-4 text-[18px] font-semibold text-default-900">
              Informasi Tambahan
            </h3>

            <Input
              isRequired
              variant="flat"
              label="Berat"
              labelPlacement="outside"
              name="berat"
              placeholder="Masukan Berat"
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
                  Gudang
                  {
                    <CustomTooltip content="wajib isi dengan Kode Gudang bukan Nama Gudang!">
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
              name="gudang_id"
              placeholder="Masukan Kode Gudang"
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
              label={
                <span className="inline-flex items-center">
                  Subkategori
                  {
                    <CustomTooltip content="wajib isi dengan Kode Subkategori bukan Nama Subkategori!">
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
              placeholder="Masukan Kode Subkategori"
              onChange={(e) => {
                setInput({
                  ...input,
                  [e.target.name]: e.target.value,
                });
              }}
            />
          </div>

          <div className="grid grid-cols-3 gap-6">
            <Input
              isRequired
              variant="flat"
              label="Stok"
              labelPlacement="outside"
              name="stok"
              placeholder="Masukan Stok"
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
              label="Stok Aman"
              labelPlacement="outside"
              name="stok_aman"
              placeholder="Masukan Stok"
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
              label="Rak"
              labelPlacement="outside"
              name="rak"
              placeholder="Masukan Rak"
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
            className={`bg-teal-500 text-white ${loading ? "cursor-not-allowed justify-self-end font-medium" : ""}`}
          >
            Tunggu
          </Button>
        ) : (
          <Button
            variant="solid"
            size="md"
            onClick={handleCreate}
            className="w-max justify-self-end bg-teal-500 font-medium text-white"
          >
            Create Produk
          </Button>
        )}
      </Container>
    </Layout>
  );
}
