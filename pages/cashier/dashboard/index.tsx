import { Button } from "@nextui-org/react";
import {
  ArrowLeft,
  ArrowRight,
  ImageBroken,
  Money,
} from "@phosphor-icons/react";

// components
import StatusStock from "@/components/status/StatusStock";
import Layout from "@/components/wrapper/SecondaryLayout";
import { useRouter } from "next/router";

export default function DashboardPage() {
  const router = useRouter();

  return (
    <Layout title="Dashboard Kasir">
      <section className="py-24">
        <div className="container mt-8 grid gap-12">
          <Button
            variant="light"
            color="danger"
            size="sm"
            startContent={<ArrowLeft weight="bold" size={16} />}
            onClick={() => router.push("/cashier/menu")}
            className="w-max font-semibold"
          >
            Kembali ke Menu
          </Button>

          <StatusStock text="stok habis" />

          <div className="grid gap-4">
            <h4 className="text-lg font-semibold text-default-900">
              Ringkasan Toko
            </h4>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 xl:grid-cols-2">
              <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-6">
                <div className="inline-flex items-center gap-2">
                  <div className="aspect-square rounded-lg bg-gray-200 p-2">
                    <Money weight="bold" size={20} className="text-gray-600" />
                  </div>
                  <p className="text-sm font-medium text-default-600">Omzet</p>
                </div>

                <h6 className="text-2xl font-semibold text-default-900">
                  Rp1.186.917
                </h6>

                <Button
                  variant="light"
                  size="sm"
                  endContent={<ArrowRight weight="bold" size={14} />}
                  className="w-max self-end font-medium text-default-600"
                >
                  Selengkapnya
                </Button>
              </div>

              <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-6">
                <div className="inline-flex items-center gap-2">
                  <div className="aspect-square rounded-lg bg-gray-200 p-2">
                    <ImageBroken
                      weight="bold"
                      size={20}
                      className="text-gray-600"
                    />
                  </div>
                  <p className="text-sm font-medium text-default-600">
                    Barang Rusak/Hilang
                  </p>
                </div>

                <h6 className="text-2xl font-semibold text-default-900">12</h6>

                <Button
                  variant="light"
                  size="sm"
                  endContent={<ArrowRight weight="bold" size={14} />}
                  className="w-max self-end font-medium text-default-600"
                >
                  Selengkapnya
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
