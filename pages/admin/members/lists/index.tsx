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
  Textarea,
  useDisclosure,
} from "@nextui-org/react";

import LoadingScreen from "@/components/LoadingScreen";
import InputSearchBar from "@/components/input/InputSearchBar";
import MembersTable from "@/components/tables/MembersTable";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";
import { GlobalResponse } from "@/types/global.type";
import { LevelType, MemberType } from "@/types/members";
import { fetcher } from "@/utils/fetcher";
import { useEffect, useState } from "react";
import useSWR, { KeyedMutator } from "swr";

export default function MemberPage() {
  const [search, setSearch] = useState("");
  const swr = useSWR<GlobalResponse<MemberType[]>>({
    url: "/member",
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
      item.id_member.toLowerCase().includes(search.toLowerCase()) ||
      item.nama.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <SubComponentMemberPage
      {...{ member: filter, setSearch, mutate: swr.mutate }}
    />
  );
}

function SubComponentMemberPage({
  member,
  setSearch,
  mutate,
}: {
  member: MemberType[] | undefined;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  mutate: KeyedMutator<any>;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [levelId, setLevelId] = useState("");

  const [level, setLevel] = useState<LevelType[]>([]);
  const [input, setInput] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getLevel();

    async function getLevel() {
      try {
        const response: GlobalResponse<LevelType[]> = await fetcher({
          url: "/level",
          method: "GET",
        });

        setLevel(response.data);
      } catch (error) {
        alert("terjadi kesalahan saat mengambil data level");
      }
    }
  }, []);

  async function createMember() {
    setLoading(true);

    try {
      await fetcher({
        url: "/member",
        method: "POST",
        data: {
          level_id: levelId,
          ...input,
        },
      });

      setLoading(false);
      alert("member berhasil dibuat");
      setInput({});
      setLevelId("");
      onClose();
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
    <Layout title="Daftar Member">
      <Container className="gap-8">
        <h4 className="text-lg font-semibold text-default-900">
          Daftar Member
        </h4>

        <div className="grid gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <InputSearchBar
              placeholder="Cari ID Member atau Nama"
              className="w-full sm:max-w-[500px]"
              onChange={(e) => setSearch(e.target.value)}
            />

            <Button
              variant="solid"
              className="w-full bg-teal-500 font-medium text-white sm:w-max"
              onClick={onOpen}
            >
              Tambah Member
            </Button>

            <Modal
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              isDismissable={false}
              isKeyboardDismissDisabled={true}
              onClose={() => {
                setInput({});
                setLevelId("");
              }}
              size="2xl"
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="font-semibold text-default-900">
                      Tambah Member
                    </ModalHeader>

                    <ModalBody>
                      <div className="grid gap-4">
                        <Select
                          isRequired
                          label="Pilih Level"
                          size="sm"
                          onChange={(e) => {
                            setLevelId(e.target.value);
                          }}
                        >
                          {level.map((item) => (
                            <SelectItem
                              key={item.id_level}
                              value={item.id_level}
                            >
                              {item.nama}
                            </SelectItem>
                          ))}
                        </Select>

                        <div className="grid grid-cols-3 gap-2">
                          <Input
                            isRequired
                            variant="flat"
                            color="default"
                            label="Nama Member"
                            labelPlacement="outside"
                            name="nama"
                            placeholder="Ex: Member 1"
                            onChange={(e) => {
                              setInput({
                                ...input,
                                [e.target.name]: e.target.value,
                              });
                            }}
                          />

                          <Input
                            variant="flat"
                            color="default"
                            label="Email"
                            labelPlacement="outside"
                            name="email"
                            placeholder="Ex: sup1@mail.com"
                            onChange={(e) => {
                              setInput({
                                ...input,
                                [e.target.name]: e.target.value,
                              });
                            }}
                          />

                          <Input
                            variant="flat"
                            color="default"
                            label="No Telpon"
                            labelPlacement="outside"
                            name="no_telp"
                            placeholder="Ex: 081122334455"
                            onChange={(e) => {
                              setInput({
                                ...input,
                                [e.target.name]: e.target.value,
                              });
                            }}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <Textarea
                            variant="flat"
                            maxRows={3}
                            label="Perusahaan"
                            labelPlacement="outside"
                            name="perusahaan"
                            placeholder="Ex: Perusahaan Beton"
                            onChange={(e) => {
                              setInput({
                                ...input,
                                [e.target.name]: e.target.value,
                              });
                            }}
                          />

                          <Textarea
                            variant="flat"
                            maxRows={3}
                            label="Alamat"
                            labelPlacement="outside"
                            name="alamat"
                            placeholder="Ex: Jln Melati"
                            onChange={(e) => {
                              setInput({
                                ...input,
                                [e.target.name]: e.target.value,
                              });
                            }}
                          />
                        </div>
                      </div>
                    </ModalBody>

                    <ModalFooter>
                      <Button
                        color="danger"
                        variant="light"
                        onPress={() => {
                          setLevelId("");
                          setInput({});
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
                          className={`${loading ? "cursor-not-allowed bg-teal-500 font-medium text-white" : ""}`}
                        >
                          Tunggu
                        </Button>
                      ) : (
                        <Button
                          variant="solid"
                          color={
                            Object.keys(input).length < 2 ||
                            !input?.nama ||
                            !levelId
                              ? "default"
                              : "primary"
                          }
                          onClick={createMember}
                          disabled={
                            Object.keys(input).length < 2 ||
                            !input?.nama ||
                            !levelId
                          }
                          className={`font-medium ${Object.keys(input).length < 2 || !input?.nama || !levelId ? "cursor-not-allowed bg-teal-500 text-white" : null}`}
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
          <MembersTable {...{ member, role: "admin", mutate }} />
        </div>
      </Container>
    </Layout>
  );
}
