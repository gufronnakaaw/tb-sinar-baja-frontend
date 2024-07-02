import LoadingScreen from "@/components/LoadingScreen";
import InputSearchBar from "@/components/input/InputSearchBar";
import ReturnTable from "@/components/tables/ReturnTable";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";
import { GlobalResponse } from "@/types/global.type";
import { ReturnType } from "@/types/return.type";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";

export default function ReturnPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const swr = useSWR<GlobalResponse<ReturnType[]>>({
    url: "/return",
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
      item.id_return.toLowerCase().includes(search.toLowerCase()) ||
      item.transaksi_id.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <Layout title="Daftar Retur Penjualan">
      <Container className="gap-8">
        <h4 className="text-lg font-semibold text-default-900">
          Daftar Retur Penjualan
        </h4>

        <div className="grid gap-4">
          <div className="grid gap-4 xl:flex xl:items-end xl:justify-between">
            <InputSearchBar
              placeholder="Cari ID Retur Penjualan atau ID Transaksi"
              className="w-full sm:max-w-[450px]"
              onChange={(e) => setSearch(e.target.value)}
            />

            <Button
              variant="solid"
              className="w-full bg-teal-500 font-medium text-white sm:w-max"
              onClick={() => router.push("/admin/selling/return/create")}
            >
              Buat Retur Penjualan
            </Button>
          </div>

          <ReturnTable role="admin" retur={filter} />
        </div>
      </Container>
    </Layout>
  );
}
