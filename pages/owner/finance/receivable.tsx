import ReceivableTable from "@/components/tables/ReceivableTable";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";
import { GlobalResponse } from "@/types/global.type";
import { ReceivableType } from "@/types/receivable.type";
import { fetcher } from "@/utils/fetcher";
import { formatRupiah } from "@/utils/formatRupiah";
import { Pagination } from "@nextui-org/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";

export default function ReceivablePage({
  receivable,
  total_items,
  page,
  total,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  return (
    <Layout title="Halaman Piutang">
      <Container className="gap-8">
        <h4 className="text-lg font-semibold capitalize text-default-900">
          Piutang
        </h4>

        <div className="grid justify-center justify-items-center gap-4 rounded-xl border-[2px] border-default-200 p-8">
          <div className="text-center">
            <h4 className="text-sm font-medium text-default-900">
              Total piutang yang belum dibayarkan,
            </h4>
          </div>

          <div className="text-[42px] font-bold text-default-900">
            {formatRupiah(total)}
          </div>
        </div>

        <div className="grid gap-3">
          <h6 className="text-sm font-semibold text-default-900">
            Daftar Pembelian Tempo
          </h6>

          <ReceivableTable receivable={receivable} role="owner" />

          <Pagination
            isCompact
            showControls
            color="primary"
            page={page}
            total={Math.ceil(total_items / 7)}
            onChange={(e) =>
              router.push({
                query: {
                  page: e,
                },
              })
            }
            className="justify-self-center"
            classNames={{
              cursor: "bg-primary",
            }}
          />
        </div>
      </Container>
    </Layout>
  );
}

export const getServerSideProps = (async ({ query }) => {
  const page = !query?.page ? 1 : query.page;

  const result: GlobalResponse<{
    transaksi: ReceivableType[];
    total_items: number;
    page: number;
    total: number;
  }> = await fetcher({
    url: `/keuangan/receivable?page=${page}`,
    method: "GET",
  });

  return {
    props: {
      receivable: result.data.transaksi,
      total_items: result.data.total_items,
      page: result.data.page,
      total: result.data.total,
    },
  };
}) satisfies GetServerSideProps<{
  receivable: ReceivableType[];
  total_items: number;
  page: number;
}>;
