// components
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";

// utils

// dummy data
import { TemplateNota } from "@/components/template/TemplateNota";
import { TransaksiType } from "@/types/transactions.type";
import { fetcher } from "@/utils/fetcher";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";

export default function HistoriesPage({
  transaksi,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  return (
    <Layout title={`Detail Transaksi ${transaksi.id_transaksi}`}>
      <Container className="gap-8">
        <TemplateNota {...transaksi} />
      </Container>
    </Layout>
  );
}

export const getServerSideProps = (async ({ params }) => {
  if (!params) {
    return {
      redirect: {
        destination: "/owner/histories",
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
      destination: "/owner/histories",
    },
  };
}) satisfies GetServerSideProps<{ transaksi: TransaksiType }>;
