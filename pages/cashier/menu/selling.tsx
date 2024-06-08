import {
  Avatar,
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Input,
  Radio,
  RadioGroup,
  Textarea,
} from "@nextui-org/react";
import { ArrowLeft, CaretUp, Circle } from "@phosphor-icons/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useDebounce } from "use-debounce";

// components
import CardSellingProduct from "@/components/card/CardSellingProduct";
import CardSellingQuantityProduct from "@/components/card/CardSellingQuantityProduct";
import InputSearchBar from "@/components/input/InputSearchBar";
import CustomTooltip from "@/components/tooltip";

// utils
import LoadingScreen from "@/components/LoadingScreen";
import { TemplateNota } from "@/components/template/TemplateNota";
import { GlobalResponse } from "@/types/global.type";
import { ProdukType } from "@/types/products.type";
import { ListProdukType } from "@/types/selling.type";
import { TransaksiType } from "@/types/transactions.type";
import { fetcher } from "@/utils/fetcher";
import { formatRupiah } from "@/utils/formatRupiah";
import { useSession } from "next-auth/react";
import useSWR from "swr";

const unique_key = (Math.random() + 1).toString(36).substring(7);

const harga = {
  harga_1: "Harga Distributor",
  harga_2: "Harga Agen",
  harga_3: "Harga Grosir",
  harga_4: "Harga Toko",
  harga_5: "Harga Aplikator",
  harga_6: "Harga Retail",
};

type Harga = {
  harga_1: string;
  harga_2: string;
  harga_3: string;
  harga_4: string;
  harga_5: string;
  harga_6: string;
};

export default function SellingPage() {
  const swr = useSWR<GlobalResponse<{ field: string }>>(
    {
      url: "/setting",
      method: "GET",
    },
    fetcher,
    {
      refreshInterval: 5000,
    },
  );

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
  const [produk, setProduk] = useState<ProdukType[]>([]);

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
  const [listProduk, setListProduk] = useState<ListProdukType[]>([]);
  const [totalPembayaran, setTotalPembayaran] = useState<number>(0);
  const [totalBelanja, setTotalBelanja] = useState<number>(0);
  const { status, data } = useSession();

  async function createTransaksi() {
    if (listProduk.length > 8) {
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
          tipe: "umum",
          unique_key,
          tunai: tunai ? tunai : 0,
          kembalian: kembali ? kembali : 0,
          metode: "Cash",
          list_produk: listProduk.map((produk) => {
            return {
              kode_item: produk.kode_item,
              jumlah: produk.qty,
              satuan: produk.satuan_kecil,
              nama_produk: produk.nama_produk,
              gudang: produk.gudang,
              rak: produk.rak,
              harga: produk.harga,
              sub_total: produk.subtotal,
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

  function toggleMenu() {
    if (setMenuOpen) {
      setMenuOpen(!menuOpen);
    }
  }

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    setTotalBelanja(listProduk.reduce((a, b) => a + b.subtotal, 0));

    if (listProduk.length == 0) {
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
  }, [listProduk]);

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

  if (swr.isLoading) {
    return <LoadingScreen role="cashier" />;
  }

  if (swr.error) {
    console.log(swr.error);
    return alert("error saat mendapatkan harga");
  }

  return (
    <>
      <div className="hidden">
        {dataPrint ? <TemplateNota {...dataPrint} ref={sellingRef} /> : null}
      </div>

      <Head>
        <title>Halaman Penjualan</title>
      </Head>

      <section className="mx-auto h-dvh max-w-[1440px] overflow-hidden">
        <div className="flex h-[64px] items-center justify-between gap-4 border-b border-gray-300 p-4">
          <Button
            variant="light"
            size="sm"
            color="danger"
            startContent={<ArrowLeft weight="bold" size={14} />}
            onClick={() => router.push("/cashier/menu")}
            className="font-medium"
          >
            Kambali ke Menu
          </Button>

          <div className="flex items-center gap-4">
            <Chip
              variant="flat"
              color="danger"
              size="lg"
              startContent={
                <Circle weight="fill" size={8} className="animate-ping" />
              }
              classNames={{
                base: "px-3",
                content: "font-semibold",
              }}
            >
              {harga[swr.data?.data.field as keyof Harga]}
            </Chip>
            <Dropdown>
              <DropdownTrigger>
                <div className="inline-flex items-center gap-2 hover:cursor-pointer">
                  <Avatar
                    isBordered
                    size="sm"
                    color="default"
                    showFallback
                    src="https://images.unsplash.com/broken"
                  />

                  <div className="-space-y-1">
                    <h6 className="mb-1 text-sm font-bold text-default-900">
                      {status == "authenticated" ? data.user.nama : null}
                    </h6>
                    <p className="text-[12px] font-medium uppercase text-default-500">
                      TB Sinar Baja
                    </p>
                  </div>
                </div>
              </DropdownTrigger>

              <DropdownMenu aria-label="profile actions">
                <DropdownSection
                  aria-label="danger zone section"
                  title="Navigasi"
                >
                  <DropdownItem
                    key="navigation"
                    color="danger"
                    onClick={() => window.open("/admin/dashboard")}
                    className="font-bold text-danger-600"
                  >
                    Admin Menu
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>

        <div className="grid h-[calc(100vh-64px)] grid-cols-[435px_auto_1fr] overflow-hidden">
          {/* ==== left content ==== */}
          <div className="flex flex-col gap-6 overflow-scroll p-4 scrollbar-hide">
            <div className="sticky left-0 top-0 grid gap-4">
              <InputSearchBar
                placeholder="Ketik kode produk/nama produk..."
                onChange={(e) => setSearch(e.target.value)}
              />

              {loading ? (
                <p className="text-sm font-bold text-rose-500">loading...</p>
              ) : produk.length != 0 ? (
                <p className="text-sm font-medium text-default-600">
                  <span className="font-bold text-rose-500">
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
                  <CardSellingProduct
                    key={item.kode_item}
                    {...{ ...item, setListProduk, field: swr.data?.data.field }}
                  />
                );
              })}
            </div>
          </div>

          <div className="h-full w-[1px] bg-gray-300" />

          {/* ==== right content ==== */}
          <div className="relative grid grid-rows-[auto_1fr_auto] overflow-hidden bg-white scrollbar-hide">
            <div className="sticky top-0 grid grid-cols-[1fr_repeat(3,140px)_42px] items-center gap-10 border-b border-gray-300 bg-white p-4">
              <div className="text-sm font-semibold text-default-600">
                Item{" "}
                <span className="font-bold text-rose-500">
                  {listProduk.length}
                </span>
              </div>
              <div className="text-sm font-semibold text-default-600">Qty</div>
              <div className="text-sm font-semibold text-default-600">
                Harga
              </div>
              <div className="text-sm font-semibold text-default-600">
                Subtotal
              </div>
              <div className="text-sm font-semibold text-default-600">Aksi</div>
            </div>

            <div className="overflow-y-scroll scrollbar-hide">
              <div className="grid">
                {listProduk.map((item) => {
                  return (
                    <CardSellingQuantityProduct
                      key={item.kode_item}
                      {...{ ...item, setListProduk }}
                    />
                  );
                })}
              </div>
            </div>

            <div className="sticky bottom-0 z-20 grid grid-cols-2 items-center gap-16 border-t border-gray-300 bg-white p-[1rem]">
              <div className="flex items-center justify-between gap-2">
                <p className="font-bold text-gray-600">Total Pembayaran :</p>
                <h5 className="text-[24px] font-semibold text-rose-500">
                  {formatRupiah(totalPembayaran)}
                </h5>
              </div>

              <div className="flex gap-4">
                <CustomTooltip content="Informasi Tambahan">
                  <Button
                    isIconOnly
                    variant="light"
                    onClick={toggleMenu}
                    className="h-12 min-w-12 bg-rose-100 data-[hover=true]:bg-rose-200"
                  >
                    <CaretUp
                      weight="bold"
                      size={22}
                      className={`text-rose-500 transition-all duration-500 ${
                        menuOpen ? "rotate-180" : "-rotate-0"
                      }`}
                    />
                  </Button>
                </CustomTooltip>

                <div className="grid w-full grid-cols-2 gap-4">
                  <Button
                    variant="flat"
                    color="danger"
                    className="w-full px-8 py-6 font-semibold"
                    onClick={createTransaksi}
                    disabled={listProduk.length == 0 || tunai < totalPembayaran}
                  >
                    Cetak
                  </Button>
                  <Button
                    variant="solid"
                    className="w-full bg-rose-500 px-8 py-6 font-semibold text-white"
                    onClick={() => {
                      if (
                        confirm(
                          "apakah anda yakin ingin menyesaikan transaksi ini?",
                        )
                      ) {
                        router.reload();
                      }
                    }}
                    disabled={listProduk.length == 0}
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
                          orientation="horizontal"
                          color="danger"
                          label={
                            <p className="text-[12px] text-danger">
                              Tipe <span className="text-danger">*</span>
                            </p>
                          }
                          value={tipe}
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
                            label={
                              <span className="text-[12px] text-danger">
                                Pajak
                              </span>
                            }
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

                      <Input
                        value={tunai ? `${tunai}` : ""}
                        isRequired
                        type="number"
                        size="sm"
                        variant="flat"
                        labelPlacement="outside"
                        label={
                          <span className="text-[12px] text-danger">Tunai</span>
                        }
                        placeholder="Masukan tunai..."
                        startContent={
                          <div className="pointer-events-none flex items-center">
                            <span className="text-sm text-default-600">Rp</span>
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
                    </div>

                    <div className="h-3/4">
                      <div className="grid gap-1 border-l-4 border-rose-500 pl-6">
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

                        <div className="grid grid-cols-[150px_6px_1fr] gap-1 text-sm text-default-900">
                          <div className="font-bold">Tunai</div>
                          <div className="font-bold">:</div>
                          <p className="font-bold text-rose-500">
                            {formatRupiah(tunai)}
                          </p>
                        </div>

                        <div className="grid grid-cols-[150px_6px_1fr] gap-1 text-sm text-default-900">
                          <div className="font-bold">Kembali</div>
                          <div className="font-bold">:</div>
                          <p className="font-bold text-rose-500">
                            {formatRupiah(kembali)}
                          </p>
                        </div>
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
