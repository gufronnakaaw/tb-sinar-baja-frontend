import DebtTable from "@/components/tables/DebtTable";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";
import { formatDayWithoutTime } from "@/utils/formatDate";
import { formatRupiah } from "@/utils/formatRupiah";

export default function DebtPage() {
  return (
    <Layout title="Debt Page">
      <Container className="gap-8">
        <h4 className="text-lg font-semibold capitalize text-default-900">
          Hutang Anda 💸
        </h4>

        <div className="grid justify-center justify-items-center gap-4 rounded-xl border-[2px] border-default-200 p-8">
          <div className="text-center">
            <h4 className="text-sm font-medium text-default-900">
              Total uang yang belum anda bayarkan,
            </h4>
            <p className="text-[12px] font-medium text-teal-500">
              {formatDayWithoutTime(new Date())}
            </p>
          </div>

          <div className="text-[42px] font-bold text-default-900">
            {formatRupiah(31997201)}
          </div>
        </div>

        <div className="grid gap-3">
          <h6 className="text-sm font-semibold text-default-900">
            Daftar Hutang
          </h6>

          <DebtTable />
        </div>
      </Container>
    </Layout>
  );
}
