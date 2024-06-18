// components
import LoadingScreen from "@/components/LoadingScreen";
import InputSearchBar from "@/components/input/InputSearchBar";
import PriceQuantityTable from "@/components/tables/PriceQuantityTable";
import ProductTable from "@/components/tables/ProductTable";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";
import { FilterApi, FilterProduk } from "@/types/filter.type";
import { GlobalResponse } from "@/types/global.type";
import { ProdukKategoriType } from "@/types/products.type";
import { fetcher } from "@/utils/fetcher";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

export type PriceQuantity = {
  id_table: number;
  produk_id: string;
  harga: number;
  quantity: number;
  keterangan: string;
  created_at: string;
  updated_at: string;
  satuan_kecil: string;
  nama_produk: string;
  nama_produk_asli: string;
};

export const getServerSideProps = (async () => {
  const kategori: GlobalResponse<ProdukKategoriType[]> = await fetcher({
    url: "/kategori",
    method: "GET",
  });

  return {
    props: {
      kategori: kategori.data,
    },
  };
}) satisfies GetServerSideProps<{ kategori: ProdukKategoriType[] }>;

export default function PriceQuantityPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const swr = useSWR<GlobalResponse<PriceQuantity[]>>({
    url: "/setting/pricequantity",
    method: "GET",
  });
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [idKategori, setIdKategori] = useState("");
  const [produk, setProduk] = useState<FilterProduk[]>([]);
  const [loadingProduk, setLoadingProduk] = useState(false);
  const [selection, setSelection] = useState(new Set([]));
  const [input, setInput] = useState({});

  useEffect(() => {
    if (!idKategori) {
      setProduk([]);
      setSelection(new Set([]));
    } else {
      getProduk();
      setSelection(new Set([]));
    }

    async function getProduk() {
      setLoadingProduk(true);

      try {
        const result: GlobalResponse<FilterApi> = await fetcher({
          url: "/produk/filter?id_kategori=" + idKategori,
          method: "GET",
        });

        setLoadingProduk(false);
        setProduk(result.data.produk);
      } catch (error) {
        setLoadingProduk(false);
        alert("terjadi kesalahan saat mendapatkan data produk");
        console.log(error);
      }
    }
  }, [idKategori]);

  async function createHarga() {
    console.log(input);
    try {
      await fetcher({
        url: "/setting/pricequantity",
        method: "POST",
        data: {
          produk_id: selection.values().next().value,
          ...input,
        },
      });

      alert("buat harga berhasil");
      setIdKategori("");
      setProduk([]);
      setInput({});
      onClose();
      return swr.mutate();
    } catch (error) {
      const response = error as {
        success: boolean;
        status_code: number;
        error: { name: string; message: string };
      };

      if (response.status_code >= 500) {
        console.log(response.error);
        return alert("terjadi masalah pada server");
      }

      if (response.status_code >= 400) {
        console.log(response.error);
        return alert(response.error.message);
      }

      console.log(response.error);
      return alert("terjadi error tidak diketahui pada aplikasi");
    }
  }

  if (swr.isLoading) {
    return <LoadingScreen role="admin" />;
  }

  if (swr.error) {
    console.log(swr.error);
    return alert("terjadi kesalahan saat mendapatkan data harga quantity");
  }

  const filter = swr.data?.data.filter((item) => {
    return (
      item.nama_produk.toLowerCase().includes(search.toLowerCase()) ||
      item.produk_id.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <Layout title="Pengaturan Harga Quantity">
      <Container className="gap-8">
        <h4 className="text-lg font-semibold text-default-900">
          Pengaturan Harga Quantity
        </h4>

        <div className="grid gap-4">
          <div className="grid gap-4 xl:flex xl:items-end xl:justify-between">
            <InputSearchBar
              placeholder="Cari Nama Produk atau Kode Item"
              className="w-full sm:max-w-[500px]"
              onChange={(e) => setSearch(e.target.value)}
            />

            <Button
              variant="solid"
              className="w-full bg-teal-500 font-medium text-white sm:w-max"
              onClick={onOpen}
            >
              Buat Harga
            </Button>

            <Modal
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              size="3xl"
              onClose={() => {
                setIdKategori("");
                setProduk([]);
                setInput({});
              }}
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      Buat Harga
                    </ModalHeader>
                    <ModalBody>
                      <Select
                        isRequired
                        label="Kategori"
                        labelPlacement="outside"
                        placeholder="Pilih Kategori"
                        onChange={(e) => setIdKategori(e.target.value)}
                      >
                        {props.kategori.map((item) => (
                          <SelectItem
                            key={item.id_kategori}
                            value={item.id_kategori}
                          >
                            {item.nama}
                          </SelectItem>
                        ))}
                      </Select>

                      <ProductTable
                        produk={produk}
                        role="admin"
                        isLoading={loadingProduk}
                        selectionChange={setSelection}
                      />

                      <div className="grid grid-cols-3 gap-2">
                        <Input
                          isRequired
                          variant="flat"
                          color="default"
                          label="Harga"
                          labelPlacement="outside"
                          name="harga"
                          placeholder="Masukan harga"
                          type="number"
                          onChange={(e) => {
                            setInput({
                              ...input,
                              [e.target.name]: parseInt(e.target.value),
                            });
                          }}
                        />

                        <Input
                          isRequired
                          variant="flat"
                          color="default"
                          label="Qty"
                          labelPlacement="outside"
                          name="quantity"
                          placeholder="Masukan qty"
                          type="number"
                          onChange={(e) => {
                            setInput({
                              ...input,
                              [e.target.name]: parseInt(e.target.value),
                            });
                          }}
                        />

                        <Input
                          isRequired
                          variant="flat"
                          color="default"
                          label="Keterangan"
                          labelPlacement="outside"
                          name="keterangan"
                          placeholder="Ex: pembelian 100 pcs"
                          type="text"
                          onChange={(e) => {
                            setInput({
                              ...input,
                              [e.target.name]: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        className="bg-teal-500 text-white"
                        onClick={createHarga}
                      >
                        Buat
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>

          <PriceQuantityTable
            pricequantity={filter}
            role="admin"
            mutate={swr.mutate}
          />
        </div>
      </Container>
    </Layout>
  );
}
