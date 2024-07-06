import { useState } from "react";
import useSWR from "swr";

// components
import LoadingScreen from "@/components/LoadingScreen";
import InputSearchBar from "@/components/input/InputSearchBar";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";

// utils
import PopupImportProducts from "@/components/popup/PopupImportProducts";
import ProductStocksTable from "@/components/tables/ProductStocksTable";
import { GlobalResponse } from "@/types/global.type";
import { ProdukType } from "@/types/products.type";
import { WarehousesType } from "@/types/warehouses.type";
import { fetcher } from "@/utils/fetcher";
import { Select, SelectItem } from "@nextui-org/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export const getServerSideProps = (async ({ query }) => {
  const result: GlobalResponse<WarehousesType[]> = await fetcher({
    url: "/gudang",
    method: "GET",
  });

  return {
    props: {
      gudang: result.data,
      kode_gudang: query?.kode_gudang
        ? (query.kode_gudang as string)
        : result.data[result.data.length - 1].kode_gudang,
      nama_gudang: result.data[result.data.length - 1].nama,
    },
  };
}) satisfies GetServerSideProps<{
  gudang: WarehousesType[];
  kode_gudang: string;
}>;

export default function ProductsStocksPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const [search, setSearch] = useState("");
  const [namaGudang, setNamaGudang] = useState(props.nama_gudang);
  const [kodeGudang, setKodeGudang] = useState(props.kode_gudang);

  const swr = useSWR<GlobalResponse<ProdukType[]>>({
    url: `/produk?kode_gudang=${kodeGudang}`,
    method: "GET",
  });

  if (swr.isLoading) {
    return <LoadingScreen role="admin" />;
  }

  if (swr.error) {
    console.log(swr.error);
  }

  const filter = !swr.data?.data?.length
    ? []
    : swr.data?.data.filter((item) => {
        return (
          item.nama_produk.toLowerCase().includes(search.toLowerCase()) ||
          item.kode_item.toLowerCase().includes(search.toLowerCase())
        );
      });

  return (
    <Layout title="Stok Produk">
      <Container className="gap-8">
        <h4 className="text-lg font-semibold text-default-900">
          Stok Produk {namaGudang}
        </h4>

        <div className="grid gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <InputSearchBar
              placeholder="Cari Kode Item atau Nama Produk"
              className="w-full sm:max-w-[500px]"
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="flex items-center gap-2">
              <Select
                label="Pilih Gudang"
                size="sm"
                className="w-[230px]"
                onChange={(e) => {
                  if (!e.target.value) return;

                  let gudang = props.gudang.find(
                    (el) => el.kode_gudang == e.target.value,
                  );
                  setNamaGudang(gudang?.nama as string);
                  setKodeGudang(e.target.value);
                }}
                selectedKeys={[kodeGudang]}
              >
                {props.gudang.map((item) => (
                  <SelectItem key={item.kode_gudang} value={item.kode_gudang}>
                    {item.nama}
                  </SelectItem>
                ))}
              </Select>

              <PopupImportProducts
                {...{
                  mutate: swr.mutate,
                  role: "admin",
                  gudang: props.gudang,
                  page: "stocks",
                }}
              />
            </div>
          </div>
          <ProductStocksTable produk={filter} role="admin" />
        </div>
      </Container>
    </Layout>
  );
}
