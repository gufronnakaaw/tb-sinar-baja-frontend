import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Textarea,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { ArrowLeft, CaretUp, Minus, Plus, Trash } from "@phosphor-icons/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useDebounce } from "use-debounce";

// components
import InputSearchBar from "@/components/input/InputSearchBar";
import CustomTooltip from "@/components/tooltip";

// utils
import LoadingScreen from "@/components/LoadingScreen";
import CardSellingAdmin from "@/components/card/CardSellingAdmin";
import { TemplateNota } from "@/components/template/TemplateNota";
import { GlobalResponse } from "@/types/global.type";
import { MemberType } from "@/types/members";
import { HargaQuantity, ProdukSearchType } from "@/types/products.type";
import { TransaksiType } from "@/types/transactions.type";
import { estimation } from "@/utils/estimation";
import { fetcher } from "@/utils/fetcher";
import { formatRupiah } from "@/utils/formatRupiah";
import useSWR from "swr";

export type ListProdukAdmin = {
  kode_item: string;
  nama_produk: string;
  stok: number;
  qty: number;
  satuan_kecil: string;
  harga: number;
  gudang: string;
  rak: string;
  diskon_langsung_item: number;
  diskon_persen_item: number;
  total_harga: number;
  subtotal: number;
  hargaquantity: HargaQuantity[];
  harga_selected: number;
};

const unique_key = (Math.random() + 1).toString(36).substring(7);

export default function SellingPageAdmin() {
  const swr = useSWR<GlobalResponse<MemberType[]>>({
    url: "/member",
    method: "GET",
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

  const [noTelp, setNoTelp] = useState<string>("");
  const [penerima, setPenerima] = useState<string>("");
  const [keterangan, setKeterangan] = useState<string>("");
  const [alamat, setAlamat] = useState<string>("");
  const [pengiriman, setPengiriman] = useState<string>("");
  const [tipe, setTipe] = useState<string>("nota");

  const [ongkir, setOngkir] = useState<number>(0);
  const [pajak, setPajak] = useState<number>(0);
  const [persenPajak, setPersenPajak] = useState<number>(0);
  const [diskon, setDiskon] = useState<number>(0);
  const [persenDiskon, setPersenDiskon] = useState<number>(0);
  const [totalDiskon, setTotalDiskon] = useState<number>(0);
  const [tunai, setTunai] = useState<number>(0);
  const [kembali, setKembali] = useState<number>(0);
  const [produk, setProduk] = useState<ProdukSearchType[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [dataPrint, setDataPrint] = useState<TransaksiType | null>(null);
  const sellingRef = useRef(null);
  const reactPrint = useReactToPrint({
    content: () => sellingRef.current,
  });

  const [search, setSearch] = useState<string>("");
  const [searchValue] = useDebounce(search, 800);
  const [listProdukAdmin, setListProdukAdmin] = useState<ListProdukAdmin[]>([]);
  const [totalPembayaran, setTotalPembayaran] = useState<number>(0);
  const [totalBelanja, setTotalBelanja] = useState<number>(0);
  const [idMember, setIdMember] = useState("");
  const [member, setMember] = useState<MemberType>();
  const [metode, setMetode] = useState("cash");
  const [idTransaksi, setIdTransaksi] = useState("");
  const [dp, setDp] = useState(0);
  const [estimasi, setEstimasi] = useState(0);

  function getStatus(metode: string) {
    if (metode == "cash" || metode == "transfer") {
      return "lunas";
    }

    if (metode == "tempo") {
      return "piutang";
    }
  }

  async function createTransaksi() {
    if (listProdukAdmin.length > 8) {
      return alert("maksimal 8 item");
    }

    try {
      const response = await fetcher({
        url: "/transaksi",
        method: "POST",
        data: {
          keterangan: keterangan ? keterangan : "-",
          penerima: penerima ? penerima : "Umum",
          no_telp: noTelp ? noTelp : "-",
          alamat: alamat ? alamat : "-",
          pengiriman: pengiriman ? pengiriman : "-",
          ongkir: ongkir ? ongkir : null,
          total_belanja: totalBelanja,
          total_pembayaran: totalPembayaran,
          pajak: pajak ? pajak : null,
          persen_pajak: persenPajak ? persenPajak : null,
          diskon: totalDiskon ? totalDiskon : null,
          persen_diskon: persenDiskon ? persenDiskon : null,
          tipe: "member",
          unique_key,
          tunai,
          kembalian: kembali,
          metode,
          asal_transaksi: "admin",
          status: getStatus(metode),
          id_transaksi_bank: idTransaksi,
          dp,
          pembayaran: dp,
          estimasi: estimation(estimasi),
          list_produk: listProdukAdmin.map((produk) => {
            return {
              kode_item: produk.kode_item,
              jumlah: produk.qty,
              satuan: produk.satuan_kecil,
              nama_produk: produk.nama_produk,
              gudang: produk.gudang,
              rak: produk.rak,
              harga: produk.harga_selected,
              sub_total: produk.subtotal,
              diskon_langsung_item: produk.diskon_langsung_item,
              diskon_persen_item: produk.diskon_persen_item,
            };
          }),
        },
      });

      setTitle(response.data.id_transaksi);
      setDataPrint(response.data as TransaksiType);
      setTimeout(() => {
        reactPrint();
      }, 100);
    } catch (error) {
      const { status_code } = error as {
        success: boolean;
        status_code: number;
      };

      if (status_code >= 400) {
        alert("terjadi kesalahan saat menginput data");
      }

      if (status_code >= 500) {
        alert("tidak dapat melakukan transaksi");
      }
    }
  }

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    setTotalBelanja(listProdukAdmin.reduce((a, b) => a + b.subtotal, 0));

    if (listProdukAdmin.length == 0) {
      setNoTelp("");
      setPenerima("");
      setKeterangan("");
      setAlamat("");
      setPengiriman("");
      setTipe("nota");
      setOngkir(0);
      setPajak(0);
      setPersenPajak(0);
      setDiskon(0);
      setPersenDiskon(0);
      setTotalDiskon(0);
      setTunai(0);
      setKembali(0);
      setTipe("nota");
    }
  }, [listProdukAdmin]);

  useEffect(() => {
    if (searchValue != "") {
      getProduk(searchValue);
    } else {
      setProduk([]);
    }

    async function getProduk(search: string) {
      try {
        setLoading(true);
        const data = await fetcher({
          url: "/produk?search=" + encodeURI(search),
          method: "GET",
        });

        setProduk(data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        alert("ups sepertinya tidak bisa mencari produk");
      }
    }
  }, [searchValue]);

  useEffect(() => {
    setTotalPembayaran(ongkir + totalBelanja);

    if (tipe == "nota") {
      if (diskon) {
        setTotalDiskon(diskon);
        setTotalPembayaran(ongkir + totalBelanja - diskon);
      }

      if (persenDiskon) {
        const persen = ((ongkir + totalBelanja) / 100) * persenDiskon;
        setTotalDiskon(persen);
        setTotalPembayaran(ongkir + totalBelanja - persen);
      }
    }

    if (tipe == "faktur") {
      const persenPajakLocal = ((ongkir + totalBelanja) / 100) * persenPajak;
      setPajak(persenPajakLocal);
      setTotalPembayaran(ongkir + totalBelanja + persenPajakLocal);

      if (diskon) {
        setTotalDiskon(diskon);
        setTotalPembayaran(ongkir + totalBelanja + persenPajakLocal - diskon);
      }

      if (persenDiskon) {
        const persenDiskonLocal =
          ((ongkir + totalBelanja + persenPajakLocal) / 100) * persenDiskon;
        setTotalDiskon(persenDiskonLocal);
        setTotalPembayaran(
          ongkir + totalBelanja + persenPajakLocal - persenDiskonLocal,
        );
      }
    }
  }, [tipe, diskon, ongkir, totalBelanja, persenDiskon, persenPajak]);

  useEffect(() => {
    if (tunai == 0) {
      setKembali(0);
    }

    if (tunai - totalPembayaran > 0) {
      setKembali(tunai - totalPembayaran);
    } else {
      setKembali(0);
    }
  }, [tunai, totalPembayaran]);

  async function getMemberById() {
    try {
      const member: GlobalResponse<MemberType> = await fetcher({
        url: "/member?id_member=" + idMember,
        method: "GET",
      });

      setMember(member.data);
      setNoTelp(!member.data.no_telp ? "" : member.data.no_telp);
      setPenerima(!member.data.nama ? "" : member.data.nama);
      setAlamat(!member.data.alamat ? "" : member.data.alamat);
    } catch (error) {
      console.log(error);
      alert("ups sepertinya tidak bisa mendapatkan data member");
    }
  }

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  if (swr.isLoading) {
    return <LoadingScreen role="admin" />;
  }

  if (swr.error) {
    console.log(swr.error);
    return alert("terjadi kesalahan saat mendapatkan data member");
  }

  return (
    <>
      <div className="hidden">
        {dataPrint ? <TemplateNota {...dataPrint} ref={sellingRef} /> : null}
      </div>

      <Head>
        <title>Halaman Penjualan</title>
      </Head>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        hideCloseButton={member?.id_member ? false : true}
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader />
              <ModalBody>
                <div>
                  <Autocomplete
                    allowsCustomValue={true}
                    label="Pilih Member"
                    defaultItems={swr.data?.data}
                    size="sm"
                    onSelectionChange={(e) => {
                      setListProdukAdmin([]);
                      setSearch("");
                      setProduk([]);
                      if (!e) {
                        setIdMember("");
                      } else {
                        setIdMember(e as string);
                      }
                    }}
                  >
                    {(item) => (
                      <AutocompleteItem key={item.id_member}>
                        {item.nama}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="bg-teal-500 text-white"
                  onPress={() => {
                    if (!idMember) {
                      return alert("silahkan pilih member");
                    }
                    onClose();
                    getMemberById();
                  }}
                >
                  Simpan
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <section className="mx-auto h-dvh max-w-[1440px] overflow-hidden">
        <div className="flex h-[64px] items-center justify-between gap-4 border-b border-gray-300 p-4">
          <Button
            variant="light"
            size="sm"
            startContent={<ArrowLeft weight="bold" size={14} />}
            onClick={() => router.back()}
            className="font-medium text-teal-500"
          >
            Kembali
          </Button>

          <div
            className="flex items-center gap-4 hover:cursor-pointer"
            onClick={onOpen}
          >
            <div className="grid text-center">
              <h6 className="mb-1 text-sm font-bold text-default-900">
                {!member?.nama ? "-" : member?.nama}
              </h6>
              <p className="text-[11px] font-medium capitalize text-default-500">
                {!member?.level ? "-" : member?.level}
              </p>
            </div>
          </div>
        </div>

        <div className="grid h-[calc(100vh-64px)] grid-cols-[370px_auto_1fr] overflow-hidden">
          {/* ==== left content ==== */}
          <div className="flex flex-col gap-6 overflow-scroll p-4 scrollbar-hide">
            <div className="sticky left-0 top-0 grid gap-4">
              <InputSearchBar
                value={search}
                placeholder="Ketik kode produk/nama produk..."
                onChange={(e) => setSearch(e.target.value)}
              />

              {loading ? (
                <p className="text-sm font-bold text-teal-500">loading...</p>
              ) : produk.length != 0 ? (
                <p className="text-sm font-medium text-default-600">
                  <span className="font-bold text-teal-500">
                    {produk.length}
                  </span>{" "}
                  produk ditemukan
                </p>
              ) : null}
            </div>

            {produk.length == 0 ? (
              <p className="pt-24 text-center text-sm font-medium italic text-default-400">
                Produk yang anda cari akan muncul disini!
              </p>
            ) : null}

            <div className="grid gap-4 overflow-y-scroll scrollbar-hide">
              {produk.map((item) => {
                return (
                  <CardSellingAdmin
                    key={item.kode_item}
                    item={item}
                    field={member?.field}
                    level={member?.level}
                    setListProdukAdmin={setListProdukAdmin}
                  />
                );
              })}
            </div>
          </div>

          <div className="h-full w-[1px] bg-gray-300" />

          {/* ==== right content ==== */}
          <div className="relative grid grid-rows-[auto_1fr_auto] overflow-hidden bg-white scrollbar-hide">
            <Table
              aria-label="Example static collection table"
              classNames={{
                wrapper: "rounded-none shadow-none",
              }}
            >
              <TableHeader className="text-center">
                <TableColumn className="w-[150px] text-center">
                  Item ({listProdukAdmin.length})
                </TableColumn>
                <TableColumn className="w-[170px] text-center">Qty</TableColumn>
                <TableColumn className="w-[165px] text-center">
                  Pilih
                </TableColumn>
                <TableColumn className="text-center">Harga</TableColumn>
                <TableColumn className="text-center">Pot. Langsung</TableColumn>
                <TableColumn className="text-center">Pot. Persen</TableColumn>
                <TableColumn className="text-center">Subtotal</TableColumn>
                <TableColumn className="text-center">Aksi</TableColumn>
              </TableHeader>
              <TableBody>
                {listProdukAdmin.map((item) => {
                  return (
                    <TableRow key={item.kode_item}>
                      <TableCell>{item.nama_produk}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            isIconOnly
                            variant="flat"
                            size="sm"
                            className="bg-teal-200 text-teal-600"
                            onClick={() => {
                              setListProdukAdmin((prev) => {
                                if (prev.length != 0) {
                                  const index = prev.findIndex(
                                    (produk) =>
                                      produk.kode_item == item.kode_item,
                                  );

                                  if (index != -1) {
                                    prev[index] = {
                                      ...prev[index],
                                      qty:
                                        prev[index].qty - 1 < 1
                                          ? 0
                                          : prev[index].qty - 1,
                                      subtotal:
                                        prev[index].qty - 1 < 1
                                          ? 0
                                          : (prev[index].qty - 1) *
                                            prev[index].total_harga,
                                    };

                                    return [...prev];
                                  }
                                }
                                return [...prev];
                              });
                            }}
                          >
                            <Minus weight="bold" size={16} />
                          </Button>
                          <Input
                            value={!item.qty ? "" : `${item.qty}`}
                            type="number"
                            variant="flat"
                            size="sm"
                            min={0}
                            step=".01"
                            labelPlacement="outside"
                            onChange={(e) => {
                              const qty = e.target.value;

                              if (!qty) {
                                setListProdukAdmin((prev) => {
                                  if (prev.length != 0) {
                                    const index = prev.findIndex(
                                      (produk) =>
                                        produk.kode_item == item.kode_item,
                                    );

                                    if (index != -1) {
                                      prev[index] = {
                                        ...prev[index],
                                        qty: 0,
                                        subtotal: 0,
                                      };

                                      return [...prev];
                                    }
                                  }
                                  return [...prev];
                                });
                              } else {
                                if (parseFloat(qty) > item.stok) {
                                  setListProdukAdmin((prev) => {
                                    if (prev.length != 0) {
                                      const index = prev.findIndex(
                                        (produk) =>
                                          produk.kode_item == item.kode_item,
                                      );

                                      if (index != -1) {
                                        prev[index] = {
                                          ...prev[index],
                                          qty: item.stok,
                                          subtotal:
                                            item.stok * prev[index].total_harga,
                                        };

                                        return [...prev];
                                      }
                                    }
                                    return [...prev];
                                  });
                                } else {
                                  setListProdukAdmin((prev) => {
                                    if (prev.length != 0) {
                                      const index = prev.findIndex(
                                        (produk) =>
                                          produk.kode_item == item.kode_item,
                                      );

                                      if (index != -1) {
                                        prev[index] = {
                                          ...prev[index],
                                          qty: parseFloat(qty),
                                          subtotal:
                                            parseFloat(qty) *
                                            prev[index].total_harga,
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
                          <Button
                            isIconOnly
                            variant="flat"
                            size="sm"
                            className="bg-teal-200 text-teal-600"
                            onClick={() => {
                              setListProdukAdmin((prev) => {
                                if (prev.length != 0) {
                                  const index = prev.findIndex(
                                    (produk) =>
                                      produk.kode_item == item.kode_item,
                                  );

                                  if (index != -1) {
                                    prev[index] = {
                                      ...prev[index],
                                      qty:
                                        prev[index].qty + 1 >= prev[index].stok
                                          ? prev[index].stok
                                          : prev[index].qty + 1,
                                      subtotal:
                                        prev[index].qty + 1 >= prev[index].stok
                                          ? prev[index].stok *
                                            prev[index].total_harga
                                          : (prev[index].qty + 1) *
                                            prev[index].total_harga,
                                    };

                                    return [...prev];
                                  }
                                }
                                return [...prev];
                              });
                            }}
                          >
                            <Plus weight="bold" size={16} />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Select
                          label="Harga"
                          size="sm"
                          onChange={(e) => {
                            const value = e.target.value;
                            if (!value) {
                              setListProdukAdmin((prev) => {
                                if (prev.length != 0) {
                                  const index = prev.findIndex(
                                    (produk) =>
                                      produk.kode_item == item.kode_item,
                                  );

                                  if (index != -1) {
                                    prev[index] = {
                                      ...prev[index],
                                      total_harga: item.harga,
                                      harga_selected: item.harga,
                                      subtotal: prev[index].qty * item.harga,
                                      diskon_langsung_item: 0,
                                      diskon_persen_item: 0,
                                    };

                                    return [...prev];
                                  }
                                }
                                return [...prev];
                              });
                            } else {
                              setListProdukAdmin((prev) => {
                                if (prev.length != 0) {
                                  const index = prev.findIndex(
                                    (produk) =>
                                      produk.kode_item == item.kode_item,
                                  );

                                  if (index != -1) {
                                    prev[index] = {
                                      ...prev[index],
                                      total_harga: parseInt(value),
                                      harga_selected: parseInt(value),
                                      subtotal:
                                        prev[index].qty * parseInt(value),
                                      diskon_langsung_item: 0,
                                      diskon_persen_item: 0,
                                    };

                                    return [...prev];
                                  }
                                }
                                return [...prev];
                              });
                            }
                          }}
                          items={[
                            {
                              harga: item.harga,
                              keterangan: `Harga Default Member (${member?.level})`,
                            },
                            ...item.hargaquantity,
                          ]}
                          defaultSelectedKeys={[item.harga.toString()]}
                        >
                          {(data) => (
                            <SelectItem
                              key={data.harga}
                              textValue={formatRupiah(data.harga)}
                            >
                              <Tooltip content={data.keterangan}>
                                {formatRupiah(data.harga)}
                              </Tooltip>
                            </SelectItem>
                          )}
                        </Select>
                      </TableCell>
                      <TableCell className="text-center">
                        <p
                          className={`${item.diskon_langsung_item || item.diskon_persen_item ? "text-danger line-through" : null}`}
                        >
                          {formatRupiah(item.harga_selected)}
                        </p>
                        {item.diskon_langsung_item ||
                        item.diskon_persen_item ? (
                          <p>{formatRupiah(item.total_harga)}</p>
                        ) : null}
                      </TableCell>
                      <TableCell className="w-[40px] text-center">
                        <Input
                          value={
                            !item.diskon_langsung_item
                              ? ""
                              : `${item.diskon_langsung_item}`
                          }
                          type="number"
                          variant="flat"
                          size="sm"
                          min={0}
                          onChange={(e) => {
                            const diskon = e.target.value;
                            if (!diskon) {
                              setListProdukAdmin((prev) => {
                                if (prev.length != 0) {
                                  const index = prev.findIndex(
                                    (produk) =>
                                      produk.kode_item == item.kode_item,
                                  );

                                  if (index != -1) {
                                    prev[index] = {
                                      ...prev[index],
                                      diskon_langsung_item: 0,
                                      total_harga: prev[index].harga_selected,
                                      subtotal:
                                        prev[index].qty *
                                        prev[index].harga_selected,
                                    };

                                    return [...prev];
                                  }
                                }
                                return [...prev];
                              });
                            } else {
                              setListProdukAdmin((prev) => {
                                if (prev.length != 0) {
                                  const index = prev.findIndex(
                                    (produk) =>
                                      produk.kode_item == item.kode_item,
                                  );

                                  if (index != -1) {
                                    prev[index] = {
                                      ...prev[index],
                                      diskon_langsung_item: parseInt(diskon),
                                      diskon_persen_item: 0,
                                      total_harga: Math.round(
                                        prev[index].harga_selected -
                                          parseInt(diskon),
                                      ),
                                      subtotal:
                                        prev[index].qty *
                                        Math.round(
                                          prev[index].harga_selected -
                                            parseInt(diskon),
                                        ),
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
                      <TableCell className="w-[40px] text-center">
                        <Input
                          value={
                            !item.diskon_persen_item
                              ? ""
                              : `${item.diskon_persen_item}`
                          }
                          type="number"
                          variant="flat"
                          size="sm"
                          min={0}
                          step=".01"
                          onChange={(e) => {
                            const diskon = e.target.value;

                            if (!diskon) {
                              setListProdukAdmin((prev) => {
                                if (prev.length != 0) {
                                  const index = prev.findIndex(
                                    (produk) =>
                                      produk.kode_item == item.kode_item,
                                  );

                                  if (index != -1) {
                                    prev[index] = {
                                      ...prev[index],
                                      diskon_persen_item: 0,
                                      total_harga: prev[index].harga_selected,
                                      subtotal:
                                        prev[index].qty *
                                        prev[index].harga_selected,
                                    };

                                    return [...prev];
                                  }
                                }
                                return [...prev];
                              });
                            } else {
                              const persen = parseFloat(diskon);

                              setListProdukAdmin((prev) => {
                                if (prev.length != 0) {
                                  const index = prev.findIndex(
                                    (produk) =>
                                      produk.kode_item == item.kode_item,
                                  );

                                  if (index != -1) {
                                    const total = Math.round(
                                      (prev[index].harga_selected / 100) *
                                        persen,
                                    );

                                    prev[index] = {
                                      ...prev[index],
                                      diskon_langsung_item: 0,
                                      diskon_persen_item: persen,
                                      total_harga:
                                        prev[index].harga_selected - total,
                                      subtotal:
                                        prev[index].qty *
                                        (prev[index].harga_selected - total),
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
                        {formatRupiah(item.subtotal)}
                      </TableCell>
                      <TableCell className="text-center">
                        <CustomTooltip content="Hapus">
                          <Button
                            isIconOnly
                            variant="flat"
                            size="sm"
                            className="bg-teal-200 text-teal-600"
                            onClick={() => {
                              setListProdukAdmin((prev) =>
                                prev.filter(
                                  (produk) =>
                                    produk.kode_item != item.kode_item,
                                ),
                              );
                            }}
                          >
                            <Trash weight="bold" size={20} />
                          </Button>
                        </CustomTooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <div className="grid"></div>

            <div className="sticky bottom-0 z-20 grid grid-cols-2 items-center gap-16 border-t border-gray-300 bg-white p-[1rem]">
              <div className="flex items-center justify-between gap-2">
                <p className="font-bold text-gray-600">Total Pembayaran :</p>
                <h5 className="text-[24px] font-semibold text-teal-500">
                  {formatRupiah(totalPembayaran)}
                </h5>
              </div>

              <div className="flex gap-4">
                <CustomTooltip content="Informasi Tambahan">
                  <Button
                    isIconOnly
                    variant="light"
                    onClick={() => {
                      if (setMenuOpen) {
                        setMenuOpen(!menuOpen);
                      }
                    }}
                    className="h-12 min-w-12 bg-teal-100 data-[hover=true]:bg-teal-200"
                  >
                    <CaretUp
                      weight="bold"
                      size={22}
                      className={`text-teal-500 transition-all duration-500 ${
                        menuOpen ? "rotate-180" : "-rotate-0"
                      }`}
                    />
                  </Button>
                </CustomTooltip>

                <div className="grid w-full grid-cols-2 gap-4">
                  <Button
                    variant="flat"
                    className="w-full bg-teal-200 px-8 py-6 font-semibold text-teal-600"
                    onClick={createTransaksi}
                    disabled={listProdukAdmin.length == 0}
                  >
                    Buat Transaksi
                  </Button>
                  <Button
                    variant="solid"
                    className="w-full bg-teal-500 px-8 py-6 font-semibold text-white"
                    onClick={() => {
                      if (
                        confirm(
                          "apakah anda yakin ingin menyesaikan transaksi ini?",
                        )
                      ) {
                        router.reload();
                      }
                    }}
                    disabled={listProdukAdmin.length == 0}
                  >
                    Selesai
                  </Button>
                </div>
              </div>
            </div>

            {/* --- menu additional information --- */}
            <div
              className={`absolute left-0 z-10 h-[calc(100%-90px)] w-full bg-white text-white transition-all duration-500 ${
                menuOpen ? "bottom-24" : "-bottom-full"
              } overflow-y-scroll`}
            >
              <div className="flex h-full w-full flex-col gap-4 bg-white p-4">
                <h5 className="font-semibold text-default-900">
                  Informasi Tambahan
                </h5>

                <div className="grid gap-4">
                  <div className="grid grid-cols-3 gap-4">
                    <Input
                      value={noTelp}
                      type="text"
                      size="sm"
                      variant="flat"
                      labelPlacement="outside"
                      label={
                        <span className="text-[12px] text-default-900">
                          No. Telp
                        </span>
                      }
                      placeholder="Masukan no. telp..."
                      className="w-full text-black"
                      onChange={(e) => setNoTelp(e.target.value)}
                    />

                    <Input
                      value={penerima}
                      type="text"
                      size="sm"
                      variant="flat"
                      labelPlacement="outside"
                      label={
                        <span className="text-[12px] text-default-900">
                          Penerima
                        </span>
                      }
                      placeholder="Masukan penerima..."
                      className="w-full text-black"
                      onChange={(e) => setPenerima(e.target.value)}
                    />

                    <Input
                      value={pengiriman}
                      type="text"
                      size="sm"
                      variant="flat"
                      labelPlacement="outside"
                      label={
                        <span className="text-[12px] text-default-900">
                          Waktu Pengiriman
                        </span>
                      }
                      placeholder="Masukan waktu pengiriman..."
                      className="w-full text-black"
                      onChange={(e) => setPengiriman(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Textarea
                      value={keterangan}
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
                      placeholder="Masukan keterangan..."
                      className="w-full text-black"
                      onChange={(e) => setKeterangan(e.target.value)}
                    />

                    <Textarea
                      value={alamat}
                      type="text"
                      size="sm"
                      variant="flat"
                      maxRows={3}
                      labelPlacement="outside"
                      label={
                        <span className="text-[12px] text-default-900">
                          Alamat
                        </span>
                      }
                      placeholder="Masukan alamat lengkap..."
                      className="w-full text-black"
                      onChange={(e) => setAlamat(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-3">
                      <Input
                        value={ongkir ? `${ongkir}` : ""}
                        type="number"
                        size="sm"
                        variant="flat"
                        labelPlacement="outside"
                        label={
                          <span className="text-[12px] text-default-900">
                            Ongkir
                          </span>
                        }
                        placeholder="Masukan biaya ongkir..."
                        startContent={
                          <div className="pointer-events-none flex items-center">
                            <span className="text-sm text-default-600">Rp</span>
                          </div>
                        }
                        className="w-full text-black"
                        onChange={(e) => {
                          if (e.target.value == "") {
                            setOngkir(0);
                          } else {
                            setOngkir(parseInt(e.target.value));
                          }
                        }}
                      />

                      <div className="grid grid-cols-2 items-center gap-4">
                        <Input
                          value={persenDiskon ? `${persenDiskon}` : ""}
                          type="number"
                          size="sm"
                          variant="flat"
                          labelPlacement="outside"
                          label={
                            <span className="text-[12px] text-default-900">
                              Diskon Persen
                            </span>
                          }
                          startContent={
                            <div className="pointer-events-none flex items-center">
                              <span className="text-sm text-default-600">
                                %
                              </span>
                            </div>
                          }
                          placeholder="Masukan diskon persen..."
                          className="w-full text-black"
                          onChange={(e) => {
                            if (e.target.value == "") {
                              setPersenDiskon(0);
                            } else {
                              setDiskon(0);
                              setPersenDiskon(parseInt(e.target.value));
                            }
                          }}
                          min={0}
                          max={100}
                        />

                        <Input
                          value={diskon ? `${diskon}` : ""}
                          type="number"
                          size="sm"
                          variant="flat"
                          labelPlacement="outside"
                          label={
                            <span className="text-[12px] text-default-900">
                              Diskon Langsung
                            </span>
                          }
                          startContent={
                            <div className="pointer-events-none flex items-center">
                              <span className="text-sm text-default-600">
                                Rp
                              </span>
                            </div>
                          }
                          placeholder="Masukan diskon langsung..."
                          className="w-full text-black"
                          onChange={(e) => {
                            if (e.target.value == "") {
                              setDiskon(0);
                            } else {
                              setPersenDiskon(0);
                              setDiskon(parseInt(e.target.value));
                            }
                          }}
                          min={0}
                        />
                      </div>

                      <div className="grid grid-cols-2 items-center gap-4">
                        <RadioGroup
                          isRequired
                          orientation="horizontal"
                          label="Tipe"
                          value={tipe}
                          size="sm"
                          onChange={(e) => {
                            if (e.target.value == "nota") {
                              setPajak(0);
                              setPersenPajak(0);
                              setTipe(e.target.value);
                            } else {
                              setTipe(e.target.value);
                            }
                          }}
                        >
                          <Radio value="nota">
                            <p className="text-sm font-medium text-default-600">
                              Nota
                            </p>
                          </Radio>
                          <Radio value="faktur">
                            <p className="text-sm font-medium text-default-600">
                              Faktur
                            </p>
                          </Radio>
                        </RadioGroup>

                        {tipe == "faktur" ? (
                          <Input
                            value={persenPajak ? `${persenPajak}` : ""}
                            isRequired
                            type="number"
                            size="sm"
                            variant="flat"
                            labelPlacement="outside"
                            label="Pajak"
                            placeholder="Masukan persen pajak..."
                            startContent={
                              <div className="pointer-events-none flex items-center">
                                <span className="text-sm text-default-600">
                                  %
                                </span>
                              </div>
                            }
                            className="w-full text-black"
                            onChange={(e) => {
                              if (e.target.value == "") {
                                setPersenPajak(0);
                              } else {
                                setPersenPajak(parseInt(e.target.value));
                              }
                            }}
                            min={0}
                            max={100}
                          />
                        ) : null}
                      </div>

                      <RadioGroup
                        value={metode}
                        isRequired
                        orientation="horizontal"
                        label="Metode"
                        size="sm"
                        onChange={(e) => {
                          const value = e.target.value;
                          setMetode(value);
                          if (value == "transfer") {
                            setTunai(0);
                            setKembali(0);
                          }

                          if (value == "cash") {
                            setIdTransaksi("");
                          }

                          if (value == "tempo") {
                            setTunai(0);
                            setKembali(0);
                            setIdTransaksi("");
                          }
                        }}
                      >
                        <Radio value="cash">
                          <p className="text-sm font-medium text-default-600">
                            Cash
                          </p>
                        </Radio>
                        <Radio value="transfer">
                          <p className="text-sm font-medium text-default-600">
                            Transfer
                          </p>
                        </Radio>
                        <Radio value="tempo">
                          <p className="text-sm font-medium text-default-600">
                            Tempo
                          </p>
                        </Radio>
                      </RadioGroup>

                      {metode == "cash" ? (
                        <Input
                          value={tunai ? `${tunai}` : ""}
                          isRequired
                          type="number"
                          variant="flat"
                          labelPlacement="outside"
                          label="Tunai"
                          size="sm"
                          placeholder="Masukan tunai..."
                          startContent={
                            <div className="pointer-events-none flex items-center">
                              <span className="text-sm text-default-600">
                                Rp
                              </span>
                            </div>
                          }
                          className="w-full text-black"
                          onChange={(e) => {
                            if (e.target.value == "") {
                              setTunai(0);
                            } else {
                              setTunai(parseInt(e.target.value));
                            }
                          }}
                          min={0}
                        />
                      ) : null}

                      {metode == "transfer" ? (
                        <Input
                          value={idTransaksi}
                          isRequired
                          type="text"
                          variant="flat"
                          labelPlacement="outside"
                          label="ID Transaksi Bank"
                          size="sm"
                          placeholder="Masukan id transaksi bank..."
                          className="w-full text-black"
                          onChange={(e) => setIdTransaksi(e.target.value)}
                        />
                      ) : null}

                      {metode == "tempo" ? (
                        <div className="grid grid-cols-2 gap-4">
                          <Input
                            type="text"
                            variant="flat"
                            labelPlacement="outside"
                            label="DP"
                            size="sm"
                            placeholder="Masukan dp..."
                            className="w-full text-black"
                            onChange={(e) => setDp(parseInt(e.target.value))}
                          />

                          <Input
                            type="number"
                            variant="flat"
                            labelPlacement="outside"
                            label="Estimasi"
                            size="sm"
                            placeholder="Masukan jumlah hari..."
                            className="w-full text-black"
                            onChange={(e) => {
                              if (!e.target.value) {
                                setEstimasi(1);
                              } else {
                                setEstimasi(parseInt(e.target.value));
                              }
                            }}
                          />
                        </div>
                      ) : null}
                    </div>

                    <div className="h-3/4">
                      <div className="grid gap-1 border-l-4 border-teal-500 pl-6">
                        <div className="grid grid-cols-[150px_6px_1fr] gap-1 text-sm text-default-900">
                          <div className="font-normal">Subtotal Produk</div>
                          <div className="font-normal">:</div>
                          <p className="font-normal">
                            {formatRupiah(totalBelanja)}
                          </p>
                        </div>

                        <div className="grid grid-cols-[150px_6px_1fr] gap-1 text-sm text-default-900">
                          <div className="font-normal">Subtotal Ongkir</div>
                          <div className="font-normal">:</div>
                          <p className="font-normal">{formatRupiah(ongkir)}</p>
                        </div>

                        <div className="grid grid-cols-[150px_6px_1fr] gap-1 text-sm text-default-900">
                          <div className="font-normal">Total Keseluruhan</div>
                          <div className="font-normal">:</div>
                          <p className="font-normal">
                            {formatRupiah(ongkir + totalBelanja)}
                          </p>
                        </div>

                        {tipe == "faktur" ? (
                          <div className="grid grid-cols-[150px_6px_1fr] gap-1 text-sm text-default-900">
                            <div className="font-normal">
                              Pajak ({persenPajak} %)
                            </div>
                            <div className="font-normal">:</div>
                            <p className="font-normal">{formatRupiah(pajak)}</p>
                          </div>
                        ) : null}

                        {diskon || persenDiskon ? (
                          <div className="grid grid-cols-[150px_6px_1fr] gap-1 text-sm text-default-900">
                            <div className="font-normal">
                              Diskon{" "}
                              {persenDiskon ? `(${persenDiskon}%)` : null}
                            </div>
                            <div className="font-normal">:</div>
                            <p className="font-normal">
                              -{formatRupiah(totalDiskon)}
                            </p>
                          </div>
                        ) : null}

                        <div className="mt-5 grid grid-cols-[150px_6px_1fr] gap-1 text-sm text-default-900">
                          <div className="font-bold">Total Pembayaran</div>
                          <div className="font-bold">:</div>
                          <p className="font-bold">
                            {formatRupiah(totalPembayaran)}
                          </p>
                        </div>

                        {metode == "cash" ? (
                          <>
                            <div className="grid grid-cols-[150px_6px_1fr] gap-1 text-sm text-default-900">
                              <div className="font-bold">Tunai</div>
                              <div className="font-bold">:</div>
                              <p className="font-bold text-teal-500">
                                {formatRupiah(tunai)}
                              </p>
                            </div>

                            <div className="grid grid-cols-[150px_6px_1fr] gap-1 text-sm text-default-900">
                              <div className="font-bold">Kembali</div>
                              <div className="font-bold">:</div>
                              <p className="font-bold text-teal-500">
                                {formatRupiah(kembali)}
                              </p>
                            </div>
                          </>
                        ) : null}
                        {metode == "transfer" ? (
                          <div className="grid grid-cols-[150px_6px_1fr] gap-1 text-sm text-default-900">
                            <div className="font-bold">ID Transaksi Bank</div>
                            <div className="font-bold">:</div>
                            <p className="font-bold text-teal-500">
                              {idTransaksi}
                            </p>
                          </div>
                        ) : null}
                        {metode == "tempo" ? (
                          <>
                            <div className="grid grid-cols-[150px_6px_1fr] gap-1 text-sm text-default-900">
                              <div className="font-bold">Dp</div>
                              <div className="font-bold">:</div>
                              <p className="font-bold text-teal-500">
                                {formatRupiah(dp)}
                              </p>
                            </div>
                            <div className="grid grid-cols-[150px_6px_1fr] gap-1 text-sm text-default-900">
                              <div className="font-bold">Estimasi</div>
                              <div className="font-bold">:</div>
                              <p className="font-bold text-teal-500">
                                {estimation(estimasi)}
                              </p>
                            </div>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
