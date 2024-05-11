import { Button, Chip, Input } from "@nextui-org/react";
import { ArrowLeft, Circle, Minus, Plus } from "@phosphor-icons/react";
import Head from "next/head";
import { useRouter } from "next/router";

// components
import CardSellingProduct from "@/components/card/CardSellingProduct";
import InputSearchBar from "@/components/input/InputSearchBar";
import PopupContinuePayment from "@/components/popup/popupContinuePayment";
import { TemplateNota } from "@/components/template/TemplateNota";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useDebounce } from "use-debounce";

const produk = [
  {
    kode_item: "111",
    nama_produk: "Test 1",
    harga: 10000,
    stok: 100,
    gudang: "Gudang A",
    rak: "Rak 10",
  },
  {
    kode_item: "222",
    nama_produk: "Test 2",
    harga: 103000,
    stok: 15,
    gudang: "Gudang B",
    rak: "Rak 12",
  },
];

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

  const router = useRouter();
  const sellingRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => sellingRef.current,
  });

  const [search, setSearch] = useState("");
  const [searchValue] = useDebounce(search, 1000);

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

  console.log(searchValue);

  return (
    <>
      <div className="hidden">
        {tipe == "nota" ? (
          <TemplateNota {...notaProps} ref={sellingRef} />
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
            <InputSearchBar
              placeholder="Ketik kode produk/nama produk..."
              className="sticky left-0 top-0"
              onKeyUp={(e) => {
                setTimeout(() => {
                  setSearch(e.target.value);
                }, 500);
              }}
            />

            <div className="grid gap-4 overflow-y-scroll scrollbar-hide">
              {produk.map((el) => {
                return <CardSellingProduct key={el.kode_item} {...el} />;
              })}
            </div>
          </div>

          <div className="h-full w-[1px] bg-gray-300" />

          {/* ==== right content ==== */}
          <div className="grid grid-rows-[auto_1fr_auto] gap-4 overflow-scroll p-4 scrollbar-hide">
            <div className="sticky top-0 grid gap-4 bg-white">
              <h4 className="text-lg font-semibold text-default-900">
                Daftar Pesanan
              </h4>

              <div className="grid grid-cols-4 items-center gap-16 border-b border-gray-300 pb-2">
                <div className="text-sm font-semibold text-default-600">
                  Item
                </div>
                <div className="text-sm font-semibold text-default-600">
                  Qty
                </div>
                <div className="text-sm font-semibold text-default-600">
                  Harga
                </div>
                <div className="text-sm font-semibold text-default-600">
                  Sub Total
                </div>
              </div>
            </div>

            <div className="overflow-y-scroll scrollbar-hide">
              <div className="grid gap-4">
                {/* ==== card here ==== */}
                <div className="grid grid-cols-4 items-center gap-16">
                  <div className="grid font-semibold text-default-600">
                    <h4 className="line-clamp-2 font-medium text-default-900">
                      C-truss Mini SNI tbl KD 10
                    </h4>
                    <p className="font-medium text-rose-500">Rp 93.000</p>
                  </div>

                  <div className="flex items-center gap-4 text-sm font-semibold text-default-600">
                    <Button isIconOnly color="danger" variant="flat" size="sm">
                      <Minus weight="bold" size={16} />
                    </Button>
                    <Input
                      type="number"
                      variant="flat"
                      size="sm"
                      defaultValue="1"
                      labelPlacement="outside"
                    />
                    <Button isIconOnly color="danger" variant="flat" size="sm">
                      <Plus weight="bold" size={16} />
                    </Button>
                  </div>

                  <div className="font-bold text-default-900">Rp 93.000</div>
                  <div className="font-bold text-default-900">Rp 200.000</div>
                </div>
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
