import { useRouter } from "next/router";

// components
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";

export default function DashboardPage() {
  const router = useRouter();

  return (
    <Layout title="Dashboard Kasir">
      <Container className="flex justify-center">
        <div>cashier dashboard page</div>
      </Container>
    </Layout>
  );
}
