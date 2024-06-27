import ButtonBack from "@/components/button/ButtonBack";
import { TemplateInvoice } from "@/components/template/TemplateInvoice";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";
import { GlobalResponse } from "@/types/global.type";
import { InvoutType } from "@/types/invoices.type";
import { fetcher } from "@/utils/fetcher";
import { Button } from "@nextui-org/react";
import { Printer } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

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
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: invout.id_invoice,
    content: () => componentRef.current,
  });

  return (
    <Layout title={`Detail Invoice ${invout.id_invoice}`}>
      <Container className="gap-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <ButtonBack
            onClick={() => router.back()}
            className="justify-self-start text-teal-500"
          >
            Kembali
          </ButtonBack>

          <Button
            size="sm"
            startContent={<Printer weight="bold" size={17} />}
            className="w-max bg-teal-500 font-semibold text-white"
            onClick={handlePrint}
          >
            Cetak
          </Button>
        </div>

        <TemplateInvoice {...invout} ref={componentRef} />
      </Container>
    </Layout>
  );
}
