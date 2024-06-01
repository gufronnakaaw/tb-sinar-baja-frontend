import React, { useState } from "react";
import useSWR, { mutate } from "swr";

// components
import LoadingScreen from "@/components/LoadingScreen";
import InputSearchBar from "@/components/input/InputSearchBar";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";

// utils
import WarehousesDocumentsTable from "@/components/tables/WarehousesDocumentsTable";
import { GlobalResponse } from "@/types/global.type";
import { WarehouseDocumentsType } from "@/types/warehouses.type";

export default function WarehousesDocumentsPage() {
  const [search, setSearch] = useState("");
  const swr = useSWR<GlobalResponse<WarehouseDocumentsType[]>>({
    url: "/suratjalan",
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
      item.id_suratjalan.toLowerCase().includes(search.toLowerCase()) ||
      item.transaksi_id.toLowerCase().includes(search.toLowerCase()) ||
      item.transaksi.penerima.toLowerCase().includes(search.toLowerCase())
    );
  });

  return <SubComponentDocumentsPage {...{ documents: filter, setSearch }} />;
}

function SubComponentDocumentsPage({
  documents,
  setSearch,
}: {
  documents: WarehouseDocumentsType[] | undefined;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <Layout title="Surat Jalan">
      <Container className="gap-8">
        <h4 className="text-lg font-semibold text-default-900">Surat Jalan</h4>

        <div className="grid gap-4">
          <InputSearchBar
            placeholder="Cari ID Surat Jalan atau ID Transaksi atau penerima"
            className="w-full sm:max-w-[500px]"
            onChange={(e) => setSearch(e.target.value)}
          />

          <WarehousesDocumentsTable document={documents} mutate={mutate} />
        </div>
      </Container>
    </Layout>
  );
}
