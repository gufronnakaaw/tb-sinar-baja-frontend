import { Button, Link } from "@nextui-org/react";
import { ArrowLeft, ListNumbers, PlusCircle } from "@phosphor-icons/react";
import { useRouter } from "next/router";

// components
import Layout from "@/components/wrapper/SecondaryLayout";

export default function MenuPage() {
  const router = useRouter();

  return (
    <Layout title="Menu Kasir">
      <section className="py-24">
        <div className="container grid gap-16">
          <Button
            as={Link}
            variant="light"
            color="default"
            size="sm"
            startContent={<ArrowLeft weight="bold" size={16} />}
            onClick={() => router.push("/cashier/dashboard")}
            className="my-16 w-max font-medium"
          >
            Kembali ke Dashboard
          </Button>

          <div className="grid w-[450px] grid-cols-2 grid-rows-2 gap-x-2 gap-y-6 justify-self-center">
            <Button
              variant="bordered"
              size="lg"
              endContent={
                <ListNumbers
                  weight="bold"
                  size={20}
                  className="text-rose-500"
                />
              }
              onClick={() => router.push("/cashier/menu/transaction")}
              className="border-rose-500 font-medium text-rose-500"
            >
              Daftar Transaksi
            </Button>

            <Button
              size="lg"
              endContent={<PlusCircle weight="bold" size={20} />}
              onClick={() => router.push("/cashier/menu/selling")}
              className="bg-rose-500 font-medium text-white"
            >
              Penjualan
            </Button>

            <Button
              variant="light"
              color="danger"
              size="lg"
              onClick={() => {
                if (confirm("Apakah anda ingin melakukan penutupan?")) {
                  router.push("/cashier/menu/closing");
                }
              }}
              className="col-span-2 font-medium"
            >
              Penutupan
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
