// components
import InputSearchBar from "@/components/input/InputSearchBar";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";

// utils
import LoadingScreen from "@/components/LoadingScreen";
import HistoriesTable from "@/components/tables/HistoriesTable";
import { GlobalResponse } from "@/types/global.type";
import { TransaksiType } from "@/types/transactions.type";
import { InferGetServerSidePropsType } from "next";
import { useState } from "react";
import useSWR from "swr";

function getRole(role: string) {
  if (!role) return "kasir";
  if (role == "kasir") return "kasir";
  if (role == "admin") return "admin";
}

export const getServerSideProps = ({ query }: { query: { role: string } }) => {
  return {
    props: {
      role: getRole(query.role),
    },
  };
};

export default function OwnerHistoriesPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const [search, setSearch] = useState("");
  const swr = useSWR<GlobalResponse<TransaksiType[]>>({
    url: `/transaksi?role=${props.role}`,
    method: "GET",
  });

  if (swr.isLoading) {
    return <LoadingScreen role="admin" />;
  }

  if (swr.error) {
    console.log(swr.error);
  }

  const filter = swr.data?.data.filter((item) => {
    return item.id_transaksi.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <Layout title="Daftar Transaksi">
      <Container className="gap-8">
        <h4 className="text-lg font-semibold capitalize text-default-900">
          Riwayat Transaksi {props.role}
        </h4>

        <div className="grid gap-4">
          <InputSearchBar
            placeholder="Cari ID Transaksi"
            className="w-full sm:max-w-[500px]"
            onChange={(e) => setSearch(e.target.value)}
          />

          <HistoriesTable
            transaksi={filter}
            path="/owner/selling/histories"
            role={props.role}
          />
        </div>
      </Container>
    </Layout>
  );
}
