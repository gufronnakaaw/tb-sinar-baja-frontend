import ButtonBack from "@/components/button/ButtonBack";
import { TemplatePenawaran } from "@/components/template/TemplatePenawaran";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";
import { GlobalResponse } from "@/types/global.type";
import { PenawaranDetail } from "@/types/preorders.type";
import { fetcher } from "@/utils/fetcher";
import { Button } from "@nextui-org/react";
import { Check, Printer, SealCheck } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export const getServerSideProps = (async ({ query }) => {
  const penawaran: GlobalResponse<PenawaranDetail> = await fetcher({
    url: "/penawaran?id_penawaran=" + query?.id_penawaran,
    method: "GET",
  });

  return {
    props: {
      penawaran: penawaran.data,
    },
  };
}) satisfies GetServerSideProps<{ penawaran: PenawaranDetail }>;

export default function OffersDetail({
  penawaran,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: penawaran.id_penawaran,
    content: () => componentRef.current,
  });

  async function updateStatus() {
    if (!confirm("apakah anda yakin ingin menyelesaikan ini?")) return;

    try {
      await fetcher({
        url: "/penawaran/status",
        method: "PATCH",
        data: {
          id_penawaran: penawaran.id_penawaran,
          status: "selesai",
        },
      });
      alert("ubah status berhasil");
      return router.reload();
    } catch (error) {
      alert("ups sepertinya ada masalah pada server");
      console.log(error);
    }
  }

  return (
    <Layout title={`Detail Permintaan ${penawaran.id_penawaran}`}>
      <Container className="gap-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <ButtonBack
            onClick={() => router.back()}
            className="justify-self-start text-teal-500"
          >
            Kembali
          </ButtonBack>

          <div className="flex items-center gap-4 justify-self-end">
            {penawaran.status == "pending" ? (
              <Button
                variant="solid"
                color="success"
                endContent={<Check weight="bold" size={17} />}
                className="font-medium text-white"
                onClick={updateStatus}
              >
                Selesai
              </Button>
            ) : (
              <div className="flex items-center gap-1">
                <SealCheck className="text-success" weight="fill" size={20} />
                <span className="text-sm font-medium text-default-600">
                  Telah Diselesaikan
                </span>
              </div>
            )}

            <Button
              startContent={<Printer weight="bold" size={17} />}
              className="w-max bg-teal-500 font-medium text-white"
              onClick={handlePrint}
            >
              Cetak
            </Button>
          </div>
        </div>

        <TemplatePenawaran {...penawaran} ref={componentRef} />
      </Container>
    </Layout>
  );
}
