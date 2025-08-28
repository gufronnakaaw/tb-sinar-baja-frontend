import { useEffect, useState } from "react";

// components
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";
import { GlobalResponse } from "@/types/global.type";
import { FinalDetail, FinalType, ProdukFinal } from "@/types/preorders.type";
import { fetcher } from "@/utils/fetcher";
import { SATUANLIST } from "@/utils/satuan";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Checkbox,
  Input,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";

// utils

export default function Form({
  preorder,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [idPreorder, setIdPreorder] = useState("");
  const [preorderItems, setPreorderItems] = useState<ProdukFinal[]>([]);
  const [temporaryItems, setTemporaryItems] = useState<
    {
      kode_item: string;
      kode_pabrik: string | null;
      nama_produk: string;
      qty: number;
      satuan: string;
      harga: number;
      jumlah: number;
      jumlah_entry: number;
      jumlah_rusak: number;
      checklist: boolean;
      satuan_rusak: string;
    }[]
  >([]);
  const router = useRouter();
  // const swr = useSWR<GlobalResponse<SupplierType[]>>({
  //   url: "/supplier",
  //   method: "GET",
  // });

  // if (swr.isLoading) {
  //   return <LoadingScreen role="admin" />;
  // }

  // if (swr.error) {
  //   console.log(swr.error);
  // }

  // const filter = swr.data?.data.filter((item) => {
  //   return (
  //     item.id_supplier.toLowerCase().includes(search.toLowerCase()) ||
  //     item.nama.toLowerCase().includes(search.toLowerCase())
  //   );
  // });

  useEffect(() => {
    if (idPreorder) {
      getPreorderById();
    }

    async function getPreorderById() {
      try {
        const result: GlobalResponse<FinalDetail> = await fetcher({
          url: "/preorder?id_preorder=" + idPreorder,
          method: "GET",
        });

        setPreorderItems(result.data.produk);
        setTemporaryItems(
          result.data.produk.map((item) => {
            return {
              ...item,
              checklist: true,
              jumlah_entry: item.qty,
              jumlah_rusak: 0,
              satuan_rusak: "",
            };
          }),
        );
      } catch (error) {
        alert("terjadi kesalahan saat mendapatkan data preorder");
        console.log(error);
      }
    }
  }, [idPreorder]);

  async function createEntry() {
    const filterChecklist = temporaryItems.filter((item) => item.checklist);

    if (!filterChecklist.length) {
      return alert("Silahkan ceklis minimal 1 item");
    }

    const produkBaik: any[] = [];
    const produkRusak: any[] = [];

    filterChecklist.map((item) => {
      if (item.jumlah_rusak) {
        produkRusak.push(item);
      }

      produkBaik.push(item);
    });

    try {
      await fetcher({
        url: "/gudang/entry",
        method: "POST",
        data: {
          preorder_id: idPreorder,
          produk_baik: produkBaik,
          produk_rusak: produkRusak,
        },
      });

      alert("buat entry gudang berhasil dibuat");
      return router.push("/owner/warehouses/entry");
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
    <Layout title="Form Barang Masuk">
      <Container className="gap-8">
        <h4 className="text-lg font-semibold text-default-900">
          Form Barang Masuk
        </h4>

        <div className="grid gap-4">
          <Autocomplete
            label="Pilih ID PO"
            items={preorder}
            allowsCustomValue={true}
            onSelectionChange={(e) => {
              setPreorderItems([]);
              setIdPreorder(e as string);
            }}
            selectedKey={idPreorder}
            size="md"
          >
            {(item) => (
              <AutocompleteItem
                key={item.id_preorder}
                textValue={`${item.id_preorder} - ${item.nama_supplier}`}
              >
                {item.id_preorder} - {item.nama_supplier}
              </AutocompleteItem>
            )}
          </Autocomplete>

          <Table
            isHeaderSticky
            aria-label="form table"
            color="default"
            selectionMode="none"
            classNames={{
              wrapper: "rounded-none shadow-none p-1",
            }}
            className="scrollbar-hide"
          >
            <TableHeader>
              <TableColumn>#</TableColumn>
              <TableColumn>Kode Item</TableColumn>
              <TableColumn>Nama Produk</TableColumn>
              <TableColumn>Qty</TableColumn>
              <TableColumn>Satuan</TableColumn>
              <TableColumn className="w-[100px]">
                Jumlah Yang Akan Masuk
              </TableColumn>
              <TableColumn className="w-[100px]">
                Jumlah Yang Rusak (Jika Ada)
              </TableColumn>
              <TableColumn className="w-[100px]">Satuan Yang Rusak</TableColumn>
            </TableHeader>
            <TableBody items={temporaryItems}>
              {(item) => (
                <TableRow key={item.kode_item}>
                  <TableCell>
                    <Checkbox
                      isSelected={item.checklist}
                      onValueChange={(e) =>
                        setTemporaryItems((prev) => {
                          if (prev.length != 0) {
                            const index = prev.findIndex(
                              (produk) => produk.kode_item == item.kode_item,
                            );

                            if (index != -1) {
                              prev[index] = {
                                ...prev[index],
                                checklist: e,
                              };

                              return [...prev];
                            }
                          }
                          return [...prev];
                        })
                      }
                    />
                  </TableCell>
                  <TableCell>{item.kode_item}</TableCell>
                  <TableCell>{item.nama_produk}</TableCell>
                  <TableCell>{item.qty}</TableCell>
                  <TableCell>{item.satuan}</TableCell>
                  <TableCell>
                    <Input
                      value={!item.jumlah_entry ? "" : `${item.jumlah_entry}`}
                      type="number"
                      variant="flat"
                      size="sm"
                      min={0}
                      step=".01"
                      labelPlacement="outside"
                      onChange={(e) => {
                        const jumlah = e.target.value;

                        if (!jumlah) {
                          setTemporaryItems((prev) => {
                            if (prev.length != 0) {
                              const index = prev.findIndex(
                                (produk) => produk.kode_item == item.kode_item,
                              );

                              if (index != -1) {
                                prev[index] = {
                                  ...prev[index],
                                  jumlah_entry: 0,
                                };

                                return [...prev];
                              }
                            }
                            return [...prev];
                          });
                        } else {
                          if (parseFloat(jumlah) > item.qty) {
                            setTemporaryItems((prev) => {
                              if (prev.length != 0) {
                                const index = prev.findIndex(
                                  (produk) =>
                                    produk.kode_item == item.kode_item,
                                );

                                if (index != -1) {
                                  prev[index] = {
                                    ...prev[index],
                                    jumlah_entry: prev[index].qty,
                                  };

                                  return [...prev];
                                }
                              }
                              return [...prev];
                            });
                          } else {
                            setTemporaryItems((prev) => {
                              if (prev.length != 0) {
                                const index = prev.findIndex(
                                  (produk) =>
                                    produk.kode_item == item.kode_item,
                                );

                                if (index != -1) {
                                  prev[index] = {
                                    ...prev[index],
                                    jumlah_entry: parseFloat(jumlah),
                                  };

                                  return [...prev];
                                }
                              }
                              return [...prev];
                            });
                          }
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={!item.jumlah_rusak ? "" : `${item.jumlah_rusak}`}
                      type="number"
                      variant="flat"
                      size="sm"
                      min={0}
                      step=".01"
                      labelPlacement="outside"
                      onChange={(e) => {
                        const jumlah = e.target.value;

                        if (!jumlah) {
                          setTemporaryItems((prev) => {
                            if (prev.length != 0) {
                              const index = prev.findIndex(
                                (produk) => produk.kode_item == item.kode_item,
                              );

                              if (index != -1) {
                                prev[index] = {
                                  ...prev[index],
                                  jumlah_rusak: 0,
                                };

                                return [...prev];
                              }
                            }
                            return [...prev];
                          });
                        } else {
                          if (parseFloat(jumlah) > item.qty) {
                            setTemporaryItems((prev) => {
                              if (prev.length != 0) {
                                const index = prev.findIndex(
                                  (produk) =>
                                    produk.kode_item == item.kode_item,
                                );

                                if (index != -1) {
                                  prev[index] = {
                                    ...prev[index],
                                    jumlah_rusak: prev[index].qty,
                                  };

                                  return [...prev];
                                }
                              }
                              return [...prev];
                            });
                          } else {
                            setTemporaryItems((prev) => {
                              if (prev.length != 0) {
                                const index = prev.findIndex(
                                  (produk) =>
                                    produk.kode_item == item.kode_item,
                                );

                                if (index != -1) {
                                  prev[index] = {
                                    ...prev[index],
                                    jumlah_rusak: parseFloat(jumlah),
                                  };

                                  return [...prev];
                                }
                              }
                              return [...prev];
                            });
                          }
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      label="Satuan"
                      className="w-full"
                      size="sm"
                      onChange={(e) => {
                        if (!e.target.value) {
                          setTemporaryItems((prev) => {
                            if (prev.length != 0) {
                              const index = prev.findIndex(
                                (produk) =>
                                  produk.nama_produk == item.nama_produk,
                              );

                              if (index != -1) {
                                prev[index] = {
                                  ...prev[index],
                                  satuan_rusak: "",
                                };

                                return [...prev];
                              }
                            }
                            return [...prev];
                          });
                        } else {
                          setTemporaryItems((prev) => {
                            if (prev.length != 0) {
                              const index = prev.findIndex(
                                (produk) =>
                                  produk.nama_produk == item.nama_produk,
                              );

                              if (index != -1) {
                                prev[index] = {
                                  ...prev[index],
                                  satuan_rusak: e.target.value,
                                };

                                return [...prev];
                              }
                            }
                            return [...prev];
                          });
                        }
                      }}
                    >
                      {SATUANLIST.map((item) => {
                        return <SelectItem key={item}>{item}</SelectItem>;
                      })}
                    </Select>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <Button
            variant="solid"
            size="md"
            className="w-max justify-self-end bg-primary font-medium text-white"
            onClick={createEntry}
            isDisabled={
              !idPreorder ||
              !temporaryItems.filter((item) => item.checklist).length
            }
          >
            Simpan
          </Button>
        </div>
      </Container>
    </Layout>
  );
}

export const getServerSideProps = (async () => {
  const preorder: GlobalResponse<FinalType[]> = await fetcher({
    url: "/preorder",
    method: "GET",
  });

  return {
    props: {
      preorder: preorder.data,
    },
  };
}) satisfies GetServerSideProps<{ preorder: FinalType[] }>;
