import ButtonBack from "@/components/button/ButtonBack";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";
import { GlobalResponse } from "@/types/global.type";
import { InvoiceDetail } from "@/types/invoice.type";
import { FinalDetail } from "@/types/preorders.type";
import { SupplierBank } from "@/types/suppliers.type";
import { fetcher } from "@/utils/fetcher";
import { formatRupiah } from "@/utils/formatRupiah";
import {
  Button,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const getServerSideProps = (async ({ query }) => {
  const invoice: GlobalResponse<InvoiceDetail> = await fetcher({
    url: "/invoice?id_invoice=" + query?.id_invoice,
    method: "GET",
  });

  return {
    props: {
      invoice: invoice.data,
    },
  };
}) satisfies GetServerSideProps<{ invoice: InvoiceDetail }>;

export default function CreatePayment({
  invoice,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [input, setInput] = useState<any>({});
  const [metode, setMetode] = useState("transfer");

  const [supplierBank, setSupplierBank] = useState<SupplierBank[]>([]);

  useEffect(() => {
    if (invoice.sumber == "supplier") {
      getSupplierBank(invoice.preorder_id);
    }
  }, [invoice]);

  async function getSupplierBank(id_preorder: string) {
    try {
      const preorder: GlobalResponse<FinalDetail> = await fetcher({
        url: "/preorder?id_preorder=" + id_preorder,
        method: "GET",
      });

      const bank: GlobalResponse<SupplierBank[]> = await fetcher({
        url: "/supplier/bank?id_supplier=" + preorder.data.supplier_id,
        method: "GET",
      });

      setSupplierBank(bank.data);
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

  async function createPayment() {
    if (input.jumlah > invoice.sisa) {
      return alert("jumlah tidak boleh melebihi sisa tagihan");
    }

    try {
      await fetcher({
        url: "/invoice/payment",
        method: "POST",
        data: {
          invoice_id: invoice.id_invoice,
          ...input,
          tipe: metode,
          sumber: invoice.sumber,
        },
      });

      alert("bayar invoice berhasil");

      return router.push(
        "/owner/purchases/invin/histories?id_invoice=" + invoice.id_invoice,
      );
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
    <Layout title="Buat Pembayaran">
      <Container className="gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <ButtonBack onClick={() => router.back()}>Kembali</ButtonBack>
        </div>

        <div className="grid gap-6">
          <div className="grid w-max gap-2 border-l-4 border-primary p-[1rem_0_1rem_1rem]">
            <h4 className="text-[18px] font-bold text-default-900">
              Informasi Invoice
            </h4>

            <div className="grid gap-[2px]">
              <div className="grid grid-cols-[170px_10px_10fr]  gap-1 text-sm text-default-900">
                <div className="text-sm font-medium text-default-600">
                  Nomor Invoice
                </div>
                <div className="font-medium">:</div>
                <p className="font-bold text-primary">
                  {invoice.nomor_invoice}
                </p>
              </div>
              <div className="grid grid-cols-[170px_10px_10fr]  gap-1 text-sm text-default-900">
                <div className="text-sm font-medium text-default-600">
                  ID Preorder
                </div>
                <div className="font-medium">:</div>
                <p className="font-bold text-primary">{invoice.preorder_id}</p>
              </div>
              <div className="grid grid-cols-[170px_10px_10fr]  gap-1 text-sm text-default-900">
                <div className="text-sm font-medium text-default-600">
                  Tujuan Preorder
                </div>
                <div className="font-medium">:</div>
                <p className="font-bold capitalize text-primary">
                  {invoice.nama_supplier}
                </p>
              </div>
              <div className="grid grid-cols-[170px_10px_10fr]  gap-1 text-sm text-default-900">
                <div className="text-sm font-medium text-default-600">
                  Sumber Preorder
                </div>
                <div className="font-medium">:</div>
                <p className="font-bold capitalize text-primary">
                  {invoice.sumber.split("_").join(" ")}
                </p>
              </div>
              <div className="grid grid-cols-[170px_10px_10fr]  gap-1 text-sm text-default-900">
                <div className="grid text-sm font-medium text-default-600">
                  Tagihan
                </div>
                <div className="font-medium">:</div>
                <p className="font-bold text-primary">
                  {formatRupiah(invoice.tagihan)}
                </p>
              </div>
              <div className="grid grid-cols-[170px_10px_10fr]  gap-1 text-sm text-default-900">
                <div className="grid text-sm font-medium text-default-600">
                  Sisa
                </div>
                <div className="font-medium">:</div>
                <p className="font-bold text-primary">
                  {formatRupiah(invoice.sisa)}
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

          {metode == "cash" ? (
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
                  sisa: invoice.tagihan - parseInt(e.target.value),
                });
              }}
            />
          ) : (
            <div className="grid gap-4">
              {invoice.sumber == "non_supplier" ? (
                <div className="grid grid-cols-3 gap-3">
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
                </div>
              ) : null}

              <div className="grid grid-cols-2 gap-4">
                {invoice.sumber == "non_supplier" ? (
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
                ) : (
                  <Select
                    isRequired
                    label="Pilih Bank"
                    className="w-full"
                    labelPlacement="outside"
                    name="bank_id"
                  >
                    {supplierBank.map((bank) => {
                      return (
                        <SelectItem key={bank.id_table}>{bank.nama}</SelectItem>
                      );
                    })}
                  </Select>
                )}

                <Input
                  isRequired
                  variant="flat"
                  color="default"
                  label="Jumlah"
                  labelPlacement="outside"
                  name="jumlah"
                  placeholder="Ex: Rp200.000"
                  onChange={(e) => {
                    setInput({
                      ...input,
                      [e.target.name]: parseInt(e.target.value),
                      sisa: invoice.tagihan - parseInt(e.target.value),
                    });
                  }}
                  type="number"
                />
              </div>
            </div>
          )}

          <Button
            variant="solid"
            color="primary"
            size="md"
            className="w-max justify-self-end font-medium"
            onClick={createPayment}
          >
            Bayar
          </Button>
        </div>
      </Container>
    </Layout>
  );
}
