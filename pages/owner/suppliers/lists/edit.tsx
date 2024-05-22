import { Button, Input, Spinner, Textarea } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useState } from "react";

// components & utils
import ButtonBack from "@/components/button/ButtonBack";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";
import { GlobalResponse } from "@/types/global.type";
import { fetcher } from "@/utils/fetcher";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

type SupplierType = {
  id_supplier: string;
  nama: string;
  email: string;
  no_telp: string;
  alamat_kantor: string;
  alamat_gudang: string;
  keterangan: string;
  bank: string;
  atas_nama: string;
  no_rekening: string;
  created_at: string;
};

export default function SupplierEdit({
  supplier,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [input, setInput] = useState({});
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleUpdate() {
    setLoading(true);
    try {
      await fetcher({
        url: "/supplier",
        method: "PATCH",
        data: {
          id_supplier: supplier?.id_supplier,
          ...input,
        },
      });
      setLoading(false);
      alert("update berhasil");
      return router.push("/owner/suppliers/lists");
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
    <Layout title="Update Supplier">
      <Container className="gap-12">
        <ButtonBack onClick={() => router.push("/owner/suppliers/lists")}>
          Kembali
        </ButtonBack>

        <div className="grid gap-8">
          <div className="grid gap-4">
            <div className="grid grid-cols-3 gap-2">
              <Input
                defaultValue={supplier?.nama}
                isRequired
                variant="flat"
                color="default"
                labelPlacement="outside"
                label="Nama Supplier"
                name="nama"
                placeholder="Ex: Supplier 1"
                onChange={(e) => {
                  setInput({
                    ...input,
                    [e.target.name]: e.target.value,
                  });
                }}
              />

              <Input
                defaultValue={supplier?.email}
                isRequired
                variant="flat"
                color="default"
                labelPlacement="outside"
                label="Email"
                name="email"
                placeholder="Ex: sup1@mail.com"
                onChange={(e) => {
                  setInput({
                    ...input,
                    [e.target.name]: e.target.value,
                  });
                }}
              />

              <Input
                defaultValue={supplier?.no_telp}
                isRequired
                variant="flat"
                color="default"
                labelPlacement="outside"
                label="No Telpon"
                name="no_telp"
                placeholder="Ex: 081122334455"
                onChange={(e) => {
                  setInput({
                    ...input,
                    [e.target.name]: e.target.value,
                  });
                }}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Textarea
                defaultValue={supplier?.alamat_kantor}
                type="text"
                size="sm"
                variant="flat"
                maxRows={3}
                labelPlacement="outside"
                label={
                  <span className="text-[12px] text-default-900">
                    Alamat Kantor
                  </span>
                }
                placeholder="Ex: Jln Mawar"
                className="w-full text-black"
                name="alamat_kantor"
                onChange={(e) => {
                  setInput({
                    ...input,
                    [e.target.name]: e.target.value,
                  });
                }}
              />

              <Textarea
                defaultValue={supplier?.alamat_gudang}
                type="text"
                size="sm"
                variant="flat"
                maxRows={3}
                labelPlacement="outside"
                label={
                  <span className="text-[12px] text-default-900">
                    Alamat Gudang
                  </span>
                }
                placeholder="Ex: Jln Melati"
                className="w-full text-black"
                name="alamat_gudang"
                onChange={(e) => {
                  setInput({
                    ...input,
                    [e.target.name]: e.target.value,
                  });
                }}
              />
            </div>

            <Textarea
              defaultValue={supplier?.keterangan}
              type="text"
              size="sm"
              variant="flat"
              maxRows={3}
              labelPlacement="outside"
              label={
                <span className="text-[12px] text-default-900">Keterangan</span>
              }
              name="keterangan"
              placeholder="Ex: Supplier Aluminium"
              className="w-full text-black"
              onChange={(e) => {
                setInput({
                  ...input,
                  [e.target.name]: e.target.value,
                });
              }}
            />

            <div className="grid grid-cols-3 gap-2">
              <Input
                defaultValue={supplier?.bank}
                isRequired
                variant="flat"
                color="default"
                labelPlacement="outside"
                label="Bank"
                name="bank"
                placeholder="Ex: BCA"
                onChange={(e) => {
                  setInput({
                    ...input,
                    [e.target.name]: e.target.value,
                  });
                }}
              />

              <Input
                defaultValue={supplier?.atas_nama}
                isRequired
                variant="flat"
                color="default"
                labelPlacement="outside"
                label="Atas Nama"
                name="atas_nama"
                placeholder="Ex: John Doe"
                onChange={(e) => {
                  setInput({
                    ...input,
                    [e.target.name]: e.target.value,
                  });
                }}
              />

              <Input
                defaultValue={supplier?.no_rekening}
                isRequired
                variant="flat"
                color="default"
                labelPlacement="outside"
                label="Nomor Rekening"
                name="no_rekening"
                placeholder="Ex: 09090808"
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
              color="primary"
              variant="solid"
              size="md"
              className="w-max justify-self-end font-semibold"
            >
              <Spinner color="default" size="sm" />
            </Button>
          ) : (
            <Button
              variant="solid"
              color="primary"
              size="md"
              onClick={handleUpdate}
              className="w-max justify-self-end font-semibold"
            >
              Update Supplier
            </Button>
          )}
        </div>
      </Container>
    </Layout>
  );
}

export const getServerSideProps = (async ({ query }) => {
  const result = await fetcher({
    url: "/supplier",
    method: "GET",
  });

  const supplier: GlobalResponse<SupplierType[]> = result;

  const filter = supplier.data.find(
    (item) => item.id_supplier == query?.id_supplier,
  );

  return {
    props: {
      supplier: filter,
    },
  };
}) satisfies GetServerSideProps<{ supplier: SupplierType | undefined }>;
