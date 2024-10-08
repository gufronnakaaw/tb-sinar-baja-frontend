import ButtonBack from "@/components/button/ButtonBack";
import { TemplateNotaReturnDetail } from "@/components/template/TemplateNotaReturnDetail";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";
import { GlobalResponse } from "@/types/global.type";
import { ReturnDetailPage } from "@/types/return.type";
import { fetcher } from "@/utils/fetcher";
import { Button } from "@nextui-org/react";
import { Printer } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function ReturnDetail({
  retur,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: retur.id_return,
    content: () => componentRef.current,
  });

  return (
    <Layout title={`Detail Retur ${retur.id_return}`}>
      <Container className="gap-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <ButtonBack onClick={() => router.back()}>Kembali</ButtonBack>

          <Button
            size="sm"
            startContent={<Printer weight="bold" size={17} />}
            onClick={handlePrint}
            className="w-max bg-primary font-semibold text-white"
          >
            Cetak
          </Button>
        </div>

        <TemplateNotaReturnDetail {...retur} ref={componentRef} />
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
