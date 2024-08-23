import ReceivableTable from "@/components/tables/ReceivableTable";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";
import { formatDayWithoutTime } from "@/utils/formatDate";
import { formatRupiah } from "@/utils/formatRupiah";

export default function ReceivablePage() {
  return (
    <Layout title="Receivable Page">
      <Container className="gap-8">
        <h4 className="text-lg font-semibold capitalize text-default-900">
          Piutang Anda 🪙
        </h4>

        <div className="grid justify-center justify-items-center gap-4 rounded-xl border-[2px] border-default-200 p-8">
          <div className="text-center">
            <h4 className="text-sm font-medium text-default-900">
              Uang yang telah anda pinjamkan,
            </h4>
            <p className="text-[12px] font-medium text-primary">
              {formatDayWithoutTime(new Date())}
            </p>
          </div>

          <div className="text-[42px] font-bold text-default-900">
            {formatRupiah(28192836)}
          </div>
        </div>

        <div className="grid gap-3">
          <h6 className="text-sm font-semibold text-default-900">
            Daftar Pembelian Tempo
          </h6>

          <ReceivableTable />
        </div>
      </Container>
    </Layout>
  );
}
