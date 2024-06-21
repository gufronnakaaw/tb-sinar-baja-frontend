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
import WarehousesListsTable from "@/components/tables/WarehousesListsTable";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";

// utils
import { GlobalResponse } from "@/types/global.type";
import { WarehouseListType } from "@/types/warehouses.type";
import { fetcher } from "@/utils/fetcher";

export default function WarehousesListsPage() {
  const [search, setSearch] = useState("");
  const swr = useSWR<GlobalResponse<WarehouseListType[]>>({
    url: "/gudang",
    method: "GET",
  });

  if (swr.isLoading) {
    return <LoadingScreen role="admin" />;
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
  gudang: WarehouseListType[] | undefined;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  mutate: KeyedMutator<any>;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [kodeGudang, setKodeGudang] = useState("");
  const [namaGudang, setNamaGudang] = useState("");
  const [loading, setLoading] = useState(false);

  async function createGudang() {
    setLoading(true);

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
              className="w-full font-medium sm:w-max bg-teal-500 text-white"
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
                          placeholder="Masukan kode gudang"
                          onChange={(e) => setKodeGudang(e.target.value)}
                        />

                        <Input
                          isRequired
                          variant="flat"
                          color="default"
                          labelPlacement="outside"
                          label="Nama Gudang"
                          placeholder="Masukan nama gudang"
                          onChange={(e) => setNamaGudang(e.target.value)}
                        />
                      </div>
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
                          startContent={<Spinner color="white" size="sm" />}
                          className={`bg-teal-500 text-white ${loading ? "cursor-not-allowed justify-self-end font-medium" : ""}`}
                        >
                          Tunggu
                        </Button>
                      ) : (
                        <Button
                          variant="solid"
                          size="md"
                          onClick={createGudang}
                          className="w-max justify-self-end font-medium bg-teal-500 text-white"
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

          <WarehousesListsTable gudang={gudang} handleDelete={handleDelete} role="admin"/>
        </div>
      </Container>
    </Layout>
  );
}
