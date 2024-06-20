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

// components
import InputSearchBar from "@/components/input/InputSearchBar";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";

import LoadingScreen from "@/components/LoadingScreen";
import LevelsTable from "@/components/tables/LevelsTable";
import { GlobalResponse } from "@/types/global.type";
import { LevelType } from "@/types/members";
import { fetcher } from "@/utils/fetcher";
import { useState } from "react";
import useSWR, { KeyedMutator } from "swr";

export default function LevelsPage() {
  const [search, setSearch] = useState("");
  const swr = useSWR<GlobalResponse<LevelType[]>>({
    url: "/level",
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
      item.id_level.toLowerCase().includes(search.toLowerCase()) ||
      item.nama.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <SubComponentLevelsPage
      {...{ level: filter, setSearch, mutate: swr.mutate }}
    />
  );
}

function SubComponentLevelsPage({
  level,
  setSearch,
  mutate,
}: {
  level: LevelType[] | undefined;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  mutate: KeyedMutator<any>;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [nama, setNama] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreateLevel() {
    setLoading(true);
    if (!nama) {
      setLoading(false);
      return alert("Nama tidak boleh kosong");
    }

    try {
      await fetcher({
        url: "/level",
        method: "POST",
        data: {
          nama,
        },
      });
      alert("level berhasil dibuat");
      mutate();

      setNama("");
      setLoading(false);
      onClose();
    } catch (error) {
      setLoading(false);
      setNama("");
      onClose();

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
    <Layout title="Level Member">
      <Container className="gap-8">
        <h4 className="text-lg font-semibold text-default-900">Level Member</h4>

        <div className="grid gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <InputSearchBar
              placeholder="Cari ID Level atau Nama"
              className="w-full sm:max-w-[500px]"
              onChange={(e) => setSearch(e.target.value)}
            />

            <Button
              variant="solid"
              className="w-full bg-teal-500 font-medium text-white sm:w-max"
              onClick={onOpen}
            >
              Tambah Level
            </Button>

            <Modal
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              isDismissable={false}
              isKeyboardDismissDisabled={true}
              size="lg"
              onClose={() => {
                setNama("");
                setLoading(false);
              }}
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="font-semibold text-default-900">
                      Buat Level
                    </ModalHeader>

                    <ModalBody>
                      <div className="grid gap-6">
                        <Input
                          variant="flat"
                          color="default"
                          label="Nama Level"
                          labelPlacement="outside"
                          placeholder="Masukan nama level..."
                          onChange={(e) => setNama(e.target.value)}
                        />
                      </div>
                    </ModalBody>

                    <ModalFooter>
                      <Button
                        color="danger"
                        variant="light"
                        onPress={() => {
                          setNama("");
                          setLoading(false);
                          onClose();
                        }}
                        className="font-medium"
                      >
                        Batal
                      </Button>

                      {loading ? (
                        <Button
                          variant="solid"
                          startContent={<Spinner color="white" size="sm" />}
                          className={`${loading ? "cursor-not-allowed justify-self-end bg-teal-500 font-medium text-white" : ""}`}
                        >
                          Tunggu
                        </Button>
                      ) : (
                        <Button
                          variant="solid"
                          onClick={handleCreateLevel}
                          className="bg-teal-500 font-medium text-white"
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

          <LevelsTable level={level} role="admin" mutate={mutate} />
        </div>
      </Container>
    </Layout>
  );
}
