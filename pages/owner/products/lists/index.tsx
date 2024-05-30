import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useEffect, useState } from "react";
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
import { ProdukKategoriType, ProdukType } from "@/types/products.type";
import { fetcher } from "@/utils/fetcher";
import { Select, SelectItem } from "@nextui-org/react";
import * as xlsx from "xlsx";

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
  const [kategori, setKategori] = useState<ProdukKategoriType[]>([]);

  useEffect(() => {
    getKategori();

    async function getKategori() {
      try {
        const kategori: GlobalResponse<ProdukKategoriType[]> = await fetcher({
          url: "/kategori",
          method: "GET",
        });

        setKategori(kategori.data);
      } catch (error) {
        alert("terjadi kesalahan saat mendapatkan kategori");
      }
    }
  }, []);

  async function handleExport(kategori: ProdukKategoriType | undefined) {
    try {
      const produk: GlobalResponse<ProdukType[]> = await fetcher({
        url: "/produk/export?id_kategori=" + kategori?.id_kategori,
        method: "GET",
      });

      const mapping = [];

      for (const item of produk.data) {
        const mappingObject = {};
        for (const key in item) {
          Object.assign(mappingObject, {
            [key.split("_").join(" ").toUpperCase()]:
              item[key as keyof ProdukType],
          });
        }

        mapping.push(mappingObject);
      }

      const workbook = xlsx.utils.book_new();
      const worksheet = xlsx.utils.json_to_sheet(mapping);

      xlsx.utils.book_append_sheet(
        workbook,
        worksheet,
        `${kategori?.id_kategori}_${kategori?.nama}`,
      );
      xlsx.writeFile(
        workbook,
        !kategori?.nama ? "Produk.xlsx" : `${kategori.nama}.xlsx`,
      );
    } catch (error) {
      alert("terjadi kesalahan pada saat export produk");
    }
  }

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

            <div className="grid grid-cols-2 items-center gap-2">
              <PopupImportProducts {...{ mutate }} />

              <Select
                label="Export Produk"
                size="sm"
                onChange={(e) => {
                  if (!e.target.value) return;

                  handleExport(
                    kategori.find(
                      (element) =>
                        parseInt(element.id_kategori) ==
                        parseInt(e.target.value),
                    ),
                  );
                }}
              >
                {kategori.map((item) => (
                  <SelectItem key={item.id_kategori} value={item.id_kategori}>
                    {item.nama}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>

          <ProductListsTable produk={produk} role="owner" />
        </div>
      </Container>
    </Layout>
  );
}
