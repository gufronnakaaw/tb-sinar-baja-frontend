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

        <div className="grid gap-4">
          <div className="grid grid-cols-3 gap-4">
            <Input
              isRequired
              variant="flat"
              color="default"
              label="Nama Supplier"
              labelPlacement="outside"
              name="nama"
              placeholder="Ex: Supplier 1"
              defaultValue={supplier?.nama}
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
              label="Email"
              labelPlacement="outside"
              name="email"
              placeholder="Ex: sup1@mail.com"
              defaultValue={supplier?.email}
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
              label="No Telpon"
              labelPlacement="outside"
              name="no_telp"
              placeholder="Ex: 081122334455"
              defaultValue={supplier?.no_telp}
              onChange={(e) => {
                setInput({
                  ...input,
                  [e.target.name]: e.target.value,
                });
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Textarea
              isRequired
              variant="flat"
              maxRows={3}
              label="Alamat Kantor"
              labelPlacement="outside"
              name="alamat_kantor"
              placeholder="Ex: Jln Mawar"
              defaultValue={supplier?.alamat_kantor}
              onChange={(e) => {
                setInput({
                  ...input,
                  [e.target.name]: e.target.value,
                });
              }}
            />

            <Textarea
              isRequired
              variant="flat"
              maxRows={3}
              label="Alamat Gudang"
              labelPlacement="outside"
              name="alamat_gudang"
              placeholder="Ex: Jln Melati"
              defaultValue={supplier?.alamat_gudang}
              onChange={(e) => {
                setInput({
                  ...input,
                  [e.target.name]: e.target.value,
                });
              }}
            />
          </div>

          <Textarea
            isRequired
            variant="flat"
            maxRows={3}
            label="Keterangan"
            labelPlacement="outside"
            name="keterangan"
            placeholder="Ex: Supplier Aluminium"
            defaultValue={supplier?.keterangan}
            onChange={(e) => {
              setInput({
                ...input,
                [e.target.name]: e.target.value,
              });
            }}
          />

          <div className="grid grid-cols-3 gap-4">
            <Input
              isRequired
              variant="flat"
              color="default"
              label="Bank"
              labelPlacement="outside"
              name="bank"
              placeholder="Ex: BCA"
              defaultValue={supplier?.bank}
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
              label="Atas Nama"
              labelPlacement="outside"
              name="atas_nama"
              placeholder="Ex: John Doe"
              defaultValue={supplier?.atas_nama}
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
              label="Nomor Rekening"
              labelPlacement="outside"
              name="no_rekening"
              placeholder="Ex: 09090808"
              defaultValue={supplier?.no_rekening}
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
            color="primary"
            startContent={<Spinner color="white" size="sm" />}
            className={`${loading ? "cursor-not-allowed justify-self-end font-medium" : ""}`}
          >
            Tunggu
          </Button>
        ) : (
          <Button
            variant="solid"
            color="primary"
            size="md"
            onClick={handleUpdate}
            className="w-max justify-self-end font-medium"
          >
            Update Supplier
          </Button>
        )}
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
