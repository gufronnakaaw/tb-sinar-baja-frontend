import usePagination from "@/hooks/usepagination";
import { FinalType } from "@/types/preorders.type";
import { customStyleTable } from "@/utils/customStyleTable";
import { formatDate } from "@/utils/formatDate";
import { formatRupiah } from "@/utils/formatRupiah";
import {
  Button,
  Chip,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { Eye } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import CustomTooltip from "../tooltip";

export default function FinalTable({
  final,
  role,
}: {
  final: FinalType[] | undefined;
  role: string;
}) {
  const { page, pages, data, setPage } = usePagination(final ? final : [], 10);

  const router = useRouter();

  const columnsFinal = [
    { name: "ID Preorder", uid: "id_preorder" },
    { name: "Tujuan", uid: "tujuan" },
    { name: "Sumber", uid: "sumber" },
    { name: "Status", uid: "status" },
    { name: "Total", uid: "total" },
    { name: "Dibuat Pada", uid: "created_at" },
    { name: "Aksi", uid: "action" },
  ];

  function getStatus(status: string) {
    if (status == "kosong") {
      return {
        text: "Invoice Kosong",
        classname: "bg-danger-100 text-danger",
      };
    }

    if (status == "hutang") {
      return {
        text: "Unpaid",
        classname: "bg-danger-100 text-danger",
      };
    }

    if (status == "pembayaran") {
      return {
        text: "Paid",
        classname: "bg-warning-100 text-warning",
      };
    }

    if (status == "lunas") {
      return {
        text: "lunas",
        classname: "bg-success-100 text-success",
      };
    }
  }

  function renderCellFinal(item: FinalType, columnKey: React.Key) {
    const cellValue = item[columnKey as keyof FinalType];

    switch (columnKey) {
      case "id_preorder":
        return <div className="text-default-900">{item.id_preorder}</div>;
      case "tujuan":
        return (
          <div className="w-max text-default-900">{item.nama_supplier}</div>
        );
      case "sumber":
        return (
          <div className="w-max capitalize text-default-900">
            {item.sumber.split("_").join(" ")}
          </div>
        );
      case "status":
        return (
          <div className="w-max text-default-900">
            <Chip
              variant="flat"
              size="sm"
              classNames={{
                base: "px-3",
                content: "font-semibold capitalize",
              }}
              className={getStatus(item.status)?.classname}
            >
              {getStatus(item.status)?.text}
            </Chip>
          </div>
        );
      case "total":
        return (
          <div className="w-max text-default-900">
            {formatRupiah(item.total)}
          </div>
        );
      case "created_at":
        return (
          <div className="w-max text-default-900">
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
                onClick={() =>
                  router.push(
                    `/${role}/preorders/out/detail?id_preorder=${item.id_preorder}`,
                  )
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
        isHeaderSticky
        aria-label="po table"
        color="primary"
        selectionMode="none"
        classNames={customStyleTable}
        className="scrollbar-hide"
      >
        <TableHeader columns={columnsFinal}>
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>

        <TableBody items={data} emptyContent="Preorder tidak ditemukan!">
          {(item) => (
            <TableRow key={item.id_preorder}>
              {(columnKey) => (
                <TableCell>{renderCellFinal(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Pagination
        isCompact
        showControls
        color="primary"
        page={page}
        total={pages}
        onChange={setPage}
        className="justify-self-center"
        classNames={{
          cursor: role == "owner" ? "bg-primary" : "bg-teal-500",
        }}
      />
    </>
  );
}
