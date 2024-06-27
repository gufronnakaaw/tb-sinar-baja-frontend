import { Button, Input } from "@nextui-org/react";
import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

// components
import ButtonBack from "@/components/button/ButtonBack";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";

// utils
import { fetcher } from "@/utils/fetcher";

type DetailQuery = {
  query: {
    id_supplier: string;
    nama: string;
    nama_produk: string;
    kode_item: string;
    harga: string;
    harga_grosir: string;
  };
};

export const getServerSideProps = ({ query }: DetailQuery) => {
  return {
    props: {
      id_supplier: query?.id_supplier,
      nama: query?.nama,
      nama_produk: query.nama_produk,
      kode_item: query.kode_item,
      harga: query.harga,
      harga_grosir: query.harga_grosir,
    },
  };
};

export default function SubComponentSuppliersPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const router = useRouter();
  const [harga, setHarga] = useState(parseInt(props.harga));
  const [hargaGrosir, setHargaGrosir] = useState(parseInt(props.harga_grosir));

  async function updatePricelist() {
    try {
      await fetcher({
        url: "/supplier/pricelist",
        method: "PATCH",
        data: {
          supplier_id: props.id_supplier,
          harga,
          harga_grosir: hargaGrosir,
          produk_id: props.kode_item,
        },
      });

      alert("harga produk berhasil diubah");
      setHarga(0);
      setHargaGrosir(0);
      router.back();
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
    <Layout title="Detail Harga Supplier">
      <Container className="gap-8">
        <ButtonBack onClick={() => router.back()}>Kembali</ButtonBack>

        <div className="grid gap-4">
          <div className="grid w-max gap-2 border-l-4 border-primary p-[1rem_0_1rem_1rem]">
            <div className="grid gap-[2px]">
              <div className="grid grid-cols-[170px_10px_10fr]  gap-1 text-sm text-default-900">
                <div className="text-sm font-medium text-default-600">
                  Nama Supplier
                </div>
                <div className="font-medium">:</div>
                <p className="font-bold text-primary">{props.nama}</p>
              </div>
              <div className="grid grid-cols-[170px_10px_10fr]  gap-1 text-sm text-default-900">
                <div className="text-sm font-medium text-default-600">
                  Nama Produk
                </div>
                <div className="font-medium">:</div>
                <p className="font-bold text-primary">{props.nama_produk}</p>
              </div>
              <div className="grid grid-cols-[170px_10px_10fr]  gap-1 text-sm text-default-900">
                <div className="grid text-sm font-medium text-default-600">
                  Kode Item
                </div>
                <div className="font-medium">:</div>
                <p className="font-bold text-primary">{props.kode_item}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Input
              defaultValue={props.harga}
              isRequired
              variant="flat"
              color="default"
              label="Harga"
              labelPlacement="outside"
              name="harga"
              placeholder="Masukan Harga"
              type="number"
              onChange={(e) => setHarga(parseInt(e.target.value))}
            />

            <Input
              defaultValue={props.harga_grosir}
              isRequired
              variant="flat"
              color="default"
              label="Harga Grosir"
              labelPlacement="outside"
              name="harga_grosir"
              placeholder="Masukan Harga Grosir"
              type="number"
              onChange={(e) => setHargaGrosir(parseInt(e.target.value))}
            />
          </div>

          <Button
            variant="solid"
            color="primary"
            size="md"
            className="w-max justify-self-end font-medium"
            onClick={updatePricelist}
          >
            Update Harga
          </Button>
        </div>
      </Container>
    </Layout>
  );
}
