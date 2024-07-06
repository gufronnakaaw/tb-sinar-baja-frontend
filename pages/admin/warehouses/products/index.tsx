import { useEffect, useState } from "react";
import useSWR from "swr";

// components
import LoadingScreen from "@/components/LoadingScreen";
import InputSearchBar from "@/components/input/InputSearchBar";
import PopupImportProducts from "@/components/popup/PopupImportProducts";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";

// utils
import ProductListsTable from "@/components/tables/ProductListsTable";
import { FilterApi, FilterProduk } from "@/types/filter.type";
import { GlobalResponse } from "@/types/global.type";
import { ProdukKategoriType, ProdukType } from "@/types/products.type";
import { WarehousesType } from "@/types/warehouses.type";
import { capitalize } from "@/utils/capitalize";
import { fetcher } from "@/utils/fetcher";
import { formatDateWithoutTime } from "@/utils/formatDate";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import { Download } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import * as xlsx from "xlsx";

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

export default function ProductsListsPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const [search, setSearch] = useState("");
  const [kategori, setKategori] = useState<ProdukKategoriType[]>([]);
  const [namaGudang, setNamaGudang] = useState(props.nama_gudang);
  const [kodeGudang, setKodeGudang] = useState(props.kode_gudang);
  const [idKategori, setIdKategori] = useState(0);
  const [kodeGudangExport, setKodeGudangExport] = useState("");
  const exportDisclosure = useDisclosure();

  const swr = useSWR<GlobalResponse<ProdukType[]>>({
    url: `/produk?kode_gudang=${kodeGudang}`,
    method: "GET",
  });

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

  if (swr.isLoading) {
    return <LoadingScreen role="admin" />;
  }

  if (swr.error) {
    console.log(swr.error);
  }

  const filter = !swr.data?.data.length
    ? []
    : swr.data?.data.filter((item) => {
        return (
          item.nama_produk.toLowerCase().includes(search.toLowerCase()) ||
          item.kode_item.toLowerCase().includes(search.toLowerCase())
        );
      });

  async function handleExport() {
    try {
      const produk: GlobalResponse<FilterApi> = await fetcher({
        url: `/produk/filter?id_kategori=${idKategori}&kode_gudang=${kodeGudangExport}`,
        method: "GET",
      });

      const filterKategori = kategori.find(
        (el) => parseInt(el.id_kategori) == idKategori,
      );

      const filterGudang = props.gudang.find(
        (el) => el.kode_gudang == kodeGudangExport,
      );

      const mapping = [];

      for (const item of produk.data.produk) {
        const mappingObject = {};
        for (const key in item) {
          Object.assign(mappingObject, {
            [capitalize(key, "_")]: item[key as keyof FilterProduk],
          });
        }

        mapping.push(mappingObject);
      }

      const workbook = xlsx.utils.book_new();
      const worksheet = xlsx.utils.json_to_sheet(mapping);

      const date = new Date();

      xlsx.utils.book_append_sheet(
        workbook,
        worksheet,
        `${filterKategori?.id_kategori}_${filterKategori?.nama}`,
      );
      xlsx.writeFile(
        workbook,
        `${filterGudang?.nama}_${filterKategori?.nama}_${formatDateWithoutTime(date.toISOString())}.xlsx`,
      );
    } catch (error) {
      alert("terjadi kesalahan pada saat export produk");
    }
  }

  return (
    <Layout title="Daftar Produk">
      <Container className="gap-8">
        <h4 className="text-lg font-semibold text-default-900">
          Daftar Produk {namaGudang}
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
                {...{ mutate: swr.mutate, role: "admin", gudang: props.gudang, page: 'products' }}
              />

              <Button
                onClick={exportDisclosure.onOpen}
                variant="solid"
                startContent={<Download weight="bold" size={18} />}
                className={`w-full bg-teal-200 font-medium text-teal-600 sm:w-max`}
              >
                Export
              </Button>

              <Modal
                isOpen={exportDisclosure.isOpen}
                onOpenChange={exportDisclosure.onOpenChange}
                onClose={() => {
                  setIdKategori(0);
                  setKodeGudangExport("");
                }}
              >
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader>Export Produk</ModalHeader>
                      <ModalBody>
                        <Select
                          label="Pilih Gudang"
                          size="sm"
                          className="w-full"
                          onChange={(e) => {
                            if (!e.target.value) return;
                            setKodeGudangExport(e.target.value);
                          }}
                          selectedKeys={[kodeGudangExport]}
                        >
                          {props.gudang.map((item) => (
                            <SelectItem
                              key={item.kode_gudang}
                              value={item.kode_gudang}
                            >
                              {item.nama}
                            </SelectItem>
                          ))}
                        </Select>

                        <Select
                          label="Pilih Kategori"
                          size="sm"
                          className="w-full"
                          onChange={(e) => {
                            if (!e.target.value) return;

                            setIdKategori(parseInt(e.target.value));
                          }}
                        >
                          {kategori.map((item) => (
                            <SelectItem
                              key={item.id_kategori}
                              value={item.id_kategori}
                            >
                              {item.nama}
                            </SelectItem>
                          ))}
                        </Select>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="default"
                          variant="solid"
                          onPress={() => {
                            setIdKategori(0);
                            setKodeGudangExport("");
                            onClose();
                          }}
                        >
                          Close
                        </Button>
                        <Button
                          className="bg-teal-500 text-white"
                          onClick={handleExport}
                        >
                          Export
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </div>
          </div>

          <ProductListsTable produk={filter} role="admin" />
        </div>
      </Container>
    </Layout>
  );
}
