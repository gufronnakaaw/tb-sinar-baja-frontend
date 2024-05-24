import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pagination,
  Select,
  SelectItem,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import { NextRouter, useRouter } from "next/router";

// components
import InputSearchBar from "@/components/input/InputSearchBar";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";

// utils
import usePagination from "@/hooks/usepagination";
import { customStyleTable } from "@/utils/customStyleTable";

import LoadingScreen from "@/components/LoadingScreen";
import ButtonBack from "@/components/button/ButtonBack";
import CustomTooltip from "@/components/tooltip";
import { GlobalResponse } from "@/types/global.type";
import { fetcher } from "@/utils/fetcher";
import { formatRupiah } from "@/utils/formatRupiah";
import { Trash } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useEffect, useState } from "react";
import useSWR, { KeyedMutator } from "swr";

type PricelistType = {
  id_supplier: string;
  nama: string;
  produk: PricelistProdukType[];
};

type PricelistProdukType = {
  nama: string;
  kode_item: string;
  kategori: string;
  harga: number;
  created_at: string;
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

export default function PricelistPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const [search, setSearch] = useState("");
  const swr = useSWR<GlobalResponse<PricelistProdukType[]>>(
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
  pricelist: PricelistProdukType[] | undefined;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  mutate: KeyedMutator<any>;
  id_supplier?: string;
  nama?: string;
}) {
  const { page, pages, data, setPage } = usePagination(
    pricelist ? pricelist : [],
    10,
  );
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

  const columnsPricelist = [
    { name: "Kode Item", uid: "kode_item" },
    { name: "Nama Produk", uid: "nama" },
    { name: "harga", uid: "harga" },
    { name: "Aksi", uid: "action" },
  ];

  function renderPricelist(
    produk: PricelistProdukType,
    columnKey: React.Key,
    router: NextRouter,
    deletePricelist: (produk_id: string) => void,
  ) {
    const cellValue = produk[columnKey as keyof PricelistProdukType];

    switch (columnKey) {
      case "kode_item":
        return <div className="w-max text-default-900">{produk.kode_item}</div>;
      case "nama":
        return <div className="w-max text-default-900">{produk.nama}</div>;
      case "harga":
        return (
          <div className="w-max text-default-900">
            {formatRupiah(produk.harga)}
          </div>
        );
      case "action":
        return (
          <div className="flex max-w-[110px] items-center gap-1">
            {/* <CustomTooltip content="Edit">
              <Button isIconOnly variant="light" size="sm">
                <Pencil weight="bold" size={20} className="text-default-600" />
              </Button>
            </CustomTooltip> */}

            <CustomTooltip content="Hapus">
              <Button
                isIconOnly
                variant="light"
                size="sm"
                onClick={() => {
                  deletePricelist(produk.kode_item);
                }}
              >
                <Trash weight="bold" size={20} className="text-default-600" />
              </Button>
            </CustomTooltip>
          </div>
        );

      default:
        return cellValue;
    }
  }

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

  async function deletePricelist(produk_id: string) {
    if (!confirm("apakah anda yakin?")) return;
    try {
      await fetcher({
        url: `/supplier/pricelist/${id_supplier}/${encodeURIComponent(produk_id)}`,
        method: "DELETE",
      });

      alert("produk berhasil dihapus");
      mutate();
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

  return (
    <Layout title="Detail Harga Supplier">
      <Container className="gap-8">
        <ButtonBack onClick={() => router.push("/owner/suppliers/pricelists")}>
          Kembali
        </ButtonBack>

        <div>
          <h3 className="col-span-3 border-l-4 border-primary pl-4 text-[18px] font-semibold text-default-900">
            Detail Harga {nama}
          </h3>
        </div>

        <div className="grid gap-4">
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
                          label="Pilih Kategori"
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
                          label="Pilih Sub Kategori"
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
                          label="Pilih Produk"
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
                          placeholder="Masukan harga"
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

          <Table
            isHeaderSticky
            aria-label="suppliers table"
            color="primary"
            selectionMode="single"
            classNames={customStyleTable}
            className="scrollbar-hide"
          >
            <TableHeader columns={columnsPricelist}>
              {(column) => (
                <TableColumn key={column.uid}>{column.name}</TableColumn>
              )}
            </TableHeader>

            <TableBody items={data}>
              {(pricelist) => (
                <TableRow key={pricelist.kode_item}>
                  {(columnKey) => (
                    <TableCell>
                      {renderPricelist(
                        pricelist,
                        columnKey,
                        router,
                        deletePricelist,
                      )}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>

          <Pagination
            isCompact
            showControls
            color="primary"
            page={page}
            total={pages}
            onChange={setPage}
            className="justify-self-center"
          />
        </div>
      </Container>
    </Layout>
  );
}

export const getServerSideProps = (async ({ query }) => {
  const result = await fetcher({
    url: "/supplier/pricelist?id_supplier=" + query?.id_supplier,
    method: "GET",
  });

  const pricelist: GlobalResponse<PricelistProdukType[]> = result;

  return {
    props: {
      pricelist,
      id_supplier: query?.id_supplier,
      nama: query?.nama,
    },
  };
}) satisfies GetServerSideProps<{
  pricelist: GlobalResponse<PricelistProdukType[]>;
}>;
