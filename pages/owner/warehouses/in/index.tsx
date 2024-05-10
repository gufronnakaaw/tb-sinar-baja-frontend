import {
  Button,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { Eye, Pencil, Trash } from "@phosphor-icons/react";

// components
import InputSearchBar from "@/components/input/InputSearchBar";
import CustomTooltip from "@/components/tooltip";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";

// utils
import usePagination from "@/hooks/usepagination";
import { customStyleTable } from "@/utils/customStyleTable";

import { warehouseIn, WarehouseInType } from "@/_dummy/warehouses";

export default function WarehousesInPage() {
  const { page, pages, data, setPage } = usePagination(warehouseIn, 10);

  const columns = [
    { name: "Produk", uid: "product", sortable: false },
    { name: "Total", uid: "total", sortable: true },
    { name: "Dari", uid: "from", sortable: true },
    { name: "Dikirim Pada", uid: "created_at", sortable: true },
    { name: "Aksi", uid: "action", sortable: false },
  ];

  const renderCell = (warehouseIn: WarehouseInType, columnKey: React.Key) => {
    const cellValue = warehouseIn[columnKey as keyof WarehouseInType];

    switch (columnKey) {
      case "product":
        return (
          <CustomTooltip content={warehouseIn.product}>
            <div className="line-clamp-1 w-max max-w-[250px] text-default-900">
              {warehouseIn.product}
            </div>
          </CustomTooltip>
        );
      case "total":
        return <div className="text-default-900">{warehouseIn.total}</div>;
      case "from":
        return <div className="w-max text-default-900">{warehouseIn.from}</div>;
      case "created_at":
        return (
          <div className="w-max text-default-900">{warehouseIn.created_at}</div>
        );
      case "action":
        return (
          <div className="flex max-w-[110px] items-center gap-1">
            <CustomTooltip content="Detail">
              <Button isIconOnly variant="light" size="sm">
                <Eye weight="bold" size={20} className="text-default-600" />
              </Button>
            </CustomTooltip>

            <CustomTooltip content="Edit">
              <Button isIconOnly variant="light" size="sm">
                <Pencil weight="bold" size={20} className="text-default-600" />
              </Button>
            </CustomTooltip>

            <CustomTooltip content="Hapus">
              <Button isIconOnly variant="light" color="danger" size="sm">
                <Trash weight="bold" size={20} />
              </Button>
            </CustomTooltip>
          </div>
        );

      default:
        return cellValue;
    }
  };

  return (
    <Layout title="Barang Masuk">
      <Container className="gap-8">
        <h4 className="text-lg font-semibold text-default-900">Barang Masuk</h4>

        <div className="grid gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <InputSearchBar
              placeholder="Cari barang..."
              className="w-full sm:max-w-[500px]"
            />

            <Button
              variant="solid"
              color="primary"
              className="w-full font-medium sm:w-max"
            >
              Tambah Barang Masuk
            </Button>
          </div>

          <Table
            isHeaderSticky
            aria-label="warehouseIn table"
            color="primary"
            selectionMode="single"
            classNames={customStyleTable}
            className="scrollbar-hide"
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.uid}>{column.name}</TableColumn>
              )}
            </TableHeader>

            <TableBody items={data}>
              {(warehouseIn) => (
                <TableRow key={warehouseIn.product}>
                  {(columnKey) => (
                    <TableCell>{renderCell(warehouseIn, columnKey)}</TableCell>
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
          />
        </div>
      </Container>
    </Layout>
  );
}
