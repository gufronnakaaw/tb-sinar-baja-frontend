import ButtonBack from "@/components/button/ButtonBack";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";
import { GlobalResponse } from "@/types/global.type";
import { InvoutType } from "@/types/invoices.type";
import { fetcher } from "@/utils/fetcher";
import { formatDateWithoutTime } from "@/utils/formatDate";
import { getLocalTimeZone } from "@internationalized/date";
import { Button, DatePicker } from "@nextui-org/react";
import { I18nProvider } from "@react-aria/i18n";
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

export default function InvoutEdit({
  invout,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [jatuhTempo, setJatuhTempo] = useState("");

  async function updateInvout() {
    try {
      await fetcher({
        url: "/invoice/out",
        method: "PATCH",
        data: {
          invoice_id: invout.id_invoice,
          jatuh_tempo: jatuhTempo,
        },
      });
      alert("update invoice berhasil");

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
    <Layout title="Edit">
      <Container className="gap-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <ButtonBack
            onClick={() => router.back()}
            className="justify-self-start text-teal-500"
          >
            Kembali
          </ButtonBack>
        </div>

        <I18nProvider locale="id-ID">
          <DatePicker
            isRequired
            label="Jatuh Tempo"
            labelPlacement="outside"
            onChange={(e) => {
              const str = e.toDate(getLocalTimeZone()).toString();
              setJatuhTempo(formatDateWithoutTime(str));
            }}
          />
        </I18nProvider>
        <Button
          variant="solid"
          size="md"
          className="w-max justify-self-end bg-teal-500 font-medium text-white"
          onClick={updateInvout}
        >
          Update
        </Button>
      </Container>
    </Layout>
  );
}
