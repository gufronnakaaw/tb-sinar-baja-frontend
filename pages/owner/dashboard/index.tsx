import { Basket, Money } from "@phosphor-icons/react";

// components
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";

export default function DashboardPage() {
  return (
    <Layout title="Dashboard Owner">
      <Container>
        <section className="grid grid-cols-3 gap-4">
          <div className="grid h-[150px] w-full rounded-xl bg-white p-6 shadow-[2px_2px_12px_rgba(0,0,0,0.15)]">
            <div className="inline-flex items-center gap-2">
              <div className="aspect-square rounded-lg bg-green-100 p-2">
                <Money weight="bold" size={24} className="text-green-600" />
              </div>
              <p className="font-medium text-default-600">Total Keuntungan</p>
            </div>

            <h6 className="text-default-900-900 justify-self-center text-3xl font-semibold">
              Rp1.186.917
            </h6>
          </div>

          <div className="grid h-[150px] w-full rounded-xl bg-white p-6 shadow-[2px_2px_12px_rgba(0,0,0,0.15)]">
            <div className="inline-flex items-center gap-2">
              <div className="aspect-square rounded-lg bg-red-100 p-2">
                <Money weight="bold" size={24} className="text-red-600" />
              </div>
              <p className="font-medium text-default-600">Laba Kotor</p>
            </div>

            <h6 className="text-default-900-900 justify-self-center text-3xl font-semibold">
              Rp2.819.109
            </h6>
          </div>

          <div className="grid h-[150px] w-full rounded-xl bg-white p-6 shadow-[2px_2px_12px_rgba(0,0,0,0.15)]">
            <div className="inline-flex items-center gap-2">
              <div className="aspect-square rounded-lg bg-orange-100 p-2">
                <Basket weight="bold" size={24} className="text-orange-500" />
              </div>
              <p className="font-medium text-default-600">
                Barang Rusak/Hilang
              </p>
            </div>

            <h6 className="text-default-900-900 justify-self-center text-3xl font-semibold">
              12
            </h6>
          </div>
        </section>
      </Container>
    </Layout>
  );
}
