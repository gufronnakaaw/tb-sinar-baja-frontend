import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";

// components
import ButtonBack from "@/components/button/ButtonBack";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";

// utils
import CustomTooltip from "@/components/tooltip";
import { GlobalResponse } from "@/types/global.type";
import { ProfitDetail } from "@/types/profit.type";
import { customStyleTable } from "@/utils/customStyleTable";
import { fetcher } from "@/utils/fetcher";
import { formatDate } from "@/utils/formatDate";
import { formatRupiah } from "@/utils/formatRupiah";
import { Eye } from "@phosphor-icons/react";

export default function DetailOmzet({
  profit,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const columnsProfit = [
    { name: "ID Transaksi", uid: "id_transaksi" },
    { name: "Total", uid: "total_pembayaran" },
    { name: "Tanggal", uid: "created_at" },
    { name: "Aksi", uid: "action" },
  ];

  function renderCellProfit(item: ProfitDetail, columnKey: React.Key) {
    const cellValue = item[columnKey as keyof ProfitDetail];

    switch (columnKey) {
      case "id_transaksi":
        return (
          <div className="w-max text-default-900">{item.id_transaksi}</div>
        );
      case "total_pembayaran":
        return (
          <div className="w-max font-medium text-default-900">
            {formatRupiah(item.total_pembayaran)}
          </div>
        );
      case "created_at":
        return (
          <div className="w-max font-medium text-default-900">
            {formatDate(item.created_at)}
          </div>
        );
      case "action":
        return (
          <div className="flex max-w-[110px] items-center gap-1">
            <CustomTooltip content="Detail">
              <Button
                isIconOnly
                variant="light"
                size="sm"
                onClick={(e) =>
                  router.push(`/admin/selling/histories/${item.id_transaksi}`)
                }
              >
                <Eye weight="bold" size={20} className="text-default-600" />
              </Button>
            </CustomTooltip>
          </div>
        );

      default:
        return cellValue;
    }
  }
  return (
    <Layout title="Detail Halaman Omzet">
      <Container className="gap-12">
        <ButtonBack
          onClick={() => router.back()}
          className="justify-self-start text-teal-500"
        >
          Kembali
        </ButtonBack>

        <Table
          aria-label="profit table"
          color="primary"
          selectionMode="none"
          classNames={customStyleTable}
          className="scrollbar-hide"
        >
          <TableHeader columns={columnsProfit}>
            {(column) => (
              <TableColumn key={column.uid}>{column.name}</TableColumn>
            )}
          </TableHeader>

          <TableBody items={profit} emptyContent="Tidak ada transaksi">
            {(item) => (
              <TableRow key={item.id_transaksi}>
                {(columnKey) => (
                  <TableCell>{renderCellProfit(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Container>
    </Layout>
  );
}

export const getServerSideProps = (async ({ params }) => {
  const result: GlobalResponse<ProfitDetail[]> = await fetcher({
    url: `/keuangan/omzet?date=${params?.date as string}`,
    method: "GET",
  });

  return {
    props: {
      profit: result.data,
    },
  };
}) satisfies GetServerSideProps<{
  profit: ProfitDetail[];
}>;
