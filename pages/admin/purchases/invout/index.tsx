import LoadingScreen from "@/components/LoadingScreen";
import InputSearchBar from "@/components/input/InputSearchBar";
import InvoutTable from "@/components/tables/InvoutTable";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";
import { GlobalResponse } from "@/types/global.type";
import { InvoutType } from "@/types/invoices.type";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";

export default function InvoutPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const swr = useSWR<GlobalResponse<InvoutType[]>>({
    url: "/invoice/out",
    method: "GET",
  });

  if (swr.isLoading) {
    return <LoadingScreen role="admin" />;
  }

  if (swr.error) {
    console.log(swr.error);
  }

  const filter = swr.data?.data.filter((item) => {
    return (
      item.id_invoice.toLowerCase().includes(search.toLowerCase()) ||
      item.transaksi_id.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <Layout title="Daftar Invoice Keluar">
      <Container className="gap-8">
        <h4 className="text-lg font-semibold text-default-900">
          Daftar Invoice Keluar
        </h4>

        <div className="grid gap-4">
          <div className="grid gap-4 xl:flex xl:items-end xl:justify-between">
            <InputSearchBar
              placeholder="Cari ID Invoice Keluar atau ID Transaksi"
              className="w-full sm:max-w-[450px]"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <InvoutTable role="admin" invout={filter} />
        </div>
      </Container>
    </Layout>
  );
}
