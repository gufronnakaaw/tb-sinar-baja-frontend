import { Button } from "@nextui-org/react";
import { ArrowLeft } from "@phosphor-icons/react";
import { useRouter } from "next/router";

// components
import InputSearchBar from "@/components/input/InputSearchBar";
import Layout from "@/components/wrapper/SecondaryLayout";

// utils
import { TransaksiType } from "@/types/transactions.type";
import { fetcher } from "@/utils/fetcher";

import LoadingScreen from "@/components/LoadingScreen";
import HistoriesTable from "@/components/tables/HistoriesTable";
import { GlobalResponse } from "@/types/global.type";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useSession } from "next-auth/react";
import { useState } from "react";
import useSWR, { KeyedMutator } from "swr";

export const getServerSideProps = (async () => {
  const result = await fetcher({
    url: "/transaksi",
    method: "GET",
  });

  const transaksi: GlobalResponse<TransaksiType[]> = result;

  return {
    props: {
      transaksi,
    },
  };
}) satisfies GetServerSideProps<{ transaksi: GlobalResponse<TransaksiType[]> }>;

export default function TransactionsPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const [search, setSearch] = useState("");
  const swr = useSWR<GlobalResponse<TransaksiType[]>>(
    {
      url: "/transaksi",
      method: "GET",
    },
    fetcher,
    {
      fallbackData: props.transaksi,
      refreshInterval: 15000,
    },
  );
  const session = useSession();

  if (swr.isLoading) {
    return <LoadingScreen role="cashier" />;
  }

  if (swr.error) {
    console.log(swr.error);
  }

  const filter = swr.data?.data.filter((item) => {
    return item.id_transaksi.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <SubComponentTransactionsPage
      {...{ transaksi: filter, setSearch, session, mutate: swr.mutate }}
    />
  );
}

function SubComponentTransactionsPage({
  transaksi,
  setSearch,
  session,
  mutate,
}: {
  transaksi: TransaksiType[] | undefined;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  session: any;
  mutate: KeyedMutator<any>;
}) {
  const router = useRouter();

  return (
    <Layout title="Daftar Transaksi">
      <section className="py-24">
        <div className="container mt-8 grid gap-8">
          <Button
            variant="light"
            color="danger"
            size="sm"
            startContent={<ArrowLeft weight="bold" size={16} />}
            onClick={() => router.push("/cashier/menu")}
            className="w-max font-semibold"
          >
            Kembali ke Menu
          </Button>

          <div className="grid gap-4">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h4 className="text-center text-lg font-semibold text-default-900">
                Daftar Transaksi
              </h4>

              <InputSearchBar
                placeholder="Cari ID Transaksi"
                className="w-full sm:max-w-[500px]"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {session.status === "authenticated" && (
              <HistoriesTable
                transaksi={transaksi}
                path="/cashier/menu/transactions"
                mutate={mutate}
                roles={session.data.user.role}
              />
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
