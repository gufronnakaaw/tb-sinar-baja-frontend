import { Button, Chip, Input } from "@nextui-org/react";
import { ArrowLeft, Circle, Minus, Plus } from "@phosphor-icons/react";
import Head from "next/head";
import { useRouter } from "next/router";

// components
import InputSearchBar from "@/components/input/InputSearchBar";
import PopupContinuePayment from "@/components/popup/popupContinuePayment";
import CustomTooltip from "@/components/tooltip";

export default function SellingPage() {
  const router = useRouter();

  return (
    <>
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
            color="default"
            startContent={
              <Circle weight="fill" size={8} className="animate-ping" />
            }
            classNames={{
              base: "px-3",
              content: "font-medium text-[12px]",
            }}
            className="gap-1"
          >
            Kasir Onlne: Nanang
          </Chip>
        </div>

        <div className="grid h-[calc(100vh-64px)] grid-cols-[480px_auto_1fr] gap-4 overflow-hidden">
          {/* ==== left content ==== */}
          <div className="flex flex-col gap-6 overflow-scroll p-4 scrollbar-hide">
            <div className="flex items-center gap-2">
              <InputSearchBar
                placeholder="Cari produk/barang..."
                className="sticky left-0 top-0"
              />

              <Button
                variant="solid"
                className="bg-rose-500 font-semibold text-white"
              >
                Cari
              </Button>
            </div>

            <div className="grid gap-4 overflow-y-scroll scrollbar-hide">
              {/* ==== card here ==== */}
              <div className="grid gap-[20px] rounded-xl border border-default-300 p-4 transition hover:border-rose-500">
                <div className="grid gap-1">
                  <CustomTooltip content="C-truss Mini SNI tbl KD 10">
                    <h1 className="line-clamp-2 text-lg font-bold text-default-900">
                      C-truss Mini SNI tbl KD 10
                    </h1>
                  </CustomTooltip>
                  <h1 className="font-semibold text-rose-500">Rp 93.000</h1>
                </div>

                <div className="grid grid-cols-[1fr_100px] items-end gap-2">
                  <div className="flex items-center gap-6">
                    <div className="grid">
                      <p className="text-[12px] font-medium text-default-600">
                        Stok:
                      </p>
                      <h4 className="font-semibold text-default-900">186</h4>
                    </div>

                    <div className="grid">
                      <p className="text-[12px] font-medium text-default-600">
                        Lokasi:
                      </p>
                      <h4 className="line-clamp-1 font-semibold capitalize text-default-900">
                        Gedung A, Rak 12
                      </h4>
                    </div>
                  </div>

                  <Button
                    variant="flat"
                    color="danger"
                    size="sm"
                    className="w-max font-medium"
                  >
                    Tambahkan
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="h-full w-[1px] bg-gray-300" />

          {/* ==== right content ==== */}
          <div className="grid grid-rows-[auto_1fr_auto] gap-4 overflow-scroll p-4 scrollbar-hide">
            <div className="sticky top-0 grid gap-4 bg-white">
              <h4 className="text-lg font-semibold text-default-900">
                Daftar Pesanan
              </h4>

              <div className="grid grid-cols-[1fr_160px_1fr] items-center gap-16 border-b border-gray-300 pb-2">
                <div className="text-sm font-semibold text-default-600">
                  Item
                </div>
                <div className="text-sm font-semibold text-default-600">
                  Qty
                </div>
                <div className="text-sm font-semibold text-default-600">
                  Harga
                </div>
              </div>
            </div>

            <div className="overflow-y-scroll scrollbar-hide">
              <div className="grid gap-4">
                {/* ==== card here ==== */}
                <div className="grid grid-cols-[1fr_160px_1fr] items-center gap-16">
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
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 grid grid-cols-2 items-center gap-16 border-t border-gray-300 bg-white pt-8">
              <div className="flex items-center justify-between gap-2">
                <p className="font-medium text-gray-600">Total Harga :</p>
                <h5 className="text-[28px] font-semibold text-rose-500">
                  Rp 417.000
                </h5>
              </div>

              <PopupContinuePayment />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
