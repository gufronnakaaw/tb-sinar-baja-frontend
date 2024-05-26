import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useState } from "react";
import useSWR from "swr";

// components
import LoadingScreen from "@/components/LoadingScreen";
import InputSearchBar from "@/components/input/InputSearchBar";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";

// utils
import ProductStocksTable from "@/components/tables/ProductStocksTable";
import { GlobalResponse } from "@/types/global.type";
import { ProdukType } from "@/types/products.type";
import { fetcher } from "@/utils/fetcher";

type ProdukLists = {
  produk: ProdukType[];
};

export const getServerSideProps = (async () => {
  const produk: GlobalResponse<ProdukLists> = await fetcher({
    url: "/produk",
    method: "GET",
  });
  return {
    props: {
      produk,
    },
  };
}) satisfies GetServerSideProps<{ produk: GlobalResponse<ProdukLists> }>;

export default function OwnerProductsStocksPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const [search, setSearch] = useState("");

  const swr = useSWR<GlobalResponse<ProdukLists>>(
    {
      url: `/produk?size=5000`,
      method: "GET",
    },
    fetcher,
    {
      fallbackData: props.produk,
    },
  );

  if (swr.isLoading) {
    return <LoadingScreen role="owner" />;
  }

  if (swr.error) {
    console.log(swr.error);
  }

  const filter = swr.data?.data.produk.filter((item) => {
    return (
      item.nama_produk.toLowerCase().includes(search.toLowerCase()) ||
      item.kode_item.toLowerCase().includes(search.toLowerCase())
    );
  });

  return <SubComponentProductsStocksPage {...{ produk: filter, setSearch }} />;
}

function SubComponentProductsStocksPage({
  produk,
  setSearch,
}: {
  produk: ProdukType[] | undefined;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <Layout title="Stok Produk">
      <Container className="gap-8">
        <h4 className="text-lg font-semibold text-default-900">Stok Produk</h4>

        <div className="grid gap-4">
          <InputSearchBar
            placeholder="Cari Kode Item atau Nama Produk"
            className="w-full sm:max-w-[500px]"
            onChange={(e) => setSearch(e.target.value)}
          />

          <ProductStocksTable produk={produk} role="owner" />
        </div>
      </Container>
    </Layout>
  );
}
