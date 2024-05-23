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
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
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
import { columnsUsers, renderCellUsers } from "@/headers/owner/users";

// utils
import usePagination from "@/hooks/usepagination";
import { GlobalResponse } from "@/types/global.type";
import { customStyleTable } from "@/utils/customStyleTable";
import { fetcher } from "@/utils/fetcher";

type PenggunaType = {
  username: string;
  nama: string;
  password_encrypt: string;
  role: string;
  created_at: string;
  updated_at: string;
};

export default function UsersPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const [search, setSearch] = useState("");
  const swr = useSWR<GlobalResponse<PenggunaType[]>>(
    {
      url: "/pengguna",
      method: "GET",
    },
    fetcher,
    {
      fallbackData: props.pengguna,
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
  const { page, pages, data, setPage } = usePagination(
    pengguna ? pengguna : [],
    10,
  );
  const [password, setPassword] = useState("");
  const router = useRouter();
  const passwordDisclosure = useDisclosure();
  const createDisclosure = useDisclosure();
  const [input, setInput] = useState({});
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<string[]>([]);

  async function seePassword(username: string, password_encrypt: string) {
    try {
      const result: { data: { password: string } } = await fetcher({
        url: `/pengguna/lihat?username=${username}&password_encrypt=${encodeURI(password_encrypt)}`,
        method: "GET",
      });

      passwordDisclosure.onOpen();
      setPassword(result.data.password);
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

  async function handleDelete(username: string) {
    if (!confirm("apakah anda yakin?")) return;

    try {
      await fetcher({
        url: "/pengguna/" + username,
        method: "DELETE",
      });

      alert("pengguna berhasil dihapus");
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

          <Table
            isHeaderSticky
            aria-label="users table"
            color="primary"
            selectionMode="single"
            classNames={customStyleTable}
            className="scrollbar-hide"
          >
            <TableHeader columns={columnsUsers}>
              {(column) => (
                <TableColumn key={column.uid}>{column.name}</TableColumn>
              )}
            </TableHeader>

            <TableBody items={data}>
              {(user) => (
                <TableRow key={user.username}>
                  {(columnKey) => (
                    <TableCell>
                      {renderCellUsers(
                        user,
                        columnKey,
                        router,
                        seePassword,
                        handleDelete,
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
            showShadow
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
    url: "/pengguna",
    method: "GET",
  });

  const pengguna: GlobalResponse<PenggunaType[]> = result;

  return {
    props: {
      pengguna,
    },
  };
}) satisfies GetServerSideProps<{ pengguna: GlobalResponse<PenggunaType[]> }>;
