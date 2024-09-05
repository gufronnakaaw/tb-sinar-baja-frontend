import ProfitTable from "@/components/tables/ProfitTable";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";
import { GlobalResponse } from "@/types/global.type";
import { ProfitType } from "@/types/profit.type";
import { fetcher } from "@/utils/fetcher";
import { formatDayWithoutTime } from "@/utils/formatDate";
import { formatRupiah } from "@/utils/formatRupiah";
import { Button, Pagination } from "@nextui-org/react";
import { ArrowRight } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";

const startDate = "2024-07-01";

export default function OmzetPage({
  profit,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  return (
    <Layout title="Halaman Omzet">
      <Container className="gap-8">
        <h4 className="text-lg font-semibold capitalize text-default-900">
          Omzet
        </h4>

        <div className="grid justify-center justify-items-center gap-4 rounded-xl border-[2px] border-default-200 p-8">
          <div className="text-center">
            <h4 className="text-sm font-medium text-default-900">
              Total omzet hari ini,
            </h4>
            <p className="text-[12px] font-medium text-primary">
              {formatDayWithoutTime(new Date())}
            </p>
          </div>

          <div className="py-2 text-[42px] font-bold text-default-900">
            {formatRupiah(profit.today.total)}
          </div>

          <Button
            color="default"
            variant="flat"
            size="sm"
            endContent={<ArrowRight weight="bold" size={18} />}
            className="w-max px-6 font-semibold"
            isDisabled={!profit.today.total}
            onClick={() =>
              router.push(`/owner/finance/omzet/${profit.today.tanggal}`)
            }
          >
            Detail Transaksi
          </Button>
        </div>

        <div className="grid gap-3">
          <h6 className="text-sm font-semibold text-default-900">
            Omzet 7 Hari Terakhir
          </h6>

          <ProfitTable profit={profit} role="owner" />

          <Pagination
            isCompact
            showControls
            color="primary"
            page={profit.page}
            total={Math.ceil(profit.total_items / 7)}
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

  const result: GlobalResponse<ProfitType> = await fetcher({
    url: `/keuangan/omzet?start=${startDate}&page=${page}`,
    method: "GET",
  });

  return {
    props: {
      profit: result.data,
    },
  };
}) satisfies GetServerSideProps<{
  profit: ProfitType;
}>;
