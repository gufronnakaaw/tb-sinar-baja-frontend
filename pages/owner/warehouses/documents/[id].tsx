import { Button } from "@nextui-org/react";
import { Printer } from "@phosphor-icons/react";
import { useRouter } from "next/router";

// components
import ButtonBack from "@/components/button/ButtonBack";
// import TemplateSuratJalan from "@/components/template/TemplateSuratJalan";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";

export default function DocumentDetails() {
  const router = useRouter();

  return (
    <Layout title="Detail Dokumen">
      <Container className="gap-8">
        <div className="flex items-center justify-between gap-4">
          <ButtonBack
            onClick={() => router.push("/owner/warehouses/documents")}
          >
            Kembali
          </ButtonBack>

          <Button
            variant="solid"
            color="primary"
            endContent={<Printer weight="bold" size={17} />}
            onClick={() => router.push("/nota")}
            className="font-semibold"
          >
            Cetak Surat Jalan
          </Button>
        </div>

        {/* <TemplateSuratJalan /> */}
      </Container>
    </Layout>
  );
}
