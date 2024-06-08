import { ListProdukType } from "@/types/selling.type";
import { formatRupiah } from "@/utils/formatRupiah";
import { Button, Input } from "@nextui-org/react";
import { Minus, Plus, Trash } from "@phosphor-icons/react";
import { ChangeEvent } from "react";
import CustomTooltip from "../tooltip";

type CardSellingQuantityProductProps = ListProdukType & {
  setListProduk: React.Dispatch<React.SetStateAction<ListProdukType[]>>;
};

export default function CardSellingQuantityProduct({
  kode_item,
  nama_produk,
  harga,
  subtotal,
  qty,
  setListProduk,
  stok,
}: CardSellingQuantityProductProps) {
  function handleMinus(kode_item: string) {
    setListProduk((prev) => {
      if (prev.length != 0) {
        const index = prev.findIndex((produk) => produk.kode_item == kode_item);

        if (index != -1) {
          prev[index] = {
            ...prev[index],
            qty: qty - 1 < 1 ? 0 : qty - 1,
            subtotal: qty - 1 < 1 ? 0 : (qty - 1) * prev[index].harga,
          };

          return [...prev];
        }
      }
      return [...prev];
    });
  }

  function handlePlus(kode_item: string) {
    setListProduk((prev) => {
      if (prev.length != 0) {
        const index = prev.findIndex((produk) => produk.kode_item == kode_item);

        if (index != -1) {
          prev[index] = {
            ...prev[index],
            qty: qty + 1,
            subtotal: (qty + 1) * prev[index].harga,
          };

          return [...prev];
        }
      }
      return [...prev];
    });
  }

  function handleInputQuantity(e: ChangeEvent<HTMLInputElement>) {
    const quantity = e.target.value;

    if (!quantity) {
      setListProduk((prev) => {
        if (prev.length != 0) {
          const index = prev.findIndex(
            (produk) => produk.kode_item == kode_item,
          );

          if (index != -1) {
            prev[index] = {
              ...prev[index],
              qty: 0,
              subtotal: 0,
            };

            return [...prev];
          }
        }
        return [...prev];
      });
    } else {
      if (parseFloat(quantity) > stok) {
        setListProduk((prev) => {
          if (prev.length != 0) {
            const index = prev.findIndex(
              (produk) => produk.kode_item == kode_item,
            );

            if (index != -1) {
              prev[index] = {
                ...prev[index],
                qty: stok,
                subtotal: stok * prev[index].harga,
              };

              return [...prev];
            }
          }
          return [...prev];
        });
      } else {
        setListProduk((prev) => {
          if (prev.length != 0) {
            const index = prev.findIndex(
              (produk) => produk.kode_item == kode_item,
            );

            if (index != -1) {
              prev[index] = {
                ...prev[index],
                qty: parseFloat(quantity),
                subtotal: parseFloat(quantity) * prev[index].harga,
              };

              return [...prev];
            }
          }
          return [...prev];
        });
      }
    }
  }

  return (
    <div className="grid grid-cols-[1fr_repeat(3,140px)_42px] items-center gap-11 border-b border-gray-300 p-4">
      <div className="grid font-semibold text-default-600">
        <h4 className="line-clamp-2 font-semibold text-default-900">
          {nama_produk}
        </h4>
        <p className="font-medium text-rose-500">{formatRupiah(harga)}</p>
      </div>

      <div className="flex w-[155px] items-center gap-2 text-sm font-semibold text-default-600">
        <Button
          isIconOnly
          color="danger"
          variant="flat"
          size="sm"
          onClick={() => handleMinus(kode_item)}
          disabled={qty < 1}
        >
          <Minus weight="bold" size={16} />
        </Button>
        <Input
          value={qty ? `${qty}` : ""}
          type="number"
          variant="flat"
          size="sm"
          min={0}
          step=".01"
          labelPlacement="outside"
          onChange={handleInputQuantity}
        />
        <Button
          isIconOnly
          color="danger"
          variant="flat"
          size="sm"
          onClick={() => handlePlus(kode_item)}
          disabled={qty >= stok}
        >
          <Plus weight="bold" size={16} />
        </Button>
      </div>

      <div className="font-medium text-default-900">{formatRupiah(harga)}</div>

      <div className="font-medium text-default-900">
        {formatRupiah(subtotal)}
      </div>

      <CustomTooltip content="Hapus">
        <Button
          isIconOnly
          variant="flat"
          color="danger"
          size="sm"
          onClick={() => {
            setListProduk((prev) => {
              return prev.filter((produk) => produk.kode_item != kode_item);
            });
          }}
        >
          <Trash weight="bold" size={20} />
        </Button>
      </CustomTooltip>
    </div>
  );
}
