import {
  Button,
  Checkbox,
  CheckboxGroup,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import useSWR, { KeyedMutator } from "swr";

// components
import LoadingScreen from "@/components/LoadingScreen";
import InputSearchBar from "@/components/input/InputSearchBar";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";

// utils
import UsersTable from "@/components/tables/UsersTable";
import { GlobalResponse } from "@/types/global.type";
import { PenggunaType } from "@/types/users.type";
import { fetcher } from "@/utils/fetcher";

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const swr = useSWR<GlobalResponse<PenggunaType[]>>({
    url: "/pengguna",
    method: "GET",
  });

  if (swr.isLoading) {
    return <LoadingScreen role="owner" />;
  }

  if (swr.error) {
    console.log(swr.error);
  }

  const filter = swr.data?.data.filter((item) => {
    return (
      item.nama.toLowerCase().includes(search.toLowerCase()) ||
      item.username.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <SubComponentUsersPage
      {...{ pengguna: filter, setSearch, mutate: swr.mutate }}
    />
  );
}

function SubComponentUsersPage({
  pengguna,
  setSearch,
  mutate,
}: {
  pengguna: PenggunaType[] | undefined;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  mutate: KeyedMutator<any>;
}) {
  const [password, setPassword] = useState("");
  const passwordDisclosure = useDisclosure();
  const createDisclosure = useDisclosure();
  const [input, setInput] = useState({});
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<string[]>([]);

  async function createPengguna() {
    setLoading(true);
    try {
      await fetcher({
        url: "/pengguna",
        method: "POST",
        data: {
          ...input,
          role: role.join(","),
        },
      });

      alert("pengguna berhasil dibuat");
      createDisclosure.onClose();
      setLoading(false);
      setInput("");
      setRole([]);
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
    <Layout title="Pengguna">
      <Container className="gap-8">
        <h4 className="text-lg font-semibold text-default-900">Pengguna</h4>

        <div className="grid gap-4">
          <div className="grid gap-4 xl:flex xl:items-end xl:justify-between">
            <InputSearchBar
              placeholder="Cari Username atau Nama"
              className="w-full sm:max-w-[450px]"
              onChange={(e) => setSearch(e.target.value)}
            />

            <Button
              variant="solid"
              color="primary"
              className="w-full font-medium sm:w-max"
              onClick={createDisclosure.onOpen}
            >
              Tambah Pengguna
            </Button>

            <Modal
              isOpen={createDisclosure.isOpen}
              onOpenChange={createDisclosure.onOpenChange}
              isDismissable={false}
              isKeyboardDismissDisabled={true}
              size="lg"
              onClose={() => {
                setInput("");
                setRole([]);
              }}
            >
              <ModalContent>
                {() => (
                  <>
                    <ModalHeader className="font-semibold text-default-900">
                      Tambah Pengguna
                    </ModalHeader>

                    <ModalBody>
                      <div className="grid gap-6">
                        <Input
                          isRequired
                          variant="flat"
                          color="default"
                          label="Username"
                          labelPlacement="outside"
                          name="username"
                          placeholder="Masukan username"
                          onChange={(e) => {
                            setInput({
                              ...input,
                              [e.target.name]: e.target.value,
                            });
                          }}
                        />

                        <Input
                          isRequired
                          variant="flat"
                          color="default"
                          label="Nama"
                          labelPlacement="outside"
                          name="nama"
                          placeholder="Masukan nama"
                          onChange={(e) => {
                            setInput({
                              ...input,
                              [e.target.name]: e.target.value,
                            });
                          }}
                        />

                        <Input
                          isRequired
                          variant="flat"
                          color="default"
                          label="Kata Sandi"
                          labelPlacement="outside"
                          name="password"
                          placeholder="Masukan kata sandi"
                          onChange={(e) => {
                            setInput({
                              ...input,
                              [e.target.name]: e.target.value,
                            });
                          }}
                        />

                        <CheckboxGroup
                          orientation="horizontal"
                          label={
                            <span className="inline-flex text-sm text-default-900 after:ml-[1px] after:text-danger after:content-['*']">
                              Pilih Role
                            </span>
                          }
                        >
                          <Checkbox
                            value="owner"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setRole([...role, e.target.value]);
                              } else {
                                const filter = role.filter(
                                  (item) => item !== e.target.value,
                                );

                                setRole([...filter]);
                              }
                            }}
                          >
                            Owner
                          </Checkbox>

                          <Checkbox
                            value="admin"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setRole([...role, e.target.value]);
                              } else {
                                const filter = role.filter(
                                  (item) => item !== e.target.value,
                                );

                                setRole([...filter]);
                              }
                            }}
                          >
                            Admin
                          </Checkbox>

                          <Checkbox
                            value="cashier"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setRole([...role, e.target.value]);
                              } else {
                                const filter = role.filter(
                                  (item) => item !== e.target.value,
                                );

                                setRole([...filter]);
                              }
                            }}
                          >
                            Kasir
                          </Checkbox>
                        </CheckboxGroup>
                      </div>
                    </ModalBody>

                    <ModalFooter>
                      <Button
                        color="danger"
                        variant="light"
                        onPress={createDisclosure.onClose}
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
                          onClick={createPengguna}
                          disabled={Object.keys(input).length < 3}
                          className="font-medium"
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

          <Modal
            isOpen={passwordDisclosure.isOpen}
            onOpenChange={passwordDisclosure.onOpenChange}
            isDismissable={false}
            isKeyboardDismissDisabled={true}
            size="lg"
            onClose={() => setPassword("")}
          >
            <ModalContent>
              {() => (
                <>
                  <ModalHeader className="font-semibold text-default-900">
                    Kata Sandi
                  </ModalHeader>

                  <ModalBody>
                    <Input
                      isRequired
                      variant="flat"
                      color="default"
                      labelPlacement="outside"
                      defaultValue={password}
                      disabled={true}
                    />
                  </ModalBody>

                  <ModalFooter></ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>

          <UsersTable
            pengguna={pengguna}
            setPassword={setPassword}
            mutate={mutate}
            onOpen={passwordDisclosure.onOpen}
          />
        </div>
      </Container>
    </Layout>
  );
}
