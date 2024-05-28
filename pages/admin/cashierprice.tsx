// components
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";
import { GlobalResponse } from "@/types/global.type";
import { fetcher } from "@/utils/fetcher";
import { Button, Select, SelectItem, Spinner } from "@nextui-org/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

type Harga = {
  harga_1: string;
  harga_2: string;
  harga_3: string;
  harga_4: string;
  harga_5: string;
  harga_6: string;
};

export default function CashierPricePage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const [loading, setLoading] = useState(false);
  const [field, setField] = useState(props.field);
  const router = useRouter();

  const harga = {
    harga_1: "Harga Distributor",
    harga_2: "Harga Agen",
    harga_3: "Harga Grosir",
    harga_4: "Harga Toko",
    harga_5: "Harga Aplikator",
    harga_6: "Harga Retail",
  };

  const result = [];

  for (const key in harga) {
    result.push(
      <SelectItem key={key} value={key}>
        {harga[key as keyof Harga]}
      </SelectItem>,
    );
  }

  async function handleUpdate() {
    setLoading(true);
    try {
      await fetcher({
        url: "/setting",
        method: "PATCH",
        data: {
          field,
        },
      });

      alert("update harga kasir berhasil");
      return router.reload();
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
    <Layout title="Pengaturan Harga Kasir">
      <Container className="gap-8">
        <div className="grid gap-4">
          <div className="grid w-max gap-2 border-l-4 border-lime-500 p-[1rem_0_1rem_1rem]">
            <h4 className="text-[18px] font-bold text-default-900">
              Informasi
            </h4>

            <div className="grid gap-[2px]">
              <div className="grid grid-cols-[220px_10px_5fr]  gap-1 text-sm text-default-900">
                <div className="text-sm font-medium text-default-600">
                  Harga yang saat ini digunakan
                </div>
                <div className="font-medium">:</div>
                <p className="font-bold text-lime-500">
                  {harga[props.field as keyof Harga]} {`(${props.field})`}
                </p>
              </div>
            </div>
          </div>

          <Select
            label="Pilih Harga"
            defaultSelectedKeys={[field]}
            onChange={(e) => setField(e.target.value)}
          >
            {result}
          </Select>

          {loading ? (
            <Button
              variant="solid"
              startContent={<Spinner color="white" size="sm" />}
              className={`${loading ? "cursor-not-allowed justify-self-end bg-lime-500 font-medium text-white" : ""}`}
            >
              Tunggu
            </Button>
          ) : (
            <Button
              variant="solid"
              size="md"
              onClick={handleUpdate}
              className="w-max justify-self-end bg-lime-500 font-medium text-white"
            >
              Update
            </Button>
          )}
        </div>
      </Container>
    </Layout>
  );
}

export const getServerSideProps = (async () => {
  const result: GlobalResponse<{ field: string }> = await fetcher({
    url: "/setting",
    method: "GET",
  });

  return {
    props: {
      field: result.data.field,
    },
  };
}) satisfies GetServerSideProps<{ field: string }>;
