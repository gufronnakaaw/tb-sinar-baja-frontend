import { Button, Input, Spinner } from "@nextui-org/react";

// components
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";

import ButtonBack from "@/components/button/ButtonBack";
import CustomTooltip from "@/components/tooltip";
import { fetcher } from "@/utils/fetcher";
import { formatRupiah } from "@/utils/formatRupiah";
import { WarningCircle } from "@phosphor-icons/react";
import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

export default function PaymentTransaction(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [jumlah, setJumlah] = useState(0);

  async function handleUpdate() {
    setLoading(true);
    try {
      await fetcher({
        url: "/transaksi/payment",
        method: "POST",
        data: {
          id_transaksi: props.id_transaksi,
          jumlah,
        },
      });
      setLoading(false);

      alert("bayar berhasil");
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
    <Layout title="Update pembayaran">
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
              Informasi Transaksi
            </h4>

            <div className="grid gap-[2px]">
              <div className="grid grid-cols-[170px_10px_10fr]  gap-1 text-sm text-default-900">
                <div className="text-sm font-medium text-default-600">
                  ID Transaksi
                </div>
                <div className="font-medium">:</div>
                <p className="font-bold text-teal-500">{props.id_transaksi}</p>
              </div>
              <div className="grid grid-cols-[170px_10px_10fr]  gap-1 text-sm text-default-900">
                <div className="text-sm font-medium text-default-600">
                  Total Pembayaran
                </div>
                <div className="font-medium">:</div>
                <p className="font-bold text-teal-500">
                  {formatRupiah(parseInt(props.total_pembayaran))}
                </p>
              </div>
              <div className="grid grid-cols-[170px_10px_10fr]  gap-1 text-sm text-default-900">
                <div className="text-sm font-medium text-default-600">
                  Tagihan
                </div>
                <div className="font-medium">:</div>
                <p className="font-bold text-teal-500">
                  {formatRupiah(parseInt(props.sisa))}
                </p>
              </div>
            </div>
          </div>
          <Input
            defaultValue={`${jumlah}`}
            isRequired
            variant="flat"
            color="default"
            labelPlacement="outside"
            label={
              <span className="inline-flex items-center">
                Jumlah
                {
                  <CustomTooltip content="Isi dengan jumlah pembayaran yang sesuai karena sistem akan otomatis menjumlahkan.">
                    <WarningCircle
                      weight="bold"
                      size={16}
                      className="ml-1 cursor-pointer text-default-600"
                    />
                  </CustomTooltip>
                }
              </span>
            }
            placeholder="Masukan jumlah..."
            type="number"
            onChange={(e) => setJumlah(parseInt(e.target.value))}
          />

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
              Bayar
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
    id_transaksi: string;
    total_pembayaran: string;
    sisa: string;
  };
}) => {
  return {
    props: {
      ...query,
    },
  };
};
