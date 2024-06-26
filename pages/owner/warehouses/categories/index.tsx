import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState } from "react";
import useSWR, { KeyedMutator } from "swr";

// components
import LoadingScreen from "@/components/LoadingScreen";
import InputSearchBar from "@/components/input/InputSearchBar";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";

// utils
import ProductCategoriesTable from "@/components/tables/ProductCategoriesTable";
import { GlobalResponse } from "@/types/global.type";
import { ProdukKategoriType } from "@/types/products.type";
import { fetcher } from "@/utils/fetcher";

export default function OwnerProductsCategoriesPage() {
  const [search, setSearch] = useState("");
  const swr = useSWR<GlobalResponse<ProdukKategoriType[]>>({
    url: "/kategori",
    method: "GET",
  });

  if (swr.isLoading) {
    return <LoadingScreen role="owner" />;
  }

  if (swr.error) {
    console.log(swr.error);
  }

  const filter = swr.data?.data.filter((item) => {
    return item.nama.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <SubComponentCategoriesPage
      {...{ kategori: filter, setSearch, mutate: swr.mutate }}
    />
  );
}

function SubComponentCategoriesPage({
  kategori,
  setSearch,
  mutate,
}: {
  kategori: ProdukKategoriType[] | undefined;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  mutate: KeyedMutator<any>;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [namaKategori, setNamaKategori] = useState("");
  const [loading, setLoading] = useState(false);

  async function createKategori() {
    setLoading(true);
    if (!namaKategori) {
      return alert("tidak boleh kosong");
    }

    try {
      await fetcher({
        url: "/kategori",
        method: "POST",
        data: {
          nama: namaKategori,
        },
      });
      alert("buat kategori berhasil");
      onClose();
      mutate();
    } catch (error) {
      alert("ups terjadi kesalahan");
      console.log(error);
    }
  }

  return (
    <Layout title="Produk Kategori">
      <Container className="gap-20">
        <div className="grid gap-8">
          <h4 className="text-lg font-semibold text-default-900">
            Kategori Produk
          </h4>

          <div className="grid gap-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <InputSearchBar
                placeholder="Cari Nama Kategori"
                className="w-full sm:max-w-[500px]"
                onChange={(e) => setSearch(e.target.value)}
              />

              <Button
                variant="solid"
                color="primary"
                className="w-full font-medium sm:w-max"
                onClick={onOpen}
              >
                Buat Kategori
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
                        Buat Kategori
                      </ModalHeader>

                      <ModalBody>
                        <Input
                          isRequired
                          variant="flat"
                          color="default"
                          label="Nama Kategori"
                          labelPlacement="outside"
                          placeholder="Masukan nama kategori..."
                          onChange={(e) => setNamaKategori(e.target.value)}
                        />
                      </ModalBody>

                      <ModalFooter>
                        <Button
                          color="danger"
                          variant="light"
                          onPress={onClose}
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
                            onClick={createKategori}
                            className="font-medium"
                          >
                            Buat
                          </Button>
                        )}
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </div>

            <ProductCategoriesTable kategori={kategori} role="owner" />
          </div>
        </div>
      </Container>
    </Layout>
  );
}
