import { Button } from "@nextui-org/react";
import { ArrowLeft, Printer } from "@phosphor-icons/react";

// components
import { TemplateNota } from "@/components/template/TemplateNota";
import Layout from "@/components/wrapper/SecondaryLayout";
import { TransaksiType } from "@/types/transactions.type";
import { fetcher } from "@/utils/fetcher";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { useRouter } from "next/router";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function TransactionsDetail({
  transaksi,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const componentRef = useRef(null)
  const handlePrint = useReactToPrint({
    documentTitle: transaksi.id_transaksi,
    content: () => componentRef.current
  })

  return (
    <Layout title={`Detail Transaksi ${transaksi.id_transaksi}`}>
      <section className="py-24">
        <div className="container mt-8 grid gap-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Button
              variant="light"
              color="danger"
              size="sm"
              startContent={<ArrowLeft weight="bold" size={16} />}
              onClick={() => router.push("/cashier/menu/transactions")}
              className="w-max font-semibold"
            >
              Kembali ke Menu
            </Button>

            <Button
              color="danger"
              size="sm"
              startContent={<Printer weight="bold" size={17} />}
              onClick={handlePrint}
              className="w-max font-semibold"
            >
              Cetak Nota
            </Button>
          </div>

          <div className="grid gap-4">
            <TemplateNota {...transaksi} ref={componentRef}/>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getServerSideProps = (async ({
  params,
}: GetServerSidePropsContext) => {
  if (!params) {
    return {
      redirect: {
        destination: "/cashier/transactions",
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
      destination: "/cashier/menu/transactions",
    },
  };
}) satisfies GetServerSideProps<{ transaksi: TransaksiType }>;
