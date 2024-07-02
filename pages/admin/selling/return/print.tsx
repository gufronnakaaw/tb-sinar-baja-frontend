// components
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";

// utils

// dummy data
import { TemplateNotaReturn } from "@/components/template/TemplateNotaReturn";
import { GlobalResponse } from "@/types/global.type";
import { ReturnDetailPage } from "@/types/return.type";
import { fetcher } from "@/utils/fetcher";
import { Button } from "@nextui-org/react";
import { ArrowLeft, Printer } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function ReturnPrint({
  retur,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: retur.id_return,
    content: () => componentRef.current,
  });

  return (
    <Layout title={`Cetak Retur ${retur.id_return}`}>
      <Container className="gap-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Button
            variant="light"
            size="sm"
            startContent={<ArrowLeft weight="bold" size={16} />}
            onClick={() => router.back()}
            className="w-max font-semibold text-teal-500"
          >
            Kembali
          </Button>

          <Button
            size="sm"
            startContent={<Printer weight="bold" size={17} />}
            onClick={handlePrint}
            className="w-max bg-teal-500 font-semibold text-white"
          >
            Cetak
          </Button>
        </div>

        <TemplateNotaReturn {...retur} ref={componentRef} />
      </Container>
    </Layout>
  );
}

export const getServerSideProps = (async ({ query }) => {
  const result: GlobalResponse<ReturnDetailPage> = await fetcher({
    url: "/return?id_return=" + query?.id_retur,
    method: "GET",
  });
  return {
    props: {
      retur: result.data,
    },
  };
}) satisfies GetServerSideProps<{ retur: ReturnDetailPage }>;
