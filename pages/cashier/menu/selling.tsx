import { Button, Chip } from "@nextui-org/react";
import { ArrowLeft, Circle } from "@phosphor-icons/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useDebounce } from "use-debounce";

// components
import CardSellingProduct from "@/components/card/CardSellingProduct";
import CardSellingQuantityProduct from "@/components/card/CardSellingQuantityProduct";
import InputSearchBar from "@/components/input/InputSearchBar";
import PopupContinuePayment from "@/components/popup/PopupContinuePayment";

import { TemplateNota } from "@/components/template/TemplateNota";
import { TransaksiType } from "@/types/transactions.type";
import { fetcher } from "@/utils/fetcher";
import { formatRupiah } from "@/utils/formatRupiah";

type ProdukType = {
  kode_item: string;
  nama_produk: string;
  harga_4: number;
  gudang: string;
  rak: string;
  stok: number;
  satuan_kecil: string;
};

type ProdukList = {
  kode_item: string;
  nama_produk: string;
  harga: number;
  stok: number;
  qty: number;
  subtotal: number;
  satuan_kecil: string;
};

const unique_key = (Math.random() + 1).toString(36).substring(7);

export default function SellingPage() {
  const [telp, setTelp] = useState("-");
  const [penerima, setPenerima] = useState("Umum");
  const [ket, setKet] = useState("-");
  const [alamat, setAlamat] = useState("-");
  const [ongkir, setOngkir] = useState(0);
  const [pengiriman, setPengiriman] = useState("-");
  const [tipe, setTipe] = useState("nota");
  const [pajak, setPajak] = useState(0);
  const [totalPajak, setTotalPajak] = useState(0);

  const [tunai, setTunai] = useState(0);
  const [kembali, setKembali] = useState(0);
  const [produk, setProduk] = useState<ProdukType[]>([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [dataPrint, setDataPrint] = useState<TransaksiType>(null);

  const router = useRouter();
  const sellingRef = useRef(null);
  const reactPrint = useReactToPrint({
    content: () => sellingRef.current,
  });

  const [search, setSearch] = useState("");
  const [searchValue] = useDebounce(search, 800);
  const [listProduk, setListProduk] = useState<ProdukList[]>([]);
  const [totalPembayaran, setTotalPembayaran] = useState(0);
  const [totalBelanja, setTotalBelanja] = useState(0);

  useEffect(() => {
    document.title = title;
  }, [title]);

  async function handlePrint() {
    try {
      const response = await fetcher({
        url: "/transaksi",
        method: "POST",
        data: {
          keterangan: ket,
          penerima,
          no_telp: telp,
          alamat,
          pengiriman,
          ongkir,
          total_belanja: listProduk.reduce((a, b) => a + b.subtotal, 0),
          total_pembayaran: totalPembayaran,
          pajak: totalPajak ? totalPajak : null,
          persen_pajak: pajak ? pajak : null,
          tipe: "umum",
          unique_key,
          tunai,
          metode: "Cash",
          list_produk: listProduk.map((produk) => {
            return {
              jumlah: produk.qty,
              kode_item: produk.kode_item,
              satuan: produk.satuan_kecil,
              nama_produk: produk.nama_produk,
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
      alert("tidak dapat melakukan transaksi");
    }
  }

  const popupProps = {
    setTelp,
    setPenerima,
    setKet,
    setAlamat,
    setOngkir,
    setPengiriman,
    setTipe,
    setTunai,
    setTotalBelanja,
    setTotalPembayaran,
    setKembali,
    setPajak,
    setTotalPajak,
    totalPajak,
    pajak,
    tunai,
    totalBelanja,
    totalPembayaran,
    kembali,
    ongkir,
    tipe,
    handlePrint,
  };

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
      }
    }
  }, [searchValue]);

  useEffect(() => {
    if (tipe == "nota") {
      setTotalPembayaran(ongkir + totalBelanja);
    } else {
      setTotalPajak((totalBelanja / 100) * pajak);
      setTotalPembayaran(totalPajak + ongkir + totalBelanja);
    }
  }, [totalBelanja, ongkir, tipe, pajak, totalPajak]);

  useEffect(() => {
    setTotalBelanja(listProduk.reduce((a, b) => a + b.subtotal, 0));
  }, [listProduk]);

  return (
    <>
      <div className="hidden">
        {title ? <TemplateNota {...dataPrint} ref={sellingRef} /> : null}
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

          <Chip
            variant="flat"
            color="success"
            startContent={
              <Circle weight="fill" size={8} className="animate-ping" />
            }
            classNames={{
              base: "px-3",
              content: "font-medium text-[12px]",
            }}
            className="gap-1"
          >
            Kasir Online: Ucup Sitorus
          </Chip>
        </div>

        <div className="grid h-[calc(100vh-64px)] grid-cols-[480px_auto_1fr] gap-4 overflow-hidden">
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
                    {...item}
                    setListProduk={setListProduk}
                  />
                );
              })}
            </div>
          </div>

          <div className="h-full w-[1px] bg-gray-300" />

          {/* ==== right content ==== */}
          <div className="grid grid-rows-[auto_1fr_auto] overflow-scroll p-4 scrollbar-hide">
            <div className="sticky top-0 grid grid-cols-[1fr_repeat(3,140px)_42px] items-center gap-10 border-b border-gray-300 bg-white pb-4">
              <div className="text-sm font-semibold text-default-600">Item</div>
              <div className="text-sm font-semibold text-default-600">Qty</div>
              <div className="text-sm font-semibold text-default-600">
                Harga
              </div>
              <div className="text-sm font-semibold text-default-600">
                Sub Total
              </div>
              <div className="text-sm font-semibold text-default-600">Aksi</div>
            </div>

            <div className="overflow-y-scroll scrollbar-hide">
              <div className="grid">
                {listProduk.map((item) => {
                  return (
                    <CardSellingQuantityProduct
                      key={item.kode_item}
                      {...item}
                      setListProduk={setListProduk}
                    />
                  );
                })}
              </div>
            </div>

            <div className="sticky bottom-0 grid grid-cols-2 items-center gap-16 border-t border-gray-300 bg-white pt-8">
              <div className="flex items-center justify-between gap-2">
                <p className="font-medium text-gray-600">Total Belanja :</p>
                <h5 className="text-[28px] font-semibold text-rose-500">
                  {formatRupiah(totalBelanja)}
                </h5>
              </div>

              <PopupContinuePayment {...popupProps} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
