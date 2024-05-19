// components
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";

// utils

// dummy data
import { TemplateNota } from "@/components/template/TemplateNota";
import { TransaksiType } from "@/types/transactions.type";
import { fetcher } from "@/utils/fetcher";
import { Button } from "@nextui-org/react";
import { ArrowLeft, Printer } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function HistoriesPage({
  transaksi,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: transaksi.id_transaksi,
    content: () => componentRef.current,
  });

  return (
    <Layout title={`Detail Transaksi ${transaksi.id_transaksi}`}>
      <Container className="gap-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Button
            variant="light"
            color="primary"
            size="sm"
            startContent={<ArrowLeft weight="bold" size={16} />}
            onClick={() => router.push("/owner/histories")}
            className="w-max font-semibold"
          >
            Kembali ke Menu
          </Button>

          <Button
            color="primary"
            size="sm"
            startContent={<Printer weight="bold" size={17} />}
            onClick={handlePrint}
            className="w-max font-semibold"
          >
            Cetak Nota
          </Button>
        </div>
        <TemplateNota {...transaksi} ref={componentRef} />
      </Container>
    </Layout>
  );
}

export const getServerSideProps = (async ({ params }) => {
  const result = await fetcher({
    url: "/transaksi?id=" + params?.id,
    method: "GET",
  });

  const transaksi: TransaksiType = result.data as TransaksiType;

  return {
    props: {
      transaksi,
    },
  };
}) satisfies GetServerSideProps<{ transaksi: TransaksiType }>;
