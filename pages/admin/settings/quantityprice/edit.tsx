import { Button, Input, Spinner } from "@nextui-org/react";

// components
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";

import ButtonBack from "@/components/button/ButtonBack";
import { fetcher } from "@/utils/fetcher";
import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

export default function PriceQuantityUpdate(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const router = useRouter();
  const [input, setInput] = useState({
    harga: parseInt(props.harga),
    quantity: parseFloat(props.qty),
    keterangan: props.keterangan,
  });
  const [loading, setLoading] = useState(false);

  async function handleUpdate() {
    setLoading(true);
    try {
      await fetcher({
        url: "/setting/pricequantity",
        method: "PATCH",
        data: {
          id_table: parseInt(props.id),
          ...input,
        },
      });
      setLoading(false);

      alert("update berhasil");
      return router.push("/admin/settings/quantityprice");
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
    <Layout title="Update harga">
      <Container className="gap-12">
        <ButtonBack
          onClick={() => router.back()}
          className="justify-self-start text-teal-500"
        >
          Kembali
        </ButtonBack>

        <div className="grid gap-6">
          <div className="grid w-max gap-2 border-l-4 border-teal-500 p-[1rem_0_1rem_1rem]">
            <h4 className="text-[18px] font-bold text-default-900">
              Informasi Produk
            </h4>

            <div className="grid gap-[2px]">
              <div className="grid grid-cols-[170px_10px_10fr]  gap-1 text-sm text-default-900">
                <div className="text-sm font-medium text-default-600">
                  Nama Produk
                </div>
                <div className="font-medium">:</div>
                <p className="font-bold text-teal-500">{props.nama_produk}</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Input
              defaultValue={`${input.harga}`}
              isRequired
              variant="flat"
              color="default"
              labelPlacement="outside"
              label="Harga"
              placeholder="Masukan harga..."
              type="number"
              onChange={(e) => {
                setInput({
                  ...input,
                  harga: parseInt(e.target.value),
                });
              }}
            />

            <Input
              defaultValue={`${input.quantity}`}
              isRequired
              variant="flat"
              color="default"
              labelPlacement="outside"
              label="Qty"
              placeholder="Masukan qty..."
              type="number"
              onChange={(e) => {
                setInput({
                  ...input,
                  quantity: parseFloat(e.target.value),
                });
              }}
            />

            <Input
              defaultValue={input.keterangan}
              isRequired
              variant="flat"
              color="default"
              labelPlacement="outside"
              label="Keterangan"
              placeholder="Masukan keterangan..."
              type="text"
              onChange={(e) => {
                setInput({
                  ...input,
                  keterangan: e.target.value,
                });
              }}
            />
          </div>

          {loading ? (
            <Button
              variant="solid"
              startContent={<Spinner color="white" size="sm" />}
              className={`${loading ? "cursor-not-allowed justify-self-end bg-teal-500 font-medium text-white" : ""}`}
            >
              Tunggu
            </Button>
          ) : (
            <Button
              variant="solid"
              size="md"
              onClick={handleUpdate}
              className="justify-self-end bg-teal-500 font-medium text-white"
            >
              Update
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
    id: string;
    harga: string;
    qty: string;
    keterangan: string;
    nama_produk: string;
  };
}) => {
  return {
    props: {
      ...query,
    },
  };
};
