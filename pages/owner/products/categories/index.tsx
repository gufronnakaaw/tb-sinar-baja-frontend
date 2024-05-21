import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/router";

// components
import InputSearchBar from "@/components/input/InputSearchBar";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";
import {
  columnsKategori,
  renderCellKategori,
} from "@/headers/owner/products/categories";

// utils
import usePagination from "@/hooks/usepagination";
import { customStyleTable } from "@/utils/customStyleTable";

import LoadingScreen from "@/components/LoadingScreen";
import { GlobalResponse } from "@/types/global.type";
import { fetcher } from "@/utils/fetcher";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React, { useState } from "react";
import useSWR, { KeyedMutator } from "swr";

type KategoriType = {
  id_kategori: string;
  nama: string;
  created_at: string;
  updated_at: string;
};

export default function ProductsCategoriesPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const [search, setSearch] = useState("");
  const swr = useSWR<GlobalResponse<KategoriType[]>>(
    {
      url: "/kategori",
      method: "GET",
    },
    fetcher,
    {
      fallbackData: props.kategori,
      refreshInterval: 15000,
    },
  );
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
  kategori: KategoriType[] | undefined;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  mutate: KeyedMutator<any>;
}) {
  const { page, pages, data, setPage } = usePagination(
    kategori ? kategori : [],
    10,
  );
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [namaKategori, setNamaKategori] = useState("");
  const router = useRouter();

  async function createKategori() {
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
                        <div className="grid gap-6">
                          <Input
                            isRequired
                            variant="flat"
                            color="default"
                            labelPlacement="outside"
                            label="Nama Kategori"
                            placeholder="Masukan nama kategori..."
                            onChange={(e) => setNamaKategori(e.target.value)}
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
                          onClick={createKategori}
                        >
                          Buat
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </div>

            <Table
              isHeaderSticky
              aria-label="products categories table"
              color="primary"
              selectionMode="single"
              classNames={customStyleTable}
              className="scrollbar-hide"
            >
              <TableHeader columns={columnsKategori}>
                {(column) => (
                  <TableColumn key={column.uid}>{column.name}</TableColumn>
                )}
              </TableHeader>

              <TableBody items={data}>
                {(item) => (
                  <TableRow key={item.id_kategori}>
                    {(columnKey) => (
                      <TableCell>
                        {renderCellKategori(item, columnKey, router)}
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
        </div>
      </Container>
    </Layout>
  );
}

export const getServerSideProps = (async () => {
  const result = await fetcher({
    url: "/kategori",
    method: "GET",
  });

  const kategori: GlobalResponse<KategoriType[]> = result;

  return {
    props: {
      kategori,
    },
  };
}) satisfies GetServerSideProps<{ kategori: GlobalResponse<KategoriType[]> }>;
