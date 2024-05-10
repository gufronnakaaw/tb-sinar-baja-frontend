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

import {
  categories,
  CategoriesType,
  subcategories,
  SubCategoriesType,
} from "@/_dummy/categories";

export default function ProductsCategoriesPage() {
  const { page, pages, data, setPage } = usePagination(categories, 10);
  const subCategories = usePagination(subcategories, 10);

  const columns = [
    { name: "Kode", uid: "code", sortable: false },
    { name: "Nama", uid: "name", sortable: true },
    { name: "Dibuat Pada", uid: "created_at", sortable: true },
    { name: "Aksi", uid: "action", sortable: false },
  ];

  const renderCell = (categories: CategoriesType, columnKey: React.Key) => {
    const cellValue = categories[columnKey as keyof CategoriesType];

    switch (columnKey) {
      case "code":
        return <div className="text-default-900">{categories.code}</div>;
      case "name":
        return <div className="w-max text-default-900">{categories.name}</div>;
      case "created_at":
        return (
          <div className="w-max text-default-900">{categories.created_at}</div>
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

  const subColumns = [
    { name: "Kode", uid: "code", sortable: false },
    { name: "kategori", uid: "category", sortable: true },
    { name: "Nama", uid: "name", sortable: true },
    { name: "Dibuat Pada", uid: "created_at", sortable: true },
    { name: "Aksi", uid: "action", sortable: false },
  ];

  const renderSubCell = (
    subcategories: SubCategoriesType,
    columnKey: React.Key,
  ) => {
    const cellValue = subcategories[columnKey as keyof SubCategoriesType];

    switch (columnKey) {
      case "code":
        return <div className="text-default-900">{subcategories.code}</div>;
      case "category":
        return <div className="text-default-900">{subcategories.category}</div>;
      case "name":
        return (
          <div className="w-max text-default-900">{subcategories.name}</div>
        );
      case "created_at":
        return (
          <div className="w-max text-default-900">
            {subcategories.created_at}
          </div>
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
              aria-label="payments table"
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
                {(categories) => (
                  <TableRow key={categories.code}>
                    {(columnKey) => (
                      <TableCell>{renderCell(categories, columnKey)}</TableCell>
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
              aria-label="payments table"
              color="primary"
              selectionMode="single"
              classNames={customStyleTable}
              className="scrollbar-hide"
            >
              <TableHeader columns={subColumns}>
                {(column) => (
                  <TableColumn key={column.uid}>{column.name}</TableColumn>
                )}
              </TableHeader>

              <TableBody items={subCategories.data}>
                {(subcategories) => (
                  <TableRow key={subcategories.code}>
                    {(columnKey) => (
                      <TableCell>
                        {renderSubCell(subcategories, columnKey)}
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
