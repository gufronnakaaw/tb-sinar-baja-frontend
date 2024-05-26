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
import { GlobalResponse } from "@/types/global.type";
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
  id_supplier?: string;
  nama?: string;
}) {
  const router = useRouter();
  const [kategori, setKategori] = useState<KategoriType[]>([]);
  const [subKategori, setSubKategori] = useState<SubKategoriType[]>([]);
  const [idKategori, setIdKategori] = useState("");
  const [produk, setProduk] = useState<
    { kode_item: string; nama_produk: string }[]
  >([]);
  const [idSubKategori, setIdSubKategori] = useState("");
  const [kodeItem, setKodeItem] = useState("");
  const [harga, setHarga] = useState(0);

  const { onOpen, onOpenChange, onClose, isOpen } = useDisclosure();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getKategori();

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
  }, []);

  useEffect(() => {
    if (!idKategori) {
      setSubKategori([]);
      setProduk([]);
    } else {
      getSubKategori();
    }

    async function getSubKategori() {
      try {
        const response = await fetcher({
          url: "/kategori?id_kategori=" + idKategori,
          method: "GET",
        });

        const result = response as GlobalResponse<{
          subkategori: SubKategoriType[];
        }>;
        setSubKategori(result.data.subkategori);
      } catch (error) {
        alert("terjadi kesalahan saat mendapatkan data kategori");
        console.log(error);
      }
    }
  }, [idKategori]);

  useEffect(() => {
    if (!idSubKategori) {
      setProduk([]);
    } else {
      getProduk();
    }

    async function getProduk() {
      try {
        const response = await fetcher({
          url: "/produk?id_subkategori=" + idSubKategori,
          method: "GET",
        });

        const result = response as GlobalResponse<
          { kode_item: string; nama_produk: string }[]
        >;

        setProduk(result.data);
      } catch (error) {
        alert("terjadi kesalahan saat mendapatkan data kategori");
        console.log(error);
      }
    }
  }, [idSubKategori]);

  async function createPricelist() {
    setLoading(true);
    try {
      await fetcher({
        url: "/supplier/pricelist",
        method: "POST",
        data: {
          supplier_id: id_supplier,
          harga,
          produk_id: kodeItem,
        },
      });

      setLoading(false);
      alert("produk berhasil dibuat");
      onClose();
      setSubKategori([]);
      setIdKategori("");
      setProduk([]);
      setKodeItem("");
      setHarga(0);
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
              size="lg"
              onClose={() => {
                setSubKategori([]);
                setIdKategori("");
                setProduk([]);
                setKodeItem("");
                setHarga(0);
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

                        <Select
                          isRequired
                          label="Sub Kategori"
                          labelPlacement="outside"
                          placeholder="Pilih Sub Kategori"
                          onChange={(e) => setIdSubKategori(e.target.value)}
                        >
                          {subKategori.length != 0
                            ? subKategori.map((item) => (
                                <SelectItem
                                  key={item.id_subkategori}
                                  value={item.id_subkategori}
                                >
                                  {item.nama}
                                </SelectItem>
                              ))
                            : []}
                        </Select>

                        <Select
                          isRequired
                          label="Produk"
                          labelPlacement="outside"
                          placeholder="Pilih Produk"
                          onChange={(e) => setKodeItem(e.target.value)}
                        >
                          {produk.length != 0
                            ? produk.map((item) => (
                                <SelectItem
                                  key={item.kode_item}
                                  value={item.kode_item}
                                >
                                  {item.nama_produk}
                                </SelectItem>
                              ))
                            : []}
                        </Select>

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
                          setSubKategori([]);
                          setIdKategori("");
                          setProduk([]);
                          setKodeItem("");
                          setHarga(0);
                          onClose();
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
