import LossTable from "@/components/tables/LossTable";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";
import { formatDayWithoutTime } from "@/utils/formatDate";
import { formatRupiah } from "@/utils/formatRupiah";
import { Button } from "@nextui-org/react";
import { ArrowRight } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

export default function LossPage() {
  const [time, setTime] = useState(new Date());
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);

    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (num: any) => String(num).padStart(2, "0");

  if (!client) {
    return;
  }

  return (
    <Layout title="Loss Page">
      <Container className="gap-8">
        <h4 className="text-lg font-semibold capitalize text-default-900">
          Kerugian
        </h4>

        <div className="grid justify-center justify-items-center gap-4 rounded-xl border-[2px] border-default-200 p-8">
          <div className="text-center">
            <h4 className="text-sm font-medium text-default-900">
              Total kerugian hari ini,
            </h4>
            <p className="text-[12px] font-medium text-teal-500">
              {formatDayWithoutTime(new Date())}{" "}
              {`${formatTime(time.getHours())}:${formatTime(time.getMinutes())} WIB`}
            </p>
          </div>

          <div className="py-2 text-[42px] font-bold text-default-900">
            {formatRupiah(28112039)}
          </div>

          <Button
            color="default"
            variant="flat"
            size="sm"
            endContent={<ArrowRight weight="bold" size={18} />}
            className="w-max px-6 font-semibold"
          >
            Detail Kerugian
          </Button>
        </div>

        <div className="grid gap-3">
          <h6 className="text-sm font-semibold text-default-900">
            Kerugian 7 Hari Terakhir
          </h6>

          <LossTable />
        </div>
      </Container>
    </Layout>
  );
}
