import { Button } from "@nextui-org/react";
import { useState } from "react";

// components
import InputSearchBar from "@/components/input/InputSearchBar";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";

// utils
import LoadingScreen from "@/components/LoadingScreen";
import InvoiceTable from "@/components/tables/InvoicesTable";
import { GlobalResponse } from "@/types/global.type";
import { InvoiceType } from "@/types/invoice.type";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function Invoice() {
  const [search, setSearch] = useState("");
  const swr = useSWR<GlobalResponse<InvoiceType[]>>({
    url: "/invoice",
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
      item.id_invoice.toLowerCase().includes(search.toLowerCase()) ||
      item.nomor_invoice.toLowerCase().includes(search.toLowerCase())
    );
  });

  return <SubComponentInvoice {...{ invoice: filter, setSearch }} />;
}

function SubComponentInvoice({
  invoice,
  setSearch,
}: {
  invoice: InvoiceType[] | undefined;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) {
  const router = useRouter();

  return (
    <Layout title="Daftar Invoice">
      <Container className="gap-8">
        <h4 className="text-lg font-semibold text-default-900">
          Daftar Invoice
        </h4>

        <div className="grid gap-4">
          <div className="grid gap-4 xl:flex xl:items-end xl:justify-between">
            <InputSearchBar
              placeholder="Cari Nomor Invoice"
              className="w-full sm:max-w-[450px]"
              onChange={(e) => setSearch(e.target.value)}
            />

            <Button
              variant="solid"
              color="primary"
              className="w-full font-medium sm:w-max"
              onClick={() => router.push("/owner/invoices/in/create")}
            >
              Buat Invoice
            </Button>
          </div>

          <InvoiceTable {...{ invoice, role: "owner" }} />
        </div>
      </Container>
    </Layout>
  );
}
