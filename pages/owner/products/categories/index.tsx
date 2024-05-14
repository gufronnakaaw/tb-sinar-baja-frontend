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
import { useRouter } from "next/router";

// components
import InputSearchBar from "@/components/input/InputSearchBar";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";
import {
  columnsProductsCategories,
  columnsProductsSubCategories,
  renderCellProductsCategories,
  renderCellProductsSubCategories,
} from "@/headers/owner/products/categories";

// utils
import usePagination from "@/hooks/usepagination";
import { customStyleTable } from "@/utils/customStyleTable";

import { categories, subcategories } from "@/_dummy/categories";

export default function ProductsCategoriesPage() {
  const { page, pages, data, setPage } = usePagination(categories, 10);
  const subCategories = usePagination(subcategories, 10);
  const router = useRouter();

  return (
    <Layout title="Produk Kategori">
      <Container className="gap-20">
        <div className="grid gap-8">
          <h4 className="text-lg font-semibold text-default-900">
            Kategori Produk
          </h4>

          <div className="grid gap-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <InputSearchBar
                placeholder="Cari Kategori..."
                className="w-full sm:max-w-[500px]"
              />

              <Button
                variant="solid"
                color="primary"
                className="w-full font-medium sm:w-max"
              >
                Buat Kategori
              </Button>
            </div>

            <Table
              isHeaderSticky
              aria-label="products categories table"
              color="primary"
              selectionMode="single"
              classNames={customStyleTable}
              className="scrollbar-hide"
            >
              <TableHeader columns={columnsProductsCategories}>
                {(column) => (
                  <TableColumn key={column.uid}>{column.name}</TableColumn>
                )}
              </TableHeader>

              <TableBody items={data}>
                {(category) => (
                  <TableRow key={category.code}>
                    {(columnKey) => (
                      <TableCell>
                        {renderCellProductsCategories(
                          category,
                          columnKey,
                          router,
                        )}
                      </TableCell>
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
        </div>

        <div className="grid gap-8">
          <h4 className="text-lg font-semibold text-default-900">
            Sub Kategori Produk
          </h4>

          <div className="grid gap-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <InputSearchBar
                placeholder="Cari sub Kategori..."
                className="w-full sm:max-w-[500px]"
              />

              <Button
                variant="solid"
                color="primary"
                className="w-full font-medium sm:w-max"
              >
                Buat Sub Kategori
              </Button>
            </div>

            <Table
              isHeaderSticky
              aria-label="products sub categories table"
              color="primary"
              selectionMode="single"
              classNames={customStyleTable}
              className="scrollbar-hide"
            >
              <TableHeader columns={columnsProductsSubCategories}>
                {(column) => (
                  <TableColumn key={column.uid}>{column.name}</TableColumn>
                )}
              </TableHeader>

              <TableBody items={subCategories.data}>
                {(subcategory) => (
                  <TableRow key={subcategory.code}>
                    {(columnKey) => (
                      <TableCell>
                        {renderCellProductsSubCategories(
                          subcategory,
                          columnKey,
                          router,
                        )}
                      </TableCell>
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
        </div>
      </Container>
    </Layout>
  );
}
