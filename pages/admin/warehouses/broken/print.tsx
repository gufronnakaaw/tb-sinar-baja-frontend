// components
import { TemplateBeritaAcara } from "@/components/template/TemplateBeritaAcara";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";
import { BrokenDetailType } from "@/types/broken.type";
import { GlobalResponse } from "@/types/global.type";
import { fetcher } from "@/utils/fetcher";
import { Button } from "@nextui-org/react";
import { ArrowLeft, Printer } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function BrokenPrint({
  broken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: broken.id_ba,
    content: () => componentRef.current,
  });

  return (
    <Layout title={`Print Berita Acara ${broken.id_ba}`}>
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
        <TemplateBeritaAcara {...broken} ref={componentRef} />
      </Container>
    </Layout>
  );
}

export const getServerSideProps = (async ({ query }) => {
  const result: GlobalResponse<BrokenDetailType> = await fetcher({
    url: "/beritaacara?id_ba=" + query?.id_ba,
    method: "GET",
  });

  return {
    props: {
      broken: result.data,
    },
  };
}) satisfies GetServerSideProps<{ broken: BrokenDetailType }>;
