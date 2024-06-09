import { ProdukFinalSupplier } from "@/types/preorders.type";
import { Select, SelectItem } from "@nextui-org/react";

export default function SelectHarga({
  setPesananSupplier,
  item,
}: {
  setPesananSupplier: React.Dispatch<
    React.SetStateAction<ProdukFinalSupplier[]>
  >;
  item: ProdukFinalSupplier;
}) {
  return (
    <Select
      isRequired
      label="Tipe"
      className="w-full"
      size="sm"
      selectedKeys={[item.tipe_harga]}
      onChange={(e) => {
        if (!e.target.value) {
          setPesananSupplier((prev) => {
            if (prev.length != 0) {
              const index = prev.findIndex(
                (produk) => produk.nama_produk == item.nama_produk,
              );

              if (index != -1) {
                prev[index] = {
                  ...prev[index],
                  tipe_harga: "harga",
                  subharga: item.harga,
                };

                return [...prev];
              }
            }
            return [...prev];
          });
        } else {
          if (e.target.value == "harga") {
            setPesananSupplier((prev) => {
              if (prev.length != 0) {
                const index = prev.findIndex(
                  (produk) => produk.nama_produk == item.nama_produk,
                );

                if (index != -1) {
                  prev[index] = {
                    ...prev[index],
                    tipe_harga: "harga",
                    subharga: item.harga,
                    jumlah: item.qty * item.harga,
                  };

                  return [...prev];
                }
              }
              return [...prev];
            });
          } else {
            setPesananSupplier((prev) => {
              if (prev.length != 0) {
                const index = prev.findIndex(
                  (produk) => produk.nama_produk == item.nama_produk,
                );

                if (index != -1) {
                  prev[index] = {
                    ...prev[index],
                    tipe_harga: "harga_grosir",
                    subharga: item.harga_grosir,
                    jumlah: item.qty * item.harga_grosir,
                  };

                  return [...prev];
                }
              }
              return [...prev];
            });
          }
        }
      }}
    >
      <SelectItem key="harga">Harga Biasa</SelectItem>
      <SelectItem key="harga_grosir">Harga Grosir</SelectItem>
    </Select>
  );
}
