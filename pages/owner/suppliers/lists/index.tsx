import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useState } from "react";
import useSWR, { KeyedMutator } from "swr";

// components
import LoadingScreen from "@/components/LoadingScreen";
import InputSearchBar from "@/components/input/InputSearchBar";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";

// utils
import SuppliersListTable from "@/components/tables/SuppliersListTable";
import { GlobalResponse } from "@/types/global.type";
import { SupplierType } from "@/types/suppliers.type";
import { fetcher } from "@/utils/fetcher";

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
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [input, setInput] = useState({});
  const [loading, setLoading] = useState(false);

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
              size="2xl"
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
                            label="Nama Supplier"
                            labelPlacement="outside"
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
                            isRequired
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
                            isRequired
                            variant="flat"
                            maxRows={3}
                            label="Alamat Kantor"
                            labelPlacement="outside"
                            name="alamat_kantor"
                            placeholder="Ex: Jln Mawar"
                            onChange={(e) => {
                              setInput({
                                ...input,
                                [e.target.name]: e.target.value,
                              });
                            }}
                          />

                          <Textarea
                            isRequired
                            variant="flat"
                            maxRows={3}
                            label="Alamat Gudang"
                            labelPlacement="outside"
                            name="alamat_gudang"
                            placeholder="Ex: Jln Melati"
                            onChange={(e) => {
                              setInput({
                                ...input,
                                [e.target.name]: e.target.value,
                              });
                            }}
                          />
                        </div>

                        <Textarea
                          isRequired
                          variant="flat"
                          maxRows={3}
                          label="Keterangan"
                          labelPlacement="outside"
                          name="keterangan"
                          placeholder="Ex: Supplier Aluminium"
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
                            label="Bank"
                            labelPlacement="outside"
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
                            label="Atas Nama"
                            labelPlacement="outside"
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
                            label="Nomor Rekening"
                            labelPlacement="outside"
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
                          className={`${loading ? "cursor-not-allowed font-medium" : ""}`}
                        >
                          Tunggu
                        </Button>
                      ) : (
                        <Button
                          variant="solid"
                          color={
                            Object.keys(input).length < 9 ||
                            Object.values(input).includes("")
                              ? "default"
                              : "primary"
                          }
                          onClick={createSupplier}
                          disabled={
                            Object.keys(input).length < 9 ||
                            Object.values(input).includes("")
                          }
                          className={`font-medium ${Object.keys(input).length < 9 || Object.values(input).includes("") ? "cursor-not-allowed text-gray-400" : null}`}
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

          <SuppliersListTable supplier={supplier} mutate={mutate} />
        </div>
      </Container>
    </Layout>
  );
}
