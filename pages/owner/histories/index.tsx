// components
import InputSearchBar from "@/components/input/InputSearchBar";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";

// utils
import LoadingScreen from "@/components/LoadingScreen";
import HistoriesTable from "@/components/tables/HistoriesTable";
import { GlobalResponse } from "@/types/global.type";
import { TransaksiType } from "@/types/transactions.type";
import { useState } from "react";
import useSWR from "swr";

export default function OwnerHistoriesPage() {
  const [search, setSearch] = useState("");
  const swr = useSWR<GlobalResponse<TransaksiType[]>>({
    url: "/transaksi",
    method: "GET",
  });

  if (swr.isLoading) {
    return <LoadingScreen role="owner" />;
  }

  if (swr.error) {
    console.log(swr.error);
  }

  const filter = swr.data?.data.filter((item) => {
    return item.id_transaksi.toLowerCase().includes(search.toLowerCase());
  });

  return <SubComponentHistoriesPage {...{ transaksi: filter, setSearch }} />;
}

function SubComponentHistoriesPage({
  transaksi,
  setSearch,
}: {
  transaksi: TransaksiType[] | undefined;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <Layout title="Daftar Transaksi">
      <Container className="gap-8">
        <h4 className="text-lg font-semibold text-default-900">
          Riwayat Transaksi
        </h4>

        <div className="grid gap-4">
          <InputSearchBar
            placeholder="Cari ID Transaksi"
            className="w-full sm:max-w-[500px]"
            onChange={(e) => setSearch(e.target.value)}
          />

          <HistoriesTable transaksi={transaksi} path="/owner/histories" />
        </div>
      </Container>
    </Layout>
  );
}
