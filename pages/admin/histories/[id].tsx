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
            size="sm"
            startContent={<ArrowLeft weight="bold" size={16} />}
            onClick={() => router.push("/admin/histories")}
            className="w-max bg-lime-500 font-semibold text-white"
          >
            Kembali ke Menu
          </Button>

          <Button
            size="sm"
            startContent={<Printer weight="bold" size={17} />}
            onClick={handlePrint}
            className="w-max bg-lime-500 font-semibold text-white"
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
  if (!params) {
    return {
      redirect: {
        destination: "/admin/histories",
      },
    };
  }

  const result = await fetcher({
    url: ("/transaksi?id=" + params.id) as string,
    method: "GET",
  });

  if (result.success) {
    const transaksi: TransaksiType = result.data as TransaksiType;

    return {
      props: {
        transaksi,
      },
    };
  }

  return {
    redirect: {
      destination: "/admin/histories",
    },
  };
}) satisfies GetServerSideProps<{ transaksi: TransaksiType }>;
