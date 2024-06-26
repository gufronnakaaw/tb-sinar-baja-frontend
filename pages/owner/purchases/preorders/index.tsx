import { Button } from "@nextui-org/react";
import { useState } from "react";

// components
import InputSearchBar from "@/components/input/InputSearchBar";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";

// utils
import LoadingScreen from "@/components/LoadingScreen";
import FinalTable from "@/components/tables/FinalTable";
import { GlobalResponse } from "@/types/global.type";
import { FinalType } from "@/types/preorders.type";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function Preorder() {
  const [search, setSearch] = useState("");
  const swr = useSWR<GlobalResponse<FinalType[]>>({
    url: "/preorder",
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
      item.id_preorder.toLowerCase().includes(search.toLowerCase()) ||
      item.nama_supplier.toLowerCase().includes(search.toLowerCase())
    );
  });

  return <SubComponentPreorder {...{ final: filter, setSearch }} />;
}

function SubComponentPreorder({
  final,
  setSearch,
}: {
  final: FinalType[] | undefined;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) {
  const router = useRouter();

  return (
    <Layout title="Daftar Pre Order">
      <Container className="gap-8">
        <h4 className="text-lg font-semibold text-default-900">
          Daftar Pre Order
        </h4>

        <div className="grid gap-4">
          <div className="grid gap-4 xl:flex xl:items-end xl:justify-between">
            <InputSearchBar
              placeholder="Cari ID PO atau Nama Supplier"
              className="w-full sm:max-w-[450px]"
              onChange={(e) => setSearch(e.target.value)}
            />

            <Button
              variant="solid"
              color="primary"
              className="w-full font-medium sm:w-max"
              onClick={() => router.push("/owner/preorders/out/create")}
            >
              Buat Pre Order
            </Button>
          </div>

          <FinalTable {...{ final, role: "owner" }} />
        </div>
      </Container>
    </Layout>
  );
}
