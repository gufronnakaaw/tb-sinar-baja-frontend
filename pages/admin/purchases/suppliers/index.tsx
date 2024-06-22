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
import { SupplierBank, SupplierType } from "@/types/suppliers.type";
import { fetcher } from "@/utils/fetcher";

export default function SuppliersPage() {
  const [search, setSearch] = useState("");
  const swr = useSWR<GlobalResponse<SupplierType[]>>({
    url: "/supplier",
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
  const bankDisclosure = useDisclosure();
  const [input, setInput] = useState({});
  const [loading, setLoading] = useState(false);
  const [bank, setBank] = useState<SupplierBank[]>([]);

  async function createSupplier() {
    setLoading(true);

    const bank = [];
    const objectAssign = {};

    for (const key in input) {
      const objectInput = input as any;

      switch (key) {
        case "bank":
          Object.assign(objectAssign, {
            nama: objectInput[key],
          });
          break;
        case "atas_nama":
          Object.assign(objectAssign, {
            atas_nama: objectInput[key],
          });
          break;
        case "no_rekening":
          Object.assign(objectAssign, {
            no_rekening: objectInput[key],
          });
          break;
      }
    }

    bank.push(objectAssign);

    try {
      await fetcher({
        url: "/supplier",
        method: "POST",
        data: {
          ...input,
          bank,
        },
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
              className="w-full bg-teal-500 font-medium text-white sm:w-max"
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
                          startContent={<Spinner color="white" size="sm" />}
                          className={`bg-teal-500 text-white ${loading ? "cursor-not-allowed font-medium" : ""}`}
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
                          className={`bg-teal-500 font-medium text-white ${Object.keys(input).length < 9 || Object.values(input).includes("") ? "cursor-not-allowed " : null}`}
                        >
                          Tambah
                        </Button>
                      )}
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>

            <Modal
              isOpen={bankDisclosure.isOpen}
              onOpenChange={bankDisclosure.onOpenChange}
              isDismissable={false}
              isKeyboardDismissDisabled={true}
              size="lg"
              onClose={() => {
                setBank([]);
              }}
            >
              <ModalContent>
                {() => (
                  <>
                    <ModalHeader className="font-semibold text-default-900">
                      Daftar Bank
                    </ModalHeader>

                    <ModalBody>
                      <div className="grid gap-[2px]">
                        {bank.length > 0
                          ? bank.map((item, index) => {
                              return (
                                <div key={item.id_table}>
                                  <p className="text-md font-semibold text-default-900">
                                    Bank {index + 1}
                                  </p>

                                  <div className="grid grid-cols-[100px_10px_10fr]  gap-1 text-sm text-default-900">
                                    <div className="text-sm font-medium text-default-600">
                                      Nama Bank
                                    </div>
                                    <div className="font-medium">:</div>
                                    <p className="font-bold text-teal-500">
                                      {item.nama}
                                    </p>
                                  </div>
                                  <div className="grid grid-cols-[100px_10px_10fr]  gap-1 text-sm text-default-900">
                                    <div className="text-sm font-medium text-default-600">
                                      Atas Nama
                                    </div>
                                    <div className="font-medium">:</div>
                                    <p className="font-bold text-teal-500">
                                      {item.atas_nama}
                                    </p>
                                  </div>
                                  <div className="grid grid-cols-[100px_10px_10fr]  gap-1 text-sm text-default-900">
                                    <div className="grid text-sm font-medium text-default-600">
                                      No Rekening
                                    </div>
                                    <div className="font-medium">:</div>
                                    <p className="font-bold text-teal-500">
                                      {item.no_rekening}
                                    </p>
                                  </div>
                                </div>
                              );
                            })
                          : null}
                      </div>
                    </ModalBody>

                    <ModalFooter></ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>

          <SuppliersListTable
            {...{
              supplier,
              mutate,
              role: "admin",
              onOpen: bankDisclosure.onOpen,
              setBank,
            }}
          />
        </div>
      </Container>
    </Layout>
  );
}
