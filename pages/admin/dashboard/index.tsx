import { Button } from "@nextui-org/react";
import {
  ArrowRight,
  HandCoins,
  ImageBroken,
  Money,
  Package,
} from "@phosphor-icons/react";

// components
import StatusStock from "@/components/status/StatusStock";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";

export default function DashboardPage() {
  return (
    <Layout title="Dashboard Admin">
      <Container>
        <section className="grid gap-12">
          <StatusStock text="stok menipis" />

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

              <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-6">
                <div className="inline-flex items-center gap-2">
                  <div className="aspect-square rounded-lg bg-gray-200 p-2">
                    <HandCoins
                      weight="bold"
                      size={20}
                      className="text-gray-600"
                    />
                  </div>
                  <p className="text-sm font-medium text-default-600">
                    Pembayaran Lunas
                  </p>
                </div>

                <h6 className="text-2xl font-semibold text-default-900">
                  Rp2.182.572
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
                    <Package
                      weight="bold"
                      size={20}
                      className="text-gray-600"
                    />
                  </div>
                  <p className="text-sm font-medium text-default-600">
                    Konsinyasi
                  </p>
                </div>

                <h6 className="text-2xl font-semibold text-default-900">18</h6>

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
        </section>
      </Container>
    </Layout>
  );
}
