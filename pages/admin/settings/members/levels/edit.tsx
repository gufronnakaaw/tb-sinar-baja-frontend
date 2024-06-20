import { Button, Input, Spinner } from "@nextui-org/react";

// components
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";

import ButtonBack from "@/components/button/ButtonBack";
import { GlobalResponse } from "@/types/global.type";
import { LevelType } from "@/types/members";
import { fetcher } from "@/utils/fetcher";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

export default function WarehousesUpdate(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const router = useRouter();
  const [nama, setNama] = useState(props.level?.nama);
  const [loading, setLoading] = useState(false);

  async function handleUpdate() {
    setLoading(true);
    try {
      await fetcher({
        url: "/level",
        method: "PATCH",
        data: {
          id_level: props.level?.id_level,
          nama,
        },
      });
      alert("update berhasil");
      return router.back();
    } catch (error) {
      alert("ups sepertinya ada masalah pada server");
      console.log(error);
    }
  }

  return (
    <Layout title={`Update Level ${props.level?.nama}`}>
      <Container className="gap-12">
        <ButtonBack
          onClick={() => router.back()}
          className="justify-self-start text-teal-500"
        >
          Kembali
        </ButtonBack>

        <div className="grid gap-6">
          <Input
            defaultValue={nama}
            isRequired
            variant="flat"
            color="default"
            labelPlacement="outside"
            label="Nama Level"
            placeholder="Masukan nama level..."
            onChange={(e) => setNama(e.target.value)}
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
              Update
            </Button>
          )}
        </div>
      </Container>
    </Layout>
  );
}

export const getServerSideProps = (async ({ query }) => {
  const level: GlobalResponse<LevelType[]> = await fetcher({
    url: "/level",
    method: "GET",
  });

  return {
    props: {
      level: level.data.find((item) => item.id_level == query?.id_level),
    },
  };
}) satisfies GetServerSideProps<{ level: LevelType | undefined }>;
