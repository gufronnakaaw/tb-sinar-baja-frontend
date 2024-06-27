import ButtonBack from "@/components/button/ButtonBack";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";
import { GlobalResponse } from "@/types/global.type";
import { InvoutType } from "@/types/invoices.type";
import { fetcher } from "@/utils/fetcher";
import { formatRupiah } from "@/utils/formatRupiah";
import { Button, Input, Radio, RadioGroup } from "@nextui-org/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

export const getServerSideProps = (async ({ query }) => {
  const invout: GlobalResponse<InvoutType> = await fetcher({
    url: "/invoice/out?id_invoice=" + query?.id_invoice,
    method: "GET",
  });

  return {
    props: {
      invout: invout.data,
    },
  };
}) satisfies GetServerSideProps<{ invout: InvoutType }>;

export default function InvoutHistories({
  invout,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const [input, setInput] = useState<any>({});
  const [metode, setMetode] = useState("transfer");

  async function createPayment() {
    if (input.jumlah > invout.sisa) {
      return alert("jumlah tidak boleh melebihi sisa tagihan");
    }

    try {
      await fetcher({
        url: "/invoice/out/payment",
        method: "POST",
        data: {
          invoice_id: invout.id_invoice,
          ...input,
          tipe: metode,
        },
      });

      alert("bayar invoice berhasil");

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
    <Layout title="Pembayaran">
      <Container className="gap-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <ButtonBack onClick={() => router.back()}>Kembali</ButtonBack>
        </div>

        <div className="grid w-max gap-2 border-l-4 border-primary p-[1rem_0_1rem_1rem]">
          <h4 className="text-[18px] font-bold text-default-900">
            Informasi Invoice
          </h4>

          <div className="grid gap-[2px]">
            <div className="grid grid-cols-[170px_10px_10fr]  gap-1 text-sm text-default-900">
              <div className="text-sm font-medium text-default-600">
                ID Invoice
              </div>
              <div className="font-medium">:</div>
              <p className="font-bold text-primary">{invout.id_invoice}</p>
            </div>
            <div className="grid grid-cols-[170px_10px_10fr]  gap-1 text-sm text-default-900">
              <div className="text-sm font-medium text-default-600">
                ID Transaksi
              </div>
              <div className="font-medium">:</div>
              <p className="font-bold text-primary">
                {invout.transaksi.id_transaksi}
              </p>
            </div>
            <div className="grid grid-cols-[170px_10px_10fr]  gap-1 text-sm text-default-900">
              <div className="grid text-sm font-medium text-default-600">
                Tagihan
              </div>
              <div className="font-medium">:</div>
              <p className="font-bold text-primary">
                {formatRupiah(invout.tagihan)}
              </p>
            </div>
            <div className="grid grid-cols-[170px_10px_10fr]  gap-1 text-sm text-default-900">
              <div className="grid text-sm font-medium text-default-600">
                Sisa
              </div>
              <div className="font-medium">:</div>
              <p className="font-bold text-primary">
                {formatRupiah(invout.sisa)}
              </p>
            </div>
          </div>
        </div>

        <RadioGroup
          defaultValue={metode}
          label="Pilih Metode Pembayaran"
          orientation="horizontal"
          isRequired
          onValueChange={(e) => {
            setInput({});
            setMetode(e);
          }}
        >
          <Radio value="cash">Cash</Radio>
          <Radio value="transfer">Transfer</Radio>
        </RadioGroup>

        {metode == "transfer" ? (
          <div className="grid gap-4">
            <Input
              isRequired
              variant="flat"
              color="default"
              label="Jumlah"
              labelPlacement="outside"
              name="jumlah"
              placeholder="Ex: Rp200.000"
              type="number"
              onChange={(e) => {
                setInput({
                  ...input,
                  [e.target.name]: parseInt(e.target.value),
                  sisa: invout.tagihan - parseInt(e.target.value),
                });
              }}
            />
            <div className="grid grid-cols-4 gap-3">
              <Input
                variant="flat"
                color="default"
                label="ID Transaksi Bank"
                labelPlacement="outside"
                name="id_transaksi"
                placeholder="Ex: 20241006123123"
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
                color="default"
                label="Nama Bank"
                labelPlacement="outside"
                name="nama_bank"
                placeholder="Ex: BCA"
                onChange={(e) => {
                  setInput({
                    ...input,
                    [e.target.name]: e.target.value,
                  });
                }}
              />

              <Input
                variant="flat"
                color="default"
                label="Atas Nama"
                labelPlacement="outside"
                name="atas_nama"
                placeholder="Ex: William"
                onChange={(e) => {
                  setInput({
                    ...input,
                    [e.target.name]: e.target.value,
                  });
                }}
              />

              <Input
                variant="flat"
                color="default"
                label="Nomor Rekening"
                labelPlacement="outside"
                name="no_rekening"
                placeholder="Ex: 123123"
                onChange={(e) => {
                  setInput({
                    ...input,
                    [e.target.name]: e.target.value,
                  });
                }}
              />
            </div>
          </div>
        ) : (
          <Input
            isRequired
            variant="flat"
            color="default"
            label="Jumlah"
            labelPlacement="outside"
            name="jumlah"
            placeholder="Ex: Rp200.000"
            type="number"
            onChange={(e) => {
              setInput({
                ...input,
                [e.target.name]: parseInt(e.target.value),
                sisa: invout.tagihan - parseInt(e.target.value),
              });
            }}
          />
        )}

        <Button
          variant="solid"
          size="md"
          className="w-max justify-self-end bg-primary font-medium text-white"
          onClick={createPayment}
        >
          Bayar
        </Button>
      </Container>
    </Layout>
  );
}
