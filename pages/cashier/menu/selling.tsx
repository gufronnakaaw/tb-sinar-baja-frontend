import { Button, Chip, Input, Textarea, Tooltip } from "@nextui-org/react";
import { ArrowLeft, Circle, Minus, Plus } from "@phosphor-icons/react";
import Head from "next/head";
import { useRouter } from "next/router";

// components
import InputSearchBar from "@/components/input/InputSearchBar";
import PopupContinuePayment from "@/components/popup/popupContinuePayment";

export default function SellingPage() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Halaman Penjualan</title>
      </Head>

      <section className="mx-auto h-dvh max-w-[1440px] overflow-hidden">
        <div className="flex h-[64px] items-center justify-between gap-4 p-4">
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

        <div className="grid h-[calc(100vh-64px)] grid-cols-3 gap-4 overflow-hidden p-[0_1rem_1rem_1rem]">
          {/* ==== left content ==== */}
          <div className="flex flex-col gap-6 overflow-scroll">
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

            <div className="grid gap-4 overflow-y-scroll">
              {/* ==== card here ==== */}
              <div className="grid gap-[20px] rounded-xl border border-default-200 p-4">
                <div className="grid gap-1">
                  <h1 className="line-clamp-2 text-lg font-bold text-default-900">
                    <Tooltip
                      delay={0}
                      closeDelay={0}
                      placement="top-start"
                      content="C-truss Mini SNI tbl KD 10"
                    >
                      C-truss Mini SNI tbl KD 10
                    </Tooltip>
                  </h1>
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

          {/* ==== center content ==== */}
          <div className="grid grid-rows-[auto_1fr_auto] gap-4 overflow-scroll">
            <div className="sticky top-0 grid gap-4 bg-white">
              <h4 className="text-lg font-semibold text-default-900">
                Daftar Pesanan
              </h4>

              <div className="grid grid-cols-3 items-center gap-4 border-b border-gray-200 pb-2">
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

            <div className="overflow-y-scroll">
              <div className="grid gap-4">
                {/* ==== card here ==== */}
                <div className="grid grid-cols-[1fr_130px_1fr] items-center gap-4">
                  <div className="grid text-sm font-semibold text-default-600">
                    <h4 className="line-clamp-2 font-medium text-default-900">
                      C-truss Mini SNI tbl KD 10
                    </h4>
                    <p className="font-medium text-rose-500">Rp 93.000</p>
                  </div>

                  <div className="flex items-center gap-1 text-sm font-semibold text-default-600">
                    <Button
                      isIconOnly
                      variant="solid"
                      size="sm"
                      className="bg-rose-500 text-white"
                    >
                      <Plus weight="bold" size={12} />
                    </Button>
                    <Input
                      type="number"
                      variant="flat"
                      size="sm"
                      defaultValue="1"
                      labelPlacement="outside"
                    />
                    <Button
                      isIconOnly
                      variant="solid"
                      size="sm"
                      className="bg-rose-500 text-white"
                    >
                      <Minus weight="bold" size={12} />
                    </Button>
                  </div>

                  <div className="text-sm font-bold text-default-900">
                    Rp 93.000
                  </div>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 flex flex-col gap-1 border-t border-gray-200 bg-white pt-8">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-600">
                  Biaya Ongkir
                </p>
                <h5 className="text-sm font-semibold text-default-900">
                  Rp 25.000
                </h5>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-600">
                  Total Pembayaran
                </p>
                <h5 className="text-[24px] font-semibold text-rose-500">
                  Rp 417.000
                </h5>
              </div>
            </div>
          </div>

          {/* ==== right content ==== */}
          <div className="flex flex-col gap-4 overflow-y-scroll">
            <h4 className="text-lg font-semibold text-default-900">
              Informasi Tambahan
            </h4>

            <div className="flex h-full flex-col justify-between gap-4">
              <div className="grid gap-4">
                <Input
                  type="number"
                  variant="flat"
                  color="default"
                  label="No. Telp"
                  labelPlacement="outside"
                  placeholder="08xxxxxxxxxxx"
                />

                <Textarea
                  maxRows={3}
                  variant="flat"
                  color="default"
                  label="Keterangan"
                  labelPlacement="outside"
                  placeholder="Masukan keterangan"
                />

                <Textarea
                  maxRows={3}
                  variant="flat"
                  color="default"
                  label="Alamat"
                  labelPlacement="outside"
                  placeholder="Masukan alamat lengkap"
                />
              </div>

              <PopupContinuePayment />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
