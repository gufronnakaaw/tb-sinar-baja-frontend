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

import { TemplateFaktur } from "@/components/template/TemplateFaktur";
import { TemplateNota } from "@/components/template/TemplateNota";
import { fetcher } from "@/utils/fetcher";

type ProdukType = {
  kode_item?: string;
  nama_produk: string;
  harga_4: number;
  gudang: string;
  rak: string;
  stok: number;
};

export default function SellingPage() {
  const [telp, setTelp] = useState("-");
  const [penerima, setPenerima] = useState("Umum");
  const [ket, setKet] = useState("-");
  const [alamat, setAlamat] = useState("-");
  const [ongkir, setOngkir] = useState(0);
  const [pengiriman, setPengiriman] = useState("-");
  const [tipe, setTipe] = useState("nota");

  const [totalBelanja, setTotalBelanja] = useState(0);
  const [pajak, setPajak] = useState(0);
  const [totalPajak, setTotalPajak] = useState(0);
  const [totalPembayaran, setTotalPembayaran] = useState(0);
  const [tunai, setTunai] = useState(0);
  const [kembali, setKembali] = useState(0);
  const [produk, setProduk] = useState<ProdukType[]>([]);

  const router = useRouter();
  const sellingRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => sellingRef.current,
  });

  const [search, setSearch] = useState("");
  const [searchValue] = useDebounce(search, 800);

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

  const notaProps = {
    ket,
    penerima,
    telp,
    pengiriman,
    alamat,
    totalBelanja,
    ongkir,
    totalPembayaran,
  };

  const fakturProps = {
    ket,
    penerima,
    telp,
    pengiriman,
    alamat,
    totalBelanja,
    ongkir,
    totalPembayaran,
    pajak,
  };

  useEffect(() => {
    if (searchValue != "") {
      getProduk(searchValue);
    } else {
      setProduk([]);
    }

    async function getProduk(search: string) {
      try {
        const data = await fetcher({
          url: "/produk?search=" + encodeURI(search),
          method: "GET",
        });

        setProduk(data.data);
      } catch (error) {
        console.log(error);
      }
    }
  }, [searchValue]);

  return (
    <>
      <div className="hidden">
        {tipe == "nota" ? (
          <TemplateNota {...notaProps} ref={sellingRef} />
        ) : tipe == "faktur" ? (
          <TemplateFaktur {...fakturProps} ref={sellingRef} />
        ) : null}
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
              <p className="text-sm font-medium text-default-600">
                <span className="font-bold text-rose-500">{produk.length}</span>{" "}
                produk ditemukan
              </p>
            </div>

            {search == "" ? (
              <p className="pt-24 text-center text-sm font-medium italic text-default-400">
                Produk yang anda cari akan muncul disini!
              </p>
            ) : null}

            <div className="grid gap-4 overflow-y-scroll scrollbar-hide">
              {produk.map((item) => {
                return <CardSellingProduct key={item.kode_item} {...item} />;
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
                {/* ==== card here ==== */}
                <CardSellingQuantityProduct />
                <CardSellingQuantityProduct />
              </div>
            </div>

            <div className="sticky bottom-0 grid grid-cols-2 items-center gap-16 border-t border-gray-300 bg-white pt-8">
              <div className="flex items-center justify-between gap-2">
                <p className="font-medium text-gray-600">Total Belanja :</p>
                <h5 className="text-[28px] font-semibold text-rose-500">
                  Rp 417.000
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
