import { Button } from "@nextui-org/react";
import {
  ArrowRight,
  ChartLineDown,
  Coins,
  HandCoins,
  HourglassMedium,
  ImageBroken,
  Money,
} from "@phosphor-icons/react";

// components
import LoadingScreen from "@/components/LoadingScreen";
import StatusStock from "@/components/status/StatusStock";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";
import { DashboardType } from "@/types/dashboard.type";
import { GlobalResponse } from "@/types/global.type";
import { formatRupiah } from "@/utils/formatRupiah";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function DashboardPage() {
  const router = useRouter();

  const {
    data: dashboard,
    error,
    isLoading,
  } = useSWR<GlobalResponse<DashboardType>>({
    url: "/dashboard",
    method: "GET",
  });

  if (isLoading) {
    return <LoadingScreen role="owner" />;
  }

  if (error) {
    console.log(error);
    return alert("terjadi kesalahan saat mendapatkan data dashboard");
  }

  return (
    <Layout title="Dashboard Owner">
      <Container>
        <section className="grid gap-12">
          <StatusStock text={dashboard?.data.status_stok as string} />

          <div className="grid gap-4">
            <h4 className="text-lg font-semibold text-default-900">
              Ringkasan Toko
            </h4>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 xl:grid-cols-3">
              <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-6">
                <div className="inline-flex items-center gap-2">
                  <div className="aspect-square rounded-lg bg-gray-200 p-2">
                    <Money weight="bold" size={20} className="text-gray-600" />
                  </div>
                  <p className="text-sm font-medium text-default-600">Omzet</p>
                </div>

                <h6 className="text-2xl font-semibold text-default-900">
                  {formatRupiah(dashboard?.data.omzet as number)}
                </h6>

                <Button
                  variant="light"
                  size="sm"
                  endContent={<ArrowRight weight="bold" size={14} />}
                  className="w-max self-end font-medium text-default-600"
                  onClick={() => router.push("/owner/finance/omzet")}
                >
                  Selengkapnya
                </Button>
              </div>

              <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-6">
                <div className="inline-flex items-center gap-2">
                  <div className="aspect-square rounded-lg bg-gray-200 p-2">
                    <HourglassMedium
                      weight="bold"
                      size={20}
                      className="text-gray-600"
                    />
                  </div>
                  <p className="text-sm font-medium text-default-600">
                    Laba Kotor
                  </p>
                </div>

                <h6 className="text-2xl font-semibold text-default-900">
                  {formatRupiah(dashboard?.data.laba_kotor as number)}
                </h6>

                <Button
                  variant="light"
                  size="sm"
                  endContent={<ArrowRight weight="bold" size={14} />}
                  className="w-max self-end font-medium text-default-600"
                  onClick={() => alert("dalam tahap pengembangan")}
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

                <h6 className="text-2xl font-semibold text-default-900">
                  {dashboard?.data.barang_rusak}
                </h6>

                <Button
                  variant="light"
                  size="sm"
                  endContent={<ArrowRight weight="bold" size={14} />}
                  className="w-max self-end font-medium text-default-600"
                  onClick={() => router.push("/owner/warehouses/broken")}
                >
                  Selengkapnya
                </Button>
              </div>

              <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-6">
                <div className="inline-flex items-center gap-2">
                  <div className="aspect-square rounded-lg bg-gray-200 p-2">
                    <Coins weight="bold" size={20} className="text-gray-600" />
                  </div>
                  <p className="text-sm font-medium text-default-600">Hutang</p>
                </div>

                <h6 className="text-2xl font-semibold text-default-900">
                  {formatRupiah(dashboard?.data.hutang as number)}
                </h6>

                <Button
                  variant="light"
                  size="sm"
                  endContent={<ArrowRight weight="bold" size={14} />}
                  className="w-max self-end font-medium text-default-600"
                  onClick={() => router.push("/owner/finance/debt")}
                >
                  Selengkapnya
                </Button>
              </div>

              <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-6">
                <div className="inline-flex items-center gap-2">
                  <div className="aspect-square rounded-lg bg-gray-200 p-2">
                    <ChartLineDown
                      weight="bold"
                      size={20}
                      className="text-gray-600"
                    />
                  </div>
                  <p className="text-sm font-medium text-default-600">
                    Estimasi Rugi
                  </p>
                </div>

                <h6 className="text-2xl font-semibold text-default-900">
                  {formatRupiah(dashboard?.data.estimasi_rugi as number)}
                </h6>

                <Button
                  variant="light"
                  size="sm"
                  endContent={<ArrowRight weight="bold" size={14} />}
                  className="w-max self-end font-medium text-default-600"
                  onClick={() => router.push("/owner/finance/loss")}
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
                    Piutang
                  </p>
                </div>

                <h6 className="text-2xl font-semibold text-default-900">
                  {formatRupiah(dashboard?.data.piutang as number)}
                </h6>

                <Button
                  variant="light"
                  size="sm"
                  endContent={<ArrowRight weight="bold" size={14} />}
                  className="w-max self-end font-medium text-default-600"
                  onClick={() => router.push("/owner/finance/receivable")}
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
