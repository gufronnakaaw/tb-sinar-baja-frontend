import { useState } from "react";

// components
import InputSearchBar from "@/components/input/InputSearchBar";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";

// utils
import LoadingScreen from "@/components/LoadingScreen";
import BrokenTable from "@/components/tables/BrokenTable";
import { BrokenData } from "@/types/broken.type";
import { GlobalResponse } from "@/types/global.type";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function BrokenPage() {
  const swr = useSWR<GlobalResponse<BrokenData[]>>({
    url: "/beritaacara",
    method: "GET",
  });

  const [search, setSearch] = useState("");
  const router = useRouter();

  if (swr.isLoading) {
    return <LoadingScreen role="owner" />;
  }

  if (swr.error) {
    console.log(swr.error);
  }

  const filter = swr.data?.data.filter((item) => {
    return item.id_ba.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <Layout title="Daftar Barang Rusak">
      <Container className="gap-8">
        <h4 className="text-lg font-semibold text-default-900">
          Daftar Barang Rusak
        </h4>

        <div className="grid gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <InputSearchBar
              placeholder="Cari ID Berita Acara"
              className="w-full sm:max-w-[500px]"
              onChange={(e) => setSearch(e.target.value)}
            />

            <Button
              variant="solid"
              className="w-full bg-primary font-medium text-white sm:w-max"
              onClick={() => router.push("/owner/warehouses/broken/create")}
            >
              Buat Berita Acara
            </Button>
          </div>

          <BrokenTable role="owner" brokenItems={filter} />
        </div>
      </Container>
    </Layout>
  );
}
