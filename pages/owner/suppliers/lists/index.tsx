import {
  Button,
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
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/router";

// components
import InputSearchBar from "@/components/input/InputSearchBar";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";
import {
  columnsSuppliersLists,
  renderCellSuppliersLists,
} from "@/headers/owner/suppliers/lists";

// utils
import usePagination from "@/hooks/usepagination";
import { customStyleTable } from "@/utils/customStyleTable";

import LoadingScreen from "@/components/LoadingScreen";
import { GlobalResponse } from "@/types/global.type";
import { fetcher } from "@/utils/fetcher";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useState } from "react";
import useSWR, { KeyedMutator } from "swr";

type SupplierType = {
  id_supplier: string;
  nama: string;
  email: string;
  no_telp: string;
  alamat_kantor: string;
  alamat_gudang: string;
  keterangan: string;
  bank: string;
  atas_nama: string;
  no_rekening: string;
  created_at: string;
};

export default function SuppliersPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const [search, setSearch] = useState("");
  const swr = useSWR<GlobalResponse<SupplierType[]>>(
    {
      url: "/supplier",
      method: "GET",
    },
    fetcher,
    {
      fallbackData: props.supplier,
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
      item.id_supplier.toLowerCase().includes(search.toLowerCase()) ||
      item.nama.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <SubComponentSuppliersPage
      {...{ supplier: filter, setSearch, mutate: swr.mutate }}
    />
  );
}

function SubComponentSuppliersPage({
  supplier,
  setSearch,
  mutate,
}: {
  supplier: SupplierType[] | undefined;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  mutate: KeyedMutator<any>;
}) {
  const { page, pages, data, setPage } = usePagination(
    supplier ? supplier : [],
    10,
  );
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [input, setInput] = useState({});
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function createSupplier() {
    setLoading(true);

    try {
      await fetcher({
        url: "/supplier",
        method: "POST",
        data: input,
      });

      setLoading(false);
      alert("supplier berhasil dibuat");
      onClose();
      mutate();
    } catch (error) {
      const response = error as {
        success: boolean;
        status_code: number;
        error: { name: string; message: string };
      };
      setLoading(false);

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

  async function deleteSupplier(id_supplier: string) {
    if (!confirm("apakah anda yakin?")) return;

    try {
      await fetcher({
        url: "/supplier/" + id_supplier,
        method: "DELETE",
      });
      alert("supplier berhasil dihapus");
      onClose();
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
    <Layout title="Daftar Supplier">
      <Container className="gap-8">
        <h4 className="text-lg font-semibold text-default-900">
          Daftar Supplier
        </h4>

        <div className="grid gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <InputSearchBar
              placeholder="Cari ID Supplier atau Nama"
              className="w-full sm:max-w-[500px]"
              onChange={(e) => setSearch(e.target.value)}
            />

            <Button
              variant="solid"
              color="primary"
              className="w-full font-medium sm:w-max"
              onClick={onOpen}
            >
              Tambah Supplier
            </Button>

            <Modal
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              isDismissable={false}
              isKeyboardDismissDisabled={true}
              onClose={() => {
                setInput({});
              }}
              size="xl"
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="font-semibold text-default-900">
                      Tambah Supplier
                    </ModalHeader>

                    <ModalBody>
                      <div className="grid gap-4">
                        <div className="grid grid-cols-3 gap-2">
                          <Input
                            isRequired
                            variant="flat"
                            color="default"
                            labelPlacement="outside"
                            label="Nama Supplier"
                            name="nama"
                            placeholder="Ex: Supplier 1"
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
                            labelPlacement="outside"
                            label="Email"
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
                            isRequired
                            variant="flat"
                            color="default"
                            labelPlacement="outside"
                            label="No Telpon"
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
                            type="text"
                            size="sm"
                            variant="flat"
                            maxRows={3}
                            labelPlacement="outside"
                            label={
                              <span className="text-[12px] text-default-900">
                                Alamat Kantor
                              </span>
                            }
                            placeholder="Ex: Jln Mawar"
                            className="w-full text-black"
                            name="alamat_kantor"
                            onChange={(e) => {
                              setInput({
                                ...input,
                                [e.target.name]: e.target.value,
                              });
                            }}
                          />

                          <Textarea
                            type="text"
                            size="sm"
                            variant="flat"
                            maxRows={3}
                            labelPlacement="outside"
                            label={
                              <span className="text-[12px] text-default-900">
                                Alamat Gudang
                              </span>
                            }
                            placeholder="Ex: Jln Melati"
                            className="w-full text-black"
                            name="alamat_gudang"
                            onChange={(e) => {
                              setInput({
                                ...input,
                                [e.target.name]: e.target.value,
                              });
                            }}
                          />
                        </div>

                        <Textarea
                          type="text"
                          size="sm"
                          variant="flat"
                          maxRows={3}
                          labelPlacement="outside"
                          label={
                            <span className="text-[12px] text-default-900">
                              Keterangan
                            </span>
                          }
                          name="keterangan"
                          placeholder="Ex: Supplier Aluminium"
                          className="w-full text-black"
                          onChange={(e) => {
                            setInput({
                              ...input,
                              [e.target.name]: e.target.value,
                            });
                          }}
                        />

                        <div className="grid grid-cols-3 gap-2">
                          <Input
                            isRequired
                            variant="flat"
                            color="default"
                            labelPlacement="outside"
                            label="Bank"
                            name="bank"
                            placeholder="Ex: BCA"
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
                            labelPlacement="outside"
                            label="Atas Nama"
                            name="atas_nama"
                            placeholder="Ex: John Doe"
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
                            labelPlacement="outside"
                            label="Nomor Rekening"
                            name="no_rekening"
                            placeholder="Ex: 09090808"
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
                        color="primary"
                        variant="light"
                        onPress={onClose}
                        className="font-medium"
                      >
                        Batal
                      </Button>

                      {loading ? (
                        <Button
                          color="primary"
                          variant="solid"
                          className="font-semibold"
                        >
                          <Spinner color="default" size="sm" />
                        </Button>
                      ) : (
                        <Button
                          color={
                            Object.keys(input).length < 9 ||
                            Object.values(input).includes("")
                              ? "default"
                              : "primary"
                          }
                          variant="solid"
                          className={`font-semibold ${Object.keys(input).length < 9 || Object.values(input).includes("") ? "text-gray-200" : null}`}
                          onClick={createSupplier}
                          disabled={
                            Object.keys(input).length < 9 ||
                            Object.values(input).includes("")
                          }
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
            <TableHeader columns={columnsSuppliersLists}>
              {(column) => (
                <TableColumn key={column.uid}>{column.name}</TableColumn>
              )}
            </TableHeader>

            <TableBody items={data}>
              {(supplier) => (
                <TableRow key={supplier.id_supplier}>
                  {(columnKey) => (
                    <TableCell>
                      {renderCellSuppliersLists(
                        supplier,
                        columnKey,
                        router,
                        deleteSupplier,
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

export const getServerSideProps = (async () => {
  const result = await fetcher({
    url: "/supplier",
    method: "GET",
  });

  const supplier: GlobalResponse<SupplierType[]> = result;

  return {
    props: {
      supplier,
    },
  };
}) satisfies GetServerSideProps<{ supplier: GlobalResponse<SupplierType[]> }>;
