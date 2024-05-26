import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useState } from "react";
import useSWR, { KeyedMutator } from "swr";

// components
import LoadingScreen from "@/components/LoadingScreen";
import InputSearchBar from "@/components/input/InputSearchBar";
import PopupImportProducts from "@/components/popup/PopupImportProducts";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";

// utils
import ProductListsTable from "@/components/tables/ProductListsTable";
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

export default function ProductsListsPage(
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

  return (
    <SubComponentProductsListsPage
      {...{ produk: filter, setSearch, mutate: swr.mutate }}
    />
  );
}

function SubComponentProductsListsPage({
  produk,
  setSearch,
  mutate,
}: {
  produk: ProdukType[] | undefined;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  mutate: KeyedMutator<any>;
}) {
  return (
    <Layout title="Daftar Produk">
      <Container className="gap-8">
        <h4 className="text-lg font-semibold text-default-900">
          Daftar Produk
        </h4>

        <div className="grid gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <InputSearchBar
              placeholder="Cari Kode Item atau Nama Produk"
              className="w-full sm:max-w-[500px]"
              onChange={(e) => setSearch(e.target.value)}
            />

            <PopupImportProducts {...{ mutate }} />
          </div>

          <ProductListsTable produk={produk} role="owner" />
        </div>
      </Container>
    </Layout>
  );
}
