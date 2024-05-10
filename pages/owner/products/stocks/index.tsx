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

import { ProductsType, products } from "@/_dummy/products";

export default function ProductsStocksPage() {
  const { page, pages, data, setPage } = usePagination(products, 10);

  const columns = [
    { name: "ID Produk", uid: "products_id", sortable: false },
    { name: "Nama", uid: "nama", sortable: true },
    { name: "Kategori", uid: "kategori", sortable: true },
    { name: "Stok", uid: "stok", sortable: true },
    { name: "Aksi", uid: "action", sortable: false },
  ];

  const renderCell = (products: ProductsType, columnKey: React.Key) => {
    const cellValue = products[columnKey as keyof ProductsType];

    switch (columnKey) {
      case "products_id":
        return <div className="text-default-900">{products.id}</div>;
      case "nama":
        return (
          <div className="line-clamp-1 w-max max-w-[250px] text-default-900">
            {products.nama}
          </div>
        );
      case "kategori":
        return (
          <div className="w-max text-default-900">{products.kategori}</div>
        );
      case "stok":
        return <div className="text-default-900">{products.stok}</div>;
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
    <Layout title="Stok Produk">
      <Container className="gap-8">
        <h4 className="text-lg font-semibold text-default-900">Stok Produk</h4>

        <div className="grid gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <InputSearchBar
              placeholder="Cari produk..."
              className="w-full sm:max-w-[500px]"
            />

            <Button
              variant="solid"
              color="primary"
              className="w-full font-medium sm:w-max"
            >
              Tambah Stok
            </Button>
          </div>

          <Table
            isHeaderSticky
            aria-label="products table"
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
              {(products) => (
                <TableRow key={products.id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(products, columnKey)}</TableCell>
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
