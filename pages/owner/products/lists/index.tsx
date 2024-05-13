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
import PopupImportProducts from "@/components/popup/PopupImportProducts";
import CustomTooltip from "@/components/tooltip";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";

// utils
import usePagination from "@/hooks/usepagination";
import { customStyleTable } from "@/utils/customStyleTable";
import { formatRupiah } from "@/utils/formatRupiah";

import { ProductsType, products } from "@/_dummy/products";

export default function ProductsListsPage() {
  const { page, pages, data, setPage } = usePagination(products, 10);

  const columns = [
    { name: "ID Produk", uid: "products_id", sortable: false },
    { name: "Nama", uid: "nama", sortable: true },
    { name: "Kategori", uid: "kategori", sortable: true },
    { name: "Harga Umum", uid: "harga_umum", sortable: true },
    { name: "Harga Reseller", uid: "harga_reseller", sortable: true },
    { name: "Harga Agen", uid: "harga_agen", sortable: true },
    { name: "Harga Diskon", uid: "harga_diskon", sortable: true },
    { name: "Dibuat Pada", uid: "created_at", sortable: true },
    { name: "Aksi", uid: "action", sortable: false },
  ];

  const renderCell = (products: ProductsType, columnKey: React.Key) => {
    const cellValue = products[columnKey as keyof ProductsType];

    switch (columnKey) {
      case "products_id":
        return <div className="text-default-900">{products.id}</div>;
      case "nama":
        return (
          <CustomTooltip content={products.nama}>
            <div className="line-clamp-1 w-max max-w-[250px] text-default-900">
              {products.nama}
            </div>
          </CustomTooltip>
        );
      case "kategori":
        return (
          <div className="w-max text-default-900">{products.kategori}</div>
        );
      case "harga_umum":
        return (
          <div className="text-default-900">
            {formatRupiah(products.harga_umum)}
          </div>
        );
      case "harga_reseller":
        return (
          <div className="text-default-900">
            {formatRupiah(products.harga_reseller)}
          </div>
        );
      case "harga_agen":
        return (
          <div className="text-default-900">
            {formatRupiah(products.harga_agen)}
          </div>
        );
      case "harga_diskon":
        return (
          <div className="text-default-900">
            {formatRupiah(products.harga_diskon)}
          </div>
        );
      case "created_at":
        return (
          <div className="w-max text-default-900">{products.created_at}</div>
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
    <Layout title="Stok Produk">
      <Container className="gap-8">
        <h4 className="text-lg font-semibold text-default-900">
          Daftar Produk
        </h4>

        <div className="grid gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <InputSearchBar
              placeholder="Cari produk..."
              className="w-full sm:max-w-[500px]"
            />

            <PopupImportProducts />
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
