import { Button } from "@nextui-org/react";
import {
  ClipboardText,
  Money,
  SquaresFour,
  XCircle,
} from "@phosphor-icons/react";
import { useRouter } from "next/router";

// components
import Layout from "@/components/wrapper/SecondaryLayout";

export default function MenuPage() {
  const router = useRouter();

  return (
    <Layout title="Menu Kasir">
      <section className="flex h-screen items-center justify-center">
        <div className="container grid max-w-[550px] grid-cols-2 grid-rows-3 gap-x-3 gap-y-6">
          <Button
            variant="bordered"
            endContent={<SquaresFour weight="bold" size={24} />}
            onClick={() => router.push("/cashier/dashboard")}
            className="border-rose-500 py-10 text-base font-semibold text-rose-500"
          >
            Dashboard
          </Button>

          <Button
            variant="solid"
            endContent={<Money weight="bold" size={24} />}
            onClick={() => router.push("/cashier/menu/selling")}
            className="bg-rose-500 py-10 text-base font-semibold text-white"
          >
            Penjualan
          </Button>

          <Button
            variant="flat"
            color="default"
            endContent={<ClipboardText weight="bold" size={24} />}
            onClick={() => router.push("/cashier/menu/transaction")}
            className="col-span-2 py-10 text-base font-semibold"
          >
            Daftar Transaksi
          </Button>

          <Button
            variant="flat"
            color="danger"
            endContent={<XCircle weight="bold" size={24} />}
            onClick={() => {
              if (confirm("Apakah anda ingin melakukan penutupan?")) {
                router.push("/cashier/menu/closing");
              }
            }}
            className="col-span-2 py-10 text-base font-semibold"
          >
            Penutupan
          </Button>
        </div>
      </section>
    </Layout>
  );
}
