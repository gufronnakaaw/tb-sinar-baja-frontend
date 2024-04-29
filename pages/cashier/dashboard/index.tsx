import { Button } from "@nextui-org/react";
import { ArrowRight } from "@phosphor-icons/react";
import { useRouter } from "next/router";

// components
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";

export default function DashboardPage() {
  const router = useRouter();

  return (
    <Layout title="Dashboard Kasir">
      <Container className="flex justify-center">
        <Button
          endContent={<ArrowRight weight="bold" size={18} />}
          onClick={() => router.push("/cashier/menu")}
          className="bg-rose-500 font-medium text-white"
        >
          Lihat Menu Kasir
        </Button>
      </Container>
    </Layout>
  );
}
