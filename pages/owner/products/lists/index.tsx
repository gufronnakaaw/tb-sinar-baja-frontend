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

// components
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";

// utils
import { ProductsType, products } from "@/_dummy/products";
import InputSearchBar from "@/components/input/InputSearchBar";
import usePagination from "@/hooks/usepagination";
import { customStyleTable } from "@/utils/customStyleTable";
import { formatRupiah } from "@/utils/formatRupiah";

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
        return <div className="text-default-900">{products.nama}</div>;
      case "kategori":
        return <div className="text-default-900">{products.kategori}</div>;
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
        return <div className="text-default-900">{products.created_at}</div>;
      case "action":
        return (
          <Button
            variant="bordered"
            color="default"
            size="sm"
            onClick={() => alert(`ID Order: ${products.id}`)}
            className="font-medium"
          >
            Detail
          </Button>
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

            <Button
              variant="solid"
              color="primary"
              className="w-full font-medium sm:w-max"
            >
              Buat Produk
            </Button>
          </div>

          <Table
            isHeaderSticky
            aria-label="products table"
            color="primary"
            selectionMode="single"
            classNames={customStyleTable}
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
