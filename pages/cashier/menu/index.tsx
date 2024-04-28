import { Button } from "@nextui-org/react";
import { ListNumbers, PlusCircle } from "@phosphor-icons/react";

// components
import Layout from "@/components/wrapper/SecondaryLayout";

export default function MenuPage() {
  return (
    <Layout title="Menu Kasir">
      <section className="container flex h-screen items-center justify-center">
        <div className="grid w-[450px] grid-cols-2 grid-rows-2 gap-x-2 gap-y-6">
          <Button
            variant="bordered"
            size="lg"
            endContent={
              <ListNumbers weight="bold" size={24} className="text-cyan-600" />
            }
            className="border-cyan-600 font-medium text-cyan-600"
          >
            Daftar Transaksi
          </Button>

          <Button
            size="lg"
            endContent={<PlusCircle weight="bold" size={24} />}
            className="bg-cyan-600 font-medium text-white"
          >
            Penjualan
          </Button>

          <Button
            variant="flat"
            color="danger"
            size="lg"
            onClick={() => confirm("Apakah anda ingin melakukan penutupan?")}
            className="col-span-2 font-medium"
          >
            Penutupan
          </Button>
        </div>
      </section>
    </Layout>
  );
}
