import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR, { KeyedMutator } from "swr";

// components
import LoadingScreen from "@/components/LoadingScreen";
import InputSearchBar from "@/components/input/InputSearchBar";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";

// utils
import ButtonBack from "@/components/button/ButtonBack";
import ProductSubCategoriesTable from "@/components/tables/ProductSubCategoriesTable";
import { GlobalResponse } from "@/types/global.type";
import { ProdukSubKategoriType } from "@/types/products.type";
import { fetcher } from "@/utils/fetcher";

type SubKategoriLists = {
  id_kategori: number;
  nama: string;
  subkategori: ProdukSubKategoriType[];
};

export const getServerSideProps = (async ({ params }) => {
  const subkategori: GlobalResponse<SubKategoriLists> = await fetcher({
    url: "/kategori?id_kategori=" + params?.id,
    method: "GET",
  });

  return {
    props: {
      subkategori,
      id: params?.id,
    },
  };
}) satisfies GetServerSideProps<{
  subkategori: GlobalResponse<SubKategoriLists>;
  id: string | any;
}>;

export default function OwnerProductsSubCategoriesPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const [search, setSearch] = useState("");
  const swr = useSWR<GlobalResponse<SubKategoriLists>>(
    {
      url: "/kategori?id_kategori=" + props.id,
      method: "GET",
    },
    fetcher,
    {
      fallbackData: props.subkategori,
      refreshInterval: 15000,
    },
  );

  if (swr.isLoading) {
    return <LoadingScreen role="owner" />;
  }

  if (swr.error) {
    console.log(swr.error);
  }

  const filter = swr.data?.data.subkategori.filter((item) => {
    return item.nama.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <SubComponentSubCategoriesPage
      {...{
        kategori: swr?.data?.data,
        subkategori: filter,
        mutate: swr.mutate,
        setSearch,
      }}
    />
  );
}

function SubComponentSubCategoriesPage({
  kategori,
  subkategori,
  setSearch,
  mutate,
}: {
  kategori: SubKategoriLists | undefined;
  subkategori: ProdukSubKategoriType[] | undefined;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  mutate: KeyedMutator<any>;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [namaSubKategori, setNamaSubKategori] = useState("");

  const router = useRouter();

  async function createSubKategori() {
    if (!namaSubKategori) {
      return alert("tidak boleh kosong");
    }

    try {
      await fetcher({
        url: "/kategori/subkategori",
        method: "POST",
        data: {
          id_kategori: kategori?.id_kategori,
          nama: namaSubKategori,
        },
      });
      alert("buat Sub kategori berhasil");
      onClose();
      mutate();
    } catch (error) {
      alert("ups terjadi kesalahan");
      console.log(error);
    }
  }

  return (
    <Layout title="Sub Produk Kategori">
      <Container className="gap-20">
        <div className="grid gap-8">
          <ButtonBack onClick={() => router.back()}>Kembali</ButtonBack>

          <h4 className="text-lg font-semibold text-default-900">
            Sub Kategori {kategori?.nama}
          </h4>

          <div className="grid gap-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <InputSearchBar
                placeholder="Cari Sub Kategori"
                className="w-full sm:max-w-[500px]"
                onChange={(e) => setSearch(e.target.value)}
              />

              <Button
                variant="solid"
                color="primary"
                className="w-full font-medium sm:w-max"
                onClick={onOpen}
              >
                Buat Sub Kategori
              </Button>

              <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                isDismissable={false}
                isKeyboardDismissDisabled={true}
                size="lg"
              >
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="font-semibold text-default-900">
                        Buat Sub Kategori
                      </ModalHeader>

                      <ModalBody>
                        <div className="grid gap-6">
                          <Input
                            isRequired
                            variant="flat"
                            color="default"
                            labelPlacement="outside"
                            label="Nama Sub Kategori"
                            placeholder="Masukan nama kategori..."
                            onChange={(e) => setNamaSubKategori(e.target.value)}
                          />
                        </div>
                      </ModalBody>

                      <ModalFooter>
                        <Button
                          color="primary"
                          variant="light"
                          onPress={onClose}
                          className="font-medium"
                        >
                          Batal
                        </Button>

                        <Button
                          color="primary"
                          variant="solid"
                          className="font-semibold"
                          onClick={createSubKategori}
                        >
                          Buat
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </div>

            <ProductSubCategoriesTable subkategori={subkategori} role="owner" />
          </div>
        </div>
      </Container>
    </Layout>
  );
}
