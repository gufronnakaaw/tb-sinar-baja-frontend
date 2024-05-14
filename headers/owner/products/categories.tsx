import { Button } from "@nextui-org/react";
import { Eye, Pencil, Trash } from "@phosphor-icons/react";
import { NextRouter } from "next/router";
import React from "react";

// components & utils
import CustomTooltip from "@/components/tooltip";
import {
  ProductsCategoriesType,
  ProductsSubCategoriesType,
} from "@/types/productsCategories.type";

type ProductsCategoriesTable = {
  code: string;
  name: string;
  created_at: string;
};

type ProductsSubCategoriesTable = {
  code: string;
  name: string;
  category: string;
  created_at: string;
};

export const columnsProductsCategories = [
  { name: "Kode", uid: "code" },
  { name: "Nama", uid: "name" },
  { name: "Dibuat Pada", uid: "created_at" },
  { name: "Aksi", uid: "action" },
];

export const columnsProductsSubCategories = [
  { name: "Kode", uid: "code" },
  { name: "kategori", uid: "category" },
  { name: "Nama", uid: "name" },
  { name: "Dibuat Pada", uid: "created_at" },
  { name: "Aksi", uid: "action" },
];

export function renderCellProductsCategories(
  category: ProductsCategoriesType,
  columnKey: React.Key,
  router: NextRouter,
) {
  const cellValue = category[columnKey as keyof ProductsCategoriesTable];

  switch (columnKey) {
    case "code":
      return <div className="text-default-900">{category.code}</div>;
    case "name":
      return <div className="w-max text-default-900">{category.name}</div>;
    case "created_at":
      return (
        <div className="w-max text-default-900">{category.created_at}</div>
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
}

export function renderCellProductsSubCategories(
  subcategory: ProductsSubCategoriesType,
  columnKey: React.Key,
  router: NextRouter,
) {
  const cellValue = subcategory[columnKey as keyof ProductsSubCategoriesTable];

  switch (columnKey) {
    case "code":
      return <div className="text-default-900">{subcategory.code}</div>;
    case "category":
      return <div className="text-default-900">{subcategory.category}</div>;
    case "name":
      return <div className="w-max text-default-900">{subcategory.name}</div>;
    case "created_at":
      return (
        <div className="w-max text-default-900">{subcategory.created_at}</div>
      );
    case "action":
      return (
        <div className="flex max-w-[110px] items-center gap-1">
          <CustomTooltip content="Detail">
            <Button
              isIconOnly
              variant="light"
              size="sm"
              onClick={() => router.push("/owner/products/categories")}
            >
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
}
