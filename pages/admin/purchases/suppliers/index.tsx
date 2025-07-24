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
import useSWR from "swr";

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

export default function SuppliersPageAdmin() {
  const [search, setSearch] = useState("");
  const swr = useSWR<GlobalResponse<SupplierType[]>>({
    url: "/supplier",
    method: "GET",
  });

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const bankDisclosure = useDisclosure();
  const [input, setInput] = useState({});
  const [loading, setLoading] = useState(false);
  const [bank, setBank] = useState<SupplierBank[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editBankIndex, setEditBankIndex] = useState<number | null>(null);
  const [bankForm, setBankForm] = useState({
    id_table: 0,
    supplier_id: "",
    nama: "",
    atas_nama: "",
    no_rekening: "",
  });
  const [supplierId, setSupplierId] = useState("");

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

  async function refetchBank(id_supplier: string) {
    try {
      const response: GlobalResponse<SupplierBank[]> = await fetcher({
        url: "/supplier/bank?id_supplier=" + id_supplier,
        method: "GET",
      });

      setBank(response.data);
    } catch (error) {
      setBank([]);
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

  async function createBank(data: typeof bankForm, supplier_id: string) {
    setLoading(true);

    try {
      await fetcher({
        url: "/supplier/bank",
        method: "POST",
        data: {
          nama: data.nama,
          atas_nama: data.atas_nama,
          no_rekening: data.no_rekening,
          id_supplier: supplier_id,
        },
      });

      setLoading(false);
      alert("Bank berhasil ditambahkan");

      refetchBank(supplier_id);
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

  async function updateBank(data: typeof bankForm) {
    setLoading(true);

    try {
      await fetcher({
        url: "/supplier/bank",
        method: "PATCH",
        data: {
          bank_id: data.id_table,
          nama: data.nama,
          atas_nama: data.atas_nama,
          no_rekening: data.no_rekening,
        },
      });

      setLoading(false);
      alert("Bank berhasil diperbarui");
      refetchBank(data.supplier_id);
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

  async function deleteBank(id_bank: number, supplier_id: string) {
    if (!confirm("apakah anda yakin?")) return;

    try {
      await fetcher({
        url: `/supplier/bank/${supplier_id}/${id_bank}`,
        method: "DELETE",
      });
      alert("bank berhasil dihapus");
      refetchBank(supplier_id);
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
      swr.mutate();
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

            <Modal
              isOpen={bankDisclosure.isOpen}
              onOpenChange={bankDisclosure.onOpenChange}
              isDismissable={false}
              isKeyboardDismissDisabled={true}
              size="lg"
              onClose={() => {
                setBank([]);
                setEditBankIndex(null);
                setBankForm({
                  nama: "",
                  atas_nama: "",
                  no_rekening: "",
                  supplier_id: "",
                  id_table: 0,
                });
                setIsAdding(false);
                setSupplierId("");
              }}
            >
              <ModalContent>
                {() => (
                  <>
                    <ModalHeader className="font-semibold text-default-900">
                      Daftar Bank
                    </ModalHeader>

                    <ModalBody>
                      <div className="grid gap-2">
                        {(isAdding || editBankIndex !== null) && (
                          <div className="mb-2 rounded-lg border bg-gray-50 p-3">
                            <div className="grid grid-cols-3 gap-2">
                              <Input
                                label="Nama Bank"
                                size="sm"
                                value={bankForm.nama}
                                onChange={(e) =>
                                  setBankForm((form) => ({
                                    ...form,
                                    nama: e.target.value,
                                  }))
                                }
                              />
                              <Input
                                label="Atas Nama"
                                size="sm"
                                value={bankForm.atas_nama}
                                onChange={(e) =>
                                  setBankForm((form) => ({
                                    ...form,
                                    atas_nama: e.target.value,
                                  }))
                                }
                              />
                              <Input
                                label="No Rekening"
                                size="sm"
                                value={bankForm.no_rekening}
                                onChange={(e) =>
                                  setBankForm((form) => ({
                                    ...form,
                                    no_rekening: e.target.value,
                                  }))
                                }
                              />
                            </div>
                            <div className="mt-3 flex gap-2">
                              <Button
                                color="primary"
                                size="sm"
                                onClick={async () => {
                                  if (
                                    !bankForm.nama ||
                                    !bankForm.atas_nama ||
                                    !bankForm.no_rekening
                                  ) {
                                    alert("Semua field wajib diisi");
                                    return;
                                  }
                                  if (editBankIndex !== null) {
                                    await updateBank(bankForm);
                                  } else {
                                    await createBank(bankForm, supplierId);
                                  }
                                  setIsAdding(false);
                                  setEditBankIndex(null);
                                  setBankForm({
                                    nama: "",
                                    atas_nama: "",
                                    no_rekening: "",
                                    supplier_id: "",
                                    id_table: 0,
                                  });
                                }}
                              >
                                Simpan
                              </Button>
                              <Button
                                color="danger"
                                variant="light"
                                size="sm"
                                onClick={() => {
                                  setIsAdding(false);
                                  setEditBankIndex(null);
                                  setBankForm({
                                    nama: "",
                                    atas_nama: "",
                                    no_rekening: "",
                                    supplier_id: "",
                                    id_table: 0,
                                  });
                                }}
                              >
                                Batal
                              </Button>
                            </div>
                          </div>
                        )}

                        {/* List Bank */}
                        {bank.length > 0 ? (
                          bank.map((item, index) => (
                            <div
                              key={item.id_table}
                              className="relative rounded-lg border bg-white p-3"
                            >
                              <p className="text-md font-semibold text-default-900">
                                Bank {index + 1}
                              </p>
                              <div className="grid grid-cols-[100px_10px_10fr] gap-1 text-sm text-default-900">
                                <div className="text-sm font-medium text-default-600">
                                  Nama Bank
                                </div>
                                <div className="font-medium">:</div>
                                <p className="font-bold text-primary">
                                  {item.nama}
                                </p>
                              </div>
                              <div className="grid grid-cols-[100px_10px_10fr] gap-1 text-sm text-default-900">
                                <div className="text-sm font-medium text-default-600">
                                  Atas Nama
                                </div>
                                <div className="font-medium">:</div>
                                <p className="font-bold text-primary">
                                  {item.atas_nama}
                                </p>
                              </div>
                              <div className="grid grid-cols-[100px_10px_10fr] gap-1 text-sm text-default-900">
                                <div className="text-sm font-medium text-default-600">
                                  No Rekening
                                </div>
                                <div className="font-medium">:</div>
                                <p className="font-bold text-primary">
                                  {item.no_rekening}
                                </p>
                              </div>
                              <div className="absolute right-2 top-2 flex gap-1">
                                <Button
                                  size="sm"
                                  color="primary"
                                  variant="light"
                                  onClick={() => {
                                    setEditBankIndex(index);
                                    setBankForm({
                                      nama: item.nama,
                                      atas_nama: item.atas_nama,
                                      no_rekening: item.no_rekening,
                                      supplier_id: item.supplier_id,
                                      id_table: item.id_table,
                                    });
                                    setIsAdding(false);
                                  }}
                                >
                                  Edit
                                </Button>
                                <Button
                                  size="sm"
                                  color="danger"
                                  variant="light"
                                  onClick={() => {
                                    deleteBank(item.id_table, item.supplier_id);
                                  }}
                                >
                                  Hapus
                                </Button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-center text-default-400">
                            Belum ada data bank.
                          </p>
                        )}
                      </div>
                    </ModalBody>

                    <ModalFooter>
                      <Button
                        color="primary"
                        variant="flat"
                        onClick={() => {
                          setIsAdding(true);
                          setEditBankIndex(null);
                          setBankForm({
                            supplier_id: "",
                            nama: "",
                            atas_nama: "",
                            no_rekening: "",
                            id_table: 0,
                          });
                        }}
                      >
                        Tambah Bank
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>

          <SuppliersListTable
            {...{
              supplier: filter,
              mutate: swr.mutate,
              role: "admin",
              onOpen: bankDisclosure.onOpen,
              setBank,
              setSupplierId,
            }}
          />
        </div>
      </Container>
    </Layout>
  );
}
