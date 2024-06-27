import { Button } from "@nextui-org/react";
import { useState } from "react";
import useSWR from "swr";

// components
import LoadingScreen from "@/components/LoadingScreen";
import InputSearchBar from "@/components/input/InputSearchBar";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";

// utils
import OffersTable from "@/components/tables/OffersTable";
import { GlobalResponse } from "@/types/global.type";
import { PenawaranType } from "@/types/preorders.type";
import { useRouter } from "next/router";

export default function OffersPage() {
  const [search, setSearch] = useState("");
  const swr = useSWR<GlobalResponse<PenawaranType[]>>({
    url: "/penawaran",
    method: "GET",
  });

  if (swr.isLoading) {
    return <LoadingScreen role="owner" />;
  }

  if (swr.error) {
    console.log(swr.error);
  }

  const filter = swr.data?.data.filter((item) => {
    return (
      item.id_penawaran.toLowerCase().includes(search.toLowerCase()) ||
      item.nama_supplier.toLowerCase().includes(search.toLowerCase())
    );
  });

  return <SubComponentOffersPage {...{ penawaran: filter, setSearch }} />;
}

function SubComponentOffersPage({
  penawaran,
  setSearch,
}: {
  penawaran: PenawaranType[] | undefined;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) {
  const router = useRouter();

  return (
    <Layout title="Daftar Permintaan Penawaran">
      <Container className="gap-8">
        <h4 className="text-lg font-semibold text-default-900">
          Daftar Permintaan Penawaran
        </h4>

        <div className="grid gap-4">
          <div className="grid gap-4 xl:flex xl:items-end xl:justify-between">
            <InputSearchBar
              placeholder="Cari ID Penawaran atau Nama Supplier"
              className="w-full sm:max-w-[450px]"
              onChange={(e) => setSearch(e.target.value)}
            />

            <Button
              variant="solid"
              color="primary"
              className="w-full font-medium sm:w-max"
              onClick={() => router.push("/owner/purchases/offers/create")}
            >
              Buat Penawaran
            </Button>
          </div>

          <OffersTable penawaran={penawaran} role="owner" />
        </div>
      </Container>
    </Layout>
  );
}
