import ButtonBack from "@/components/button/ButtonBack";
import { TemplatePreorder } from "@/components/template/TemplatePreorder";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";
import { GlobalResponse } from "@/types/global.type";
import { FinalDetail } from "@/types/preorders.type";
import { fetcher } from "@/utils/fetcher";
import { Button } from "@nextui-org/react";
import { Printer } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export const getServerSideProps = (async ({ query }) => {
  const preorder: GlobalResponse<FinalDetail> = await fetcher({
    url: "/preorder?id_preorder=" + query?.id_preorder,
    method: "GET",
  });

  return {
    props: {
      preorder: preorder.data,
    },
  };
}) satisfies GetServerSideProps<{ preorder: FinalDetail }>;

export default function PreorderDetail({
  preorder,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: preorder.id_preorder,
    content: () => componentRef.current,
  });

  return (
    <Layout title={`Detail Preorder ${preorder.id_preorder}`}>
      <Container className="gap-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <ButtonBack onClick={() => router.back()}>Kembali</ButtonBack>

          <div className="flex items-center gap-4 justify-self-end">
            <Button
              color="primary"
              startContent={<Printer weight="bold" size={17} />}
              className="w-max font-medium"
              onClick={handlePrint}
            >
              Cetak
            </Button>
          </div>
        </div>

        <TemplatePreorder {...preorder} ref={componentRef} />
      </Container>
    </Layout>
  );
}
