import { Button } from "@nextui-org/react";
import { ArrowLeft } from "@phosphor-icons/react";

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

export default function TransactionsDetail({
  transaksi,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  console.log(transaksi);

  return (
    <Layout title={`Detail Transaksi ${transaksi.id_transaksi}`}>
      <section className="py-24">
        <div className="container mt-8 grid gap-12">
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

          <div className="grid gap-4">
            <TemplateNota {...transaksi} />
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
