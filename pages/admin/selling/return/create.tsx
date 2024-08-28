import ButtonBack from "@/components/button/ButtonBack";
import CustomTooltip from "@/components/tooltip";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";
import { GlobalResponse } from "@/types/global.type";
import { ListProduk, TransaksiType } from "@/types/transactions.type";
import { fetcher } from "@/utils/fetcher";
import { formatRupiah } from "@/utils/formatRupiah";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { Plus, Trash, WarningCircle } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type ListProdukTransaksi = {
  kode_item: string;
  jumlah: number;
  satuan: string;
  nama_produk: string;
  gudang: string;
  rak: string;
  harga: number;
  sub_total: number;
  diskon_langsung_item: number;
  diskon_persen_item: number;
  dikembalikan: number;
  penalti: number;
  total_pengembalian: number;
  diskon_per_item: number;
  harga_setelah_diskon: number;
};

export default function CreateReturn(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const router = useRouter();
  const [idTransaksi, setIdTransaksi] = useState("");
  const [transaksi, setTransaksi] = useState<TransaksiType>();
  const [returnItems, setReturnItems] = useState<ListProdukTransaksi[]>([]);
  const [metode, setMetode] = useState("transfer");
  const [input, setInput] = useState<any>({});
  const [penaltiKeseluruhan, setPenaltiKeseluruhan] = useState(0);
  const [loading, setLoading] = useState(false);

  async function createReturn() {
    setLoading(true);

    try {
      await fetcher({
        url: "/return",
        method: "POST",
        data: {
          transaksi_id: idTransaksi,
          metode,
          ...input,
          jumlah:
            returnItems.reduce((a, b) => a + b.total_pengembalian, 0) -
            penaltiKeseluruhan,
          penalti_keseluruhan: penaltiKeseluruhan,
          list_produk: returnItems,
        },
      });

      setLoading(false);
      alert("retur berhasil dibuat");
      setInput({});
      return router.back();
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

  function diskonPerItem(
    item: ListProduk,
    diskon_keseluruhan: number,
    total_item: number,
  ) {
    const totalDiskon = diskon_keseluruhan / total_item / item.jumlah;

    return Math.round((totalDiskon / 100) * 100);
  }

  function DISKONPERQTY(transaksi: TransaksiType, item: ListProduk) {
    const diskon = transaksi.diskon ? transaksi.diskon : 0;
    const persentase = (diskon / transaksi.total_pembayaran) * 100;

    const hitung = Math.round(
      (parseFloat(persentase.toFixed(2)) / 100) * item.harga,
    );

    // return Math.round(hitung / item.jumlah);
    return hitung;
  }

  function checkDiskonItem(item: ListProduk) {
    if (item.diskon_langsung_item) {
      return item.diskon_langsung_item;
    }

    if (item.diskon_persen_item) {
      return item.diskon_persen_item;
    }

    return 0;
  }

  useEffect(() => {
    if (!idTransaksi) {
      setTransaksi(undefined);
    } else {
      getTransaksiById();
    }

    async function getTransaksiById() {
      try {
        const result: GlobalResponse<TransaksiType> = await fetcher({
          url: "/transaksi?id=" + idTransaksi,
          method: "GET",
        });

        setTransaksi(result.data);
      } catch (error) {
        alert("terjadi kesalahan saat mendapatkan data transaksi");
        console.log(error);
      }
    }
  }, [idTransaksi]);

  return (
    <Layout title="Buat Retur">
      <Container className="gap-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <ButtonBack
            onClick={() => router.back()}
            className="justify-self-start text-teal-500"
          >
            Kembali
          </ButtonBack>
        </div>

        <Autocomplete
          label="Pilih ID Transaksi"
          items={props.transaksi}
          onSelectionChange={(e) => {
            setReturnItems([]);
            setIdTransaksi(e as string);
            setInput({});
          }}
          allowsCustomValue={true}
          selectedKey={idTransaksi}
          size="md"
        >
          {(transaksi) => (
            <AutocompleteItem
              key={transaksi.id_transaksi}
              textValue={`${transaksi.id_transaksi} - ${transaksi.penerima}`}
            >
              {transaksi.id_transaksi}
            </AutocompleteItem>
          )}
        </Autocomplete>

        <div className="grid w-max gap-2 border-l-4 border-teal-500 p-[1rem_0_1rem_1rem]">
          <h4 className="text-[18px] font-bold text-default-900">
            Informasi Transaksi
          </h4>

          <div className="grid gap-[2px]">
            <div className="grid grid-cols-[185px_10px_10fr]  gap-1 text-sm text-default-900">
              <div className="text-sm font-medium text-default-600">
                ID Transaksi
              </div>
              <div className="font-medium">:</div>
              <p className="font-bold text-teal-500">
                {transaksi?.id_transaksi ?? "-"}
              </p>
            </div>
            <div className="grid grid-cols-[185px_10px_10fr]  gap-1 text-sm text-default-900">
              <div className="text-sm font-medium text-default-600">
                Total Transaksi
              </div>
              <div className="font-medium">:</div>
              <p className="font-bold text-teal-500">
                {transaksi?.total_pembayaran
                  ? formatRupiah(transaksi?.total_pembayaran)
                  : "-"}
              </p>
            </div>
            <div className="grid grid-cols-[185px_10px_10fr]  gap-1 text-sm text-default-900">
              <div className="text-sm font-medium text-default-600">
                Diskon Keseluruhan
              </div>
              <div className="font-medium">:</div>
              <p className="font-bold text-teal-500">
                {transaksi?.diskon ? formatRupiah(transaksi.diskon) : "-"}
              </p>
            </div>
            <div className="grid grid-cols-[185px_10px_10fr]  gap-1 text-sm text-default-900">
              <div className="text-sm font-medium text-default-600">
                Total Item
              </div>
              <div className="font-medium">:</div>
              <p className="font-bold text-teal-500">
                {transaksi?.list_produk?.length ?? "-"}
              </p>
            </div>
          </div>
        </div>

        <Table
          isHeaderSticky
          color="default"
          selectionMode="none"
          classNames={{
            wrapper: "rounded-none shadow-none",
            th: ["bg-default-200 text-default-600"],
          }}
          className="scrollbar-hide"
        >
          <TableHeader className="text-center">
            <TableColumn className="w-max text-center">Qty</TableColumn>
            <TableColumn className="w-max text-center">Kode Item</TableColumn>
            <TableColumn className="w-max text-center">Nama Produk</TableColumn>
            <TableColumn className="w-max text-center">Harga</TableColumn>
            <TableColumn className="w-max text-center">Potongan</TableColumn>
            <TableColumn className="w-max text-center">Subtotal</TableColumn>
            <TableColumn className="w-max text-center">Aksi</TableColumn>
          </TableHeader>
          <TableBody
            items={transaksi?.list_produk ?? []}
            emptyContent={"produk kosong"}
          >
            {(item) => (
              <TableRow key={item.kode_item}>
                <TableCell className="text-center">
                  {item.jumlah} {item.satuan}
                </TableCell>
                <TableCell>{item.kode_item}</TableCell>
                <TableCell>{item.nama_produk}</TableCell>
                <TableCell className="text-center">
                  {formatRupiah(item.harga)}
                </TableCell>
                <TableCell className="text-center">
                  {formatRupiah(checkDiskonItem(item))}
                </TableCell>
                <TableCell className="text-center">
                  {formatRupiah(item.sub_total)}
                </TableCell>
                <TableCell className="text-center">
                  <CustomTooltip content="Tambah Ke Daftar Retur">
                    <Button
                      isIconOnly
                      variant="light"
                      size="sm"
                      onClick={() => {
                        setReturnItems((prev) => {
                          if (
                            prev.find(
                              (produk) => produk.kode_item == item.kode_item,
                            )
                          ) {
                            return [...prev];
                          }

                          return [
                            ...prev,
                            {
                              ...item,
                              penalti: 0,
                              total_pengembalian: 0,
                              dikembalikan: 0,
                              diskon_per_item: DISKONPERQTY(
                                transaksi as TransaksiType,
                                item,
                              ),
                              harga_setelah_diskon:
                                item.harga -
                                DISKONPERQTY(transaksi as TransaksiType, item) -
                                checkDiskonItem(item),
                            },
                          ];
                        });
                      }}
                    >
                      <Plus
                        weight="bold"
                        size={20}
                        className="text-default-600"
                      />
                    </Button>
                  </CustomTooltip>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="grid w-max gap-2 border-l-4 border-teal-500 p-[1rem_0_1rem_1rem]">
          <h4 className="text-[18px] font-bold text-default-900">Item Retur</h4>

          <div className="grid gap-[2px]">
            <div className="grid grid-cols-[225px_10px_10fr]  gap-1 text-sm text-default-900">
              <div className="flex text-sm font-medium text-default-600">
                Persentase Diskon Per Item{" "}
                {
                  <CustomTooltip
                    content={
                      <>
                        Persentase Diskon Per Item merupakan perhitungan dari{" "}
                        <br /> <br /> (DISKON KESELURUHAN / TOTAL TRANSAKSI) *
                        100
                      </>
                    }
                  >
                    <WarningCircle
                      weight="bold"
                      size={16}
                      className="ml-1 cursor-pointer text-default-600"
                    />
                  </CustomTooltip>
                }
              </div>
              <div className="font-medium">:</div>
              <p className="font-bold text-teal-500">
                {transaksi
                  ? parseFloat(
                      (
                        ((transaksi.diskon ? transaksi.diskon : 0) /
                          transaksi.total_pembayaran) *
                        100
                      ).toFixed(2),
                    )
                  : 0}
                %
              </p>
            </div>
          </div>
        </div>

        <Table
          isHeaderSticky
          color="default"
          selectionMode="none"
          classNames={{
            wrapper: "rounded-none shadow-none",
            th: ["bg-default-200 text-default-600"],
          }}
          className="scrollbar-hide"
        >
          <TableHeader className="text-center">
            <TableColumn className="text-center">Qty</TableColumn>
            <TableColumn className="text-center">Nama Produk</TableColumn>

            <TableColumn className="w-max text-center">Harga</TableColumn>
            <TableColumn className="w-max text-center">
              <span className="inline-flex items-center">
                Diskon Per Qty{" "}
                {
                  <CustomTooltip
                    content={
                      <>
                        Diskon Per Qty merupakan perhitungan dari <br /> <br />{" "}
                        (PERSENTASE DISKON PER ITEM * HARGA)
                      </>
                    }
                  >
                    <WarningCircle
                      weight="bold"
                      size={16}
                      className="ml-1 cursor-pointer text-default-600"
                    />
                  </CustomTooltip>
                }
              </span>
            </TableColumn>
            <TableColumn className="text-center">Pot Per Item</TableColumn>
            <TableColumn className="w-max text-center">
              <span className="inline-flex items-center">
                Harga Setelah Diskon{" "}
                {
                  <CustomTooltip
                    content={
                      <>
                        Harga setelah diskon merupakan perhitungan dari <br />{" "}
                        <br /> (HARGA - DISKON PER QTY - POT PER ITEM)
                      </>
                    }
                  >
                    <WarningCircle
                      weight="bold"
                      size={16}
                      className="ml-1 cursor-pointer text-default-600"
                    />
                  </CustomTooltip>
                }
              </span>
            </TableColumn>
            <TableColumn className="text-center">Dikembalikan</TableColumn>
            <TableColumn className="text-center">Penalti</TableColumn>
            <TableColumn className="w-max text-center">
              <span className="inline-flex items-center">
                Subtotal{" "}
                {
                  <CustomTooltip
                    content={
                      <>
                        Subtotal merupakan perhitungan dari <br /> <br /> (HARGA
                        SETELAH DISKON * JUMLAH DIKEMBALIKAN) - PENALTI
                      </>
                    }
                  >
                    <WarningCircle
                      weight="bold"
                      size={16}
                      className="ml-1 cursor-pointer text-default-600"
                    />
                  </CustomTooltip>
                }
              </span>
            </TableColumn>
            <TableColumn className="w-max text-center">Aksi</TableColumn>
          </TableHeader>
          <TableBody items={returnItems} emptyContent={"produk kosong"}>
            {(item) => (
              <TableRow key={item.kode_item}>
                <TableCell>{item.jumlah}</TableCell>
                <TableCell>{item.nama_produk}</TableCell>

                <TableCell className="text-center">
                  {formatRupiah(item.harga)}
                </TableCell>

                <TableCell className="text-center">
                  {formatRupiah(item.diskon_per_item)}
                </TableCell>
                <TableCell className="text-center">
                  {formatRupiah(checkDiskonItem(item))}
                </TableCell>
                <TableCell className="text-center">
                  {formatRupiah(item.harga_setelah_diskon)}
                </TableCell>
                <TableCell className="text-center">
                  <Input
                    value={!item.dikembalikan ? "" : `${item.dikembalikan}`}
                    type="number"
                    variant="flat"
                    size="sm"
                    min={0}
                    step=".01"
                    onChange={(e) => {
                      const dikembalikan = e.target.value;

                      if (!dikembalikan) {
                        setReturnItems((prev) => {
                          if (prev.length != 0) {
                            const index = prev.findIndex(
                              (produk) => produk.kode_item == item.kode_item,
                            );

                            if (index != -1) {
                              prev[index] = {
                                ...prev[index],
                                dikembalikan: 0,
                                total_pengembalian: 0,
                              };

                              return [...prev];
                            }
                          }
                          return [...prev];
                        });
                      } else {
                        if (parseFloat(dikembalikan) > item.jumlah) {
                          setReturnItems((prev) => {
                            if (prev.length != 0) {
                              const index = prev.findIndex(
                                (produk) => produk.kode_item == item.kode_item,
                              );

                              if (index != -1) {
                                prev[index] = {
                                  ...prev[index],
                                  dikembalikan: item.jumlah,
                                  total_pengembalian:
                                    item.jumlah * item.harga_setelah_diskon,
                                };

                                return [...prev];
                              }
                            }
                            return [...prev];
                          });
                        } else {
                          setReturnItems((prev) => {
                            if (prev.length != 0) {
                              const index = prev.findIndex(
                                (produk) => produk.kode_item == item.kode_item,
                              );

                              if (index != -1) {
                                prev[index] = {
                                  ...prev[index],
                                  dikembalikan: parseFloat(dikembalikan),
                                  total_pengembalian:
                                    parseFloat(dikembalikan) *
                                    item.harga_setelah_diskon,
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
                <TableCell className="text-center">
                  <Input
                    value={!item.penalti ? "" : `${item.penalti}`}
                    type="number"
                    variant="flat"
                    size="sm"
                    min={0}
                    onChange={(e) => {
                      setPenaltiKeseluruhan(0);

                      const penalti = e.target.value;

                      if (!penalti) {
                        setReturnItems((prev) => {
                          if (prev.length != 0) {
                            const index = prev.findIndex(
                              (produk) => produk.kode_item == item.kode_item,
                            );

                            if (index != -1) {
                              prev[index] = {
                                ...prev[index],
                                penalti: 0,
                                total_pengembalian:
                                  item.dikembalikan * item.harga_setelah_diskon,
                              };

                              return [...prev];
                            }
                          }
                          return [...prev];
                        });
                      } else {
                        setReturnItems((prev) => {
                          if (prev.length != 0) {
                            const index = prev.findIndex(
                              (produk) => produk.kode_item == item.kode_item,
                            );

                            if (index != -1) {
                              prev[index] = {
                                ...prev[index],
                                penalti: parseInt(penalti),
                                total_pengembalian:
                                  item.dikembalikan *
                                    item.harga_setelah_diskon -
                                  parseInt(penalti),
                              };

                              return [...prev];
                            }
                          }
                          return [...prev];
                        });
                      }
                    }}
                  />
                </TableCell>

                <TableCell className="text-center">
                  {formatRupiah(item.total_pengembalian)}
                </TableCell>
                <TableCell className="text-center">
                  <CustomTooltip content="Hapus">
                    <Button
                      isIconOnly
                      variant="light"
                      size="sm"
                      onClick={() => {
                        setReturnItems((prev) =>
                          prev.filter(
                            (produk) => produk.kode_item != item.kode_item,
                          ),
                        );
                      }}
                    >
                      <Trash
                        weight="bold"
                        size={20}
                        className="text-default-600"
                      />
                    </Button>
                  </CustomTooltip>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="grid justify-self-end border border-black p-2">
          <div className="grid grid-cols-[150px_6px_1fr] gap-1 text-[12px] text-black">
            <div className="font-medium">Subtotal</div>
            <div className="font-medium">:</div>
            <p className="font-medium">
              {formatRupiah(
                returnItems.reduce((a, b) => a + b.total_pengembalian, 0),
              )}
            </p>
          </div>
          <div className="grid grid-cols-[150px_6px_1fr] gap-1 text-[12px] text-black">
            <div className="font-medium">Penalti Keseluruhan</div>
            <div className="font-medium">:</div>
            <p className="font-medium">{formatRupiah(penaltiKeseluruhan)}</p>
          </div>
          <div className="grid grid-cols-[150px_6px_1fr] gap-1 text-[12px] text-black">
            <div className="font-medium">Total Pengembalian</div>
            <div className="font-medium">:</div>
            <p className="font-medium">
              {formatRupiah(
                returnItems.reduce((a, b) => a + b.total_pengembalian, 0) -
                  penaltiKeseluruhan,
              )}
            </p>
          </div>
        </div>

        <Input
          value={!penaltiKeseluruhan ? "" : `${penaltiKeseluruhan}`}
          isRequired
          variant="flat"
          color="default"
          label={
            <span className="inline-flex items-center">
              Penalti Keseluruhan{" "}
              {
                <CustomTooltip content="Jika anda mengisi input ini, maka penalti per item akan dikosongkan. Silahkan memilih salah satu.">
                  <WarningCircle
                    weight="bold"
                    size={16}
                    className="ml-1 cursor-pointer text-default-600"
                  />
                </CustomTooltip>
              }
            </span>
          }
          labelPlacement="outside"
          name="penalti_keseluruhan"
          placeholder="Ex: Rp200.000"
          type="number"
          onChange={(e) => {
            if (!e.target.value) {
              setPenaltiKeseluruhan(0);
            } else {
              setReturnItems((prev) =>
                prev.map((item) => {
                  return {
                    ...item,
                    penalti: 0,
                    total_pengembalian:
                      item.dikembalikan *
                      (item.harga -
                        DISKONPERQTY(transaksi as TransaksiType, item) -
                        checkDiskonItem(item)),
                  };
                }),
              );
              setPenaltiKeseluruhan(parseInt(e.target.value));
            }
          }}
        />

        <RadioGroup
          defaultValue={metode}
          label="Pilih Metode Pengembalian"
          orientation="horizontal"
          isRequired
          onValueChange={(e) => {
            setInput({});
            setMetode(e);
          }}
        >
          <Radio value="cash">Cash</Radio>
          <Radio value="transfer">Transfer</Radio>
        </RadioGroup>

        {metode == "transfer" ? (
          <div className="grid gap-4">
            <div className="grid grid-cols-4 gap-3">
              <Input
                variant="flat"
                color="default"
                label="ID Transaksi Bank"
                labelPlacement="outside"
                name="id_transaksi_bank"
                placeholder="Ex: 20241006123123"
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
                label="Nama Bank"
                labelPlacement="outside"
                name="nama_bank"
                placeholder="Ex: BCA"
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
                label="Atas Nama"
                labelPlacement="outside"
                name="atas_nama"
                placeholder="Ex: William"
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
                label="Nomor Rekening"
                labelPlacement="outside"
                name="no_rekening"
                placeholder="Ex: 123123"
                onChange={(e) => {
                  setInput({
                    ...input,
                    [e.target.name]: e.target.value,
                  });
                }}
              />
            </div>
          </div>
        ) : null}

        <Button
          variant="solid"
          size="md"
          className="w-max justify-self-end bg-teal-500 font-medium text-white"
          onClick={createReturn}
          isDisabled={!returnItems.length}
        >
          Buat Retur
        </Button>
      </Container>
    </Layout>
  );
}

export const getServerSideProps = (async () => {
  const transaksi: GlobalResponse<TransaksiType[]> = await fetcher({
    url: "/transaksi?role=all",
    method: "GET",
  });

  return {
    props: {
      transaksi: transaksi.data,
    },
  };
}) satisfies GetServerSideProps<{ transaksi: TransaksiType[] }>;
