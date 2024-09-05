import CustomTooltip from "@/components/tooltip";
import { ProfitType } from "@/types/profit.type";
import { customStyleTable } from "@/utils/customStyleTable";
import { formatDateWithoutTime } from "@/utils/formatDate";
import { formatRupiah } from "@/utils/formatRupiah";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { Eye } from "@phosphor-icons/react";
import { useRouter } from "next/router";

export default function ProfitTable({
  profit,
  role,
}: {
  profit: ProfitType;
  role: "owner" | "admin";
}) {
  const router = useRouter();

  const columnsProfit = [
    { name: "Tanggal", uid: "date" },
    { name: "Omzet", uid: "omzet" },
    { name: "Aksi", uid: "action" },
  ];

  function renderCellProfit(
    item: {
      tanggal: string;
      total: number;
    },
    columnKey: React.Key,
  ) {
    const cellValue =
      item[
        columnKey as keyof {
          tanggal: string;
          total: number;
        }
      ];

    switch (columnKey) {
      case "date":
        return (
          <div className="w-max text-default-900">
            {formatDateWithoutTime(item.tanggal)}
          </div>
        );
      case "omzet":
        return (
          <div className="w-max font-medium text-default-900">
            {formatRupiah(item.total)}
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
                onClick={() =>
                  router.push(`/${role}/finance/omzet/${item.tanggal}`)
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
    <>
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

        <TableBody items={profit.last_week}>
          {(item) => (
            <TableRow key={item.tanggal}>
              {(columnKey) => (
                <TableCell>{renderCellProfit(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
