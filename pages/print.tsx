import { TemplateNota } from "@/components/template/TemplateNota";
import { TransaksiType } from "@/types/transactions.type";
import { fetcher } from "@/utils/fetcher";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function PrintNota({
  transaksi,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    documentTitle: transaksi.id_transaksi,
    content: () => componentRef.current,
    onAfterPrint: () => window.close(),
  });

  useEffect(() => {
    handlePrint();
  }, [handlePrint]);

  return <TemplateNota {...transaksi} ref={componentRef} />;
}

export const getServerSideProps = (async ({ query }) => {
  const result = await fetcher({
    url: "/transaksi?id=" + query?.id_transaksi,
    method: "GET",
  });

  const transaksi: TransaksiType = result.data as TransaksiType;

  return {
    props: {
      transaksi,
    },
  };
}) satisfies GetServerSideProps<{ transaksi: TransaksiType }>;
