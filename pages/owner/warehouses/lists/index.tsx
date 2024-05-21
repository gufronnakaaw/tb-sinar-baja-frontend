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
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React, { useState } from "react";
import useSWR, { KeyedMutator } from "swr";

// components
import InputSearchBar from "@/components/input/InputSearchBar";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";
import {
  columnsGudang,
  renderCellGudang,
} from "@/headers/owner/warehouses/lists";

// utils
import usePagination from "@/hooks/usepagination";
import { GlobalResponse } from "@/types/global.type";
import { customStyleTable } from "@/utils/customStyleTable";
import { fetcher } from "@/utils/fetcher";
import { useRouter } from "next/router";

type GudangType = {
  kode_gudang: string;
  nama: string;
  can_delete: boolean;
  created_at: string;
  updated_at: string;
};

export default function WarehousesListsPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const [search, setSearch] = useState("");
  const swr = useSWR<GlobalResponse<GudangType[]>>(
    {
      url: "/gudang",
      method: "GET",
    },
    fetcher,
    {
      fallbackData: props.gudang,
      refreshInterval: 15000,
    },
  );

  if (swr.isLoading) {
    return;
  }

  if (swr.error) {
    console.log(swr.error);
  }

  const filter = swr.data?.data.filter((item) => {
    return (
      item.kode_gudang.toLowerCase().includes(search.toLowerCase()) ||
      item.nama.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <SubComponentWarehousesPage
      {...{ gudang: filter, setSearch, mutate: swr.mutate }}
    />
  );
}

function SubComponentWarehousesPage({
  gudang,
  setSearch,
  mutate,
}: {
  gudang: GudangType[] | undefined;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  mutate: KeyedMutator<any>;
}) {
  const router = useRouter();

  const { page, pages, data, setPage } = usePagination(
    gudang ? gudang : [],
    10,
  );
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [kodeGudang, setKodeGudang] = useState("");
  const [namaGudang, setNamaGudang] = useState("");

  async function createGudang() {
    if (!kodeGudang || !namaGudang) {
      return alert("tidak boleh kosong");
    }

    try {
      await fetcher({
        url: "/gudang",
        method: "POST",
        data: {
          kode_gudang: kodeGudang,
          nama: namaGudang,
        },
      });
      alert("buat gudang berhasil");
      onClose();
      mutate();
    } catch (error) {
      alert("ups terjadi kesalahan");
      console.log(error);
    }
  }

  async function handleDelete(kode_gudang: string) {
    if (!confirm("apakah anda yakin ingin menghapus gudang?")) return;

    try {
      await fetcher({
        url: "/gudang/" + kode_gudang,
        method: "DELETE",
      });

      alert("berhasil hapus gudang");
      mutate();
    } catch (error) {
      alert("ups sepertinya ada masalah saat menghapus gudang");
      console.log(error);
    }
  }

  return (
    <Layout title="Daftar Gudang">
      <Container className="gap-8">
        <h4 className="text-lg font-semibold text-default-900">
          Daftar Gudang
        </h4>

        <div className="grid gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <InputSearchBar
              placeholder="Cari Kode Gudang"
              className="w-full sm:max-w-[500px]"
              onChange={(e) => setSearch(e.target.value)}
            />

            <Button
              variant="solid"
              color="primary"
              className="w-full font-medium sm:w-max"
              onClick={onOpen}
            >
              Buat Gudang
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
                      Buat Gudang
                    </ModalHeader>

                    <ModalBody>
                      <div className="grid gap-6">
                        <Input
                          isRequired
                          variant="flat"
                          color="default"
                          labelPlacement="outside"
                          label="Kode Gudang"
                          placeholder="Masukan kode gudang..."
                          onChange={(e) => setKodeGudang(e.target.value)}
                        />

                        <Input
                          isRequired
                          variant="flat"
                          color="default"
                          labelPlacement="outside"
                          label="Nama Gudang"
                          placeholder="Masukan kode gudang..."
                          onChange={(e) => setNamaGudang(e.target.value)}
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
                        onClick={createGudang}
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
            aria-label="warehouseLists table"
            color="primary"
            selectionMode="single"
            classNames={customStyleTable}
            className="scrollbar-hide"
          >
            <TableHeader columns={columnsGudang}>
              {(column) => (
                <TableColumn key={column.uid}>{column.name}</TableColumn>
              )}
            </TableHeader>

            <TableBody items={data}>
              {(item) => (
                <TableRow key={item.kode_gudang}>
                  {(columnKey) => (
                    <TableCell>
                      {renderCellGudang(item, columnKey, handleDelete, router)}
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

export const getServerSideProps = (async () => {
  const result = await fetcher({
    url: "/gudang",
    method: "GET",
  });

  const gudang: GlobalResponse<GudangType[]> = result;

  return {
    props: {
      gudang,
    },
  };
}) satisfies GetServerSideProps<{ gudang: GlobalResponse<GudangType[]> }>;
