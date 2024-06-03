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
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR, { KeyedMutator } from "swr";

// components
import LoadingScreen from "@/components/LoadingScreen";
import ButtonBack from "@/components/button/ButtonBack";
import InputSearchBar from "@/components/input/InputSearchBar";
import SuppliersSubPricelistsTable from "@/components/tables/SuppliersSubPricelistsTable";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";

// utils
import ProductTable from "@/components/tables/ProductTable";
import { GlobalResponse } from "@/types/global.type";
import { ProdukType } from "@/types/products.type";
import { SupplierPricelistProdukType } from "@/types/suppliers.type";
import { fetcher } from "@/utils/fetcher";

type PricelistType = {
  id_supplier: string;
  nama: string;
  produk: SupplierPricelistProdukType[];
};

type KategoriType = {
  id_kategori: string;
  nama: string;
  created_at: string;
  updated_at: string;
};

type SubKategoriType = {
  id_subkategori: number;
  nama: string;
  created_at: string;
};

export const getServerSideProps = (async ({ query }) => {
  const result = await fetcher({
    url: "/supplier/pricelist?id_supplier=" + query?.id_supplier,
    method: "GET",
  });

  const pricelist: GlobalResponse<SupplierPricelistProdukType[]> = result;

  return {
    props: {
      pricelist,
      id_supplier: query?.id_supplier,
      nama: query?.nama,
    },
  };
}) satisfies GetServerSideProps<{
  pricelist: GlobalResponse<SupplierPricelistProdukType[]>;
}>;

export default function PricelistPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const [search, setSearch] = useState("");
  const swr = useSWR<GlobalResponse<SupplierPricelistProdukType[]>>(
    {
      url: "/supplier/pricelist?id_supplier=" + props?.id_supplier,
      method: "GET",
    },
    fetcher,
    {
      fallbackData: props.pricelist,
      refreshInterval: 10000,
    },
  );

  if (swr.isLoading) {
    return <LoadingScreen role="owner" />;
  }

  if (swr.error) {
    console.log(swr.error);
  }

  const filter = swr.data?.data.filter((item) => {
    return (
      item.kode_item.toLowerCase().includes(search.toLowerCase()) ||
      item.nama.toLowerCase().includes(search.toLowerCase())
    );
  });

  const passingProps = {
    pricelist: filter,
    setSearch,
    mutate: swr.mutate,
    id_supplier: props?.id_supplier,
    nama: props?.nama,
  };

  return <SubComponentSuppliersPage {...passingProps} />;
}

function SubComponentSuppliersPage({
  pricelist,
  setSearch,
  mutate,
  id_supplier,
  nama,
}: {
  pricelist: SupplierPricelistProdukType[] | undefined;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  mutate: KeyedMutator<any>;
  id_supplier: any;
  nama: any;
}) {
  const router = useRouter();
  const [kategori, setKategori] = useState<KategoriType[]>([]);
  const [idKategori, setIdKategori] = useState("");
  const [produk, setProduk] = useState<ProdukType[]>([]);
  const [harga, setHarga] = useState(0);

  const { onOpen, onOpenChange, onClose, isOpen } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [loadingProduk, setLoadingProduk] = useState(false);
  const [selection, setSelection] = useState(new Set([]));

  useEffect(() => {
    async function getKategori() {
      try {
        const response = await fetcher({
          url: "/kategori",
          method: "GET",
        });

        const result = response as GlobalResponse<KategoriType[]>;
        setKategori(result.data);
      } catch (error) {
        alert("terjadi kesalahan saat mendapatkan data kategori");
        console.log(error);
      }
    }

    getKategori();
  }, []);

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
        const result: GlobalResponse<ProdukType[]> = await fetcher({
          url: "/produk/export?id_kategori=" + idKategori,
          method: "GET",
        });

        setLoadingProduk(false);
        setProduk(result.data);
      } catch (error) {
        setLoadingProduk(false);
        alert("terjadi kesalahan saat mendapatkan data produk");
        console.log(error);
      }
    }
  }, [idKategori]);

  async function createPricelist() {
    if (!selection.values().next().value) {
      return alert("silahkan klik salah satu produk");
    }

    setLoading(true);
    try {
      await fetcher({
        url: "/supplier/pricelist",
        method: "POST",
        data: {
          supplier_id: id_supplier,
          harga,
          produk_id: selection.values().next().value,
        },
      });

      setLoading(false);
      alert("produk berhasil dibuat");
      onClose();
      setIdKategori("");
      setProduk([]);
      setHarga(0);
      setSelection(new Set([]));
      mutate();
    } catch (error) {
      setLoading(false);
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

  return (
    <Layout title="Detail Harga Supplier">
      <Container className="gap-8">
        <ButtonBack onClick={() => router.push("/owner/suppliers/pricelists")}>
          Kembali
        </ButtonBack>

        <div className="grid gap-4">
          <h3 className="mb-4 border-l-4 border-primary pl-4 text-[18px] font-semibold text-default-900">
            Detail Harga {nama}
          </h3>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <InputSearchBar
              placeholder="Cari Kode Item atau Nama"
              className="w-full sm:max-w-[500px]"
              onChange={(e) => setSearch(e.target.value)}
            />

            <Button
              variant="solid"
              color="primary"
              className="w-full font-medium sm:w-max"
              onClick={onOpen}
            >
              Tambah Produk
            </Button>

            <Modal
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              isDismissable={false}
              isKeyboardDismissDisabled={true}
              size="4xl"
              onClose={() => {
                setIdKategori("");
                setProduk([]);
                setHarga(0);
                setSelection(new Set([]));
              }}
            >
              <ModalContent>
                {() => (
                  <>
                    <ModalHeader className="font-semibold text-default-900">
                      Tambah Produk
                    </ModalHeader>

                    <ModalBody>
                      <div className="grid gap-6">
                        <Select
                          isRequired
                          label="Kategori"
                          labelPlacement="outside"
                          placeholder="Pilih Kategori"
                          onChange={(e) => setIdKategori(e.target.value)}
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

                        <ProductTable
                          produk={produk}
                          role="owner"
                          isLoading={loadingProduk}
                          selectionChange={setSelection}
                        />

                        <Input
                          isRequired
                          variant="flat"
                          color="default"
                          label="Harga"
                          labelPlacement="outside"
                          name="harga"
                          placeholder="Masukan Harga"
                          type="number"
                          onChange={(e) => setHarga(parseInt(e.target.value))}
                        />
                      </div>
                    </ModalBody>

                    <ModalFooter>
                      <Button
                        color="danger"
                        variant="light"
                        onPress={() => {
                          setIdKategori("");
                          setProduk([]);
                          setHarga(0);
                          onClose();
                          setSelection(new Set([]));
                        }}
                        className="font-medium"
                      >
                        Batal
                      </Button>

                      {loading ? (
                        <Button
                          variant="solid"
                          color="primary"
                          startContent={<Spinner color="white" size="sm" />}
                          className={`${loading ? "cursor-not-allowed justify-self-end font-medium" : ""}`}
                        >
                          Tunggu
                        </Button>
                      ) : (
                        <Button
                          color="primary"
                          variant="solid"
                          className="font-medium"
                          onClick={createPricelist}
                        >
                          Tambah
                        </Button>
                      )}
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>

          <SuppliersSubPricelistsTable
            pricelist={pricelist}
            id_supplier={id_supplier}
            mutate={mutate}
          />
        </div>
      </Container>
    </Layout>
  );
}
