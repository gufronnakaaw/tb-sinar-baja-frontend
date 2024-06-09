import { ProdukFinal } from "@/types/preorders.type";
import { SATUANLIST } from "@/utils/satuan";
import { Select, SelectItem } from "@nextui-org/react";

export default function SelectSatuan({
  setPesanan,
  item,
}: {
  setPesanan: React.Dispatch<React.SetStateAction<ProdukFinal[]>>;
  item: ProdukFinal;
}) {
  return (
    <Select
      isRequired
      label="Satuan"
      className="w-full"
      size="sm"
      onChange={(e) => {
        if (!e.target.value) {
          setPesanan((prev) => {
            if (prev.length != 0) {
              const index = prev.findIndex(
                (produk) => produk.nama_produk == item.nama_produk,
              );

              if (index != -1) {
                prev[index] = {
                  ...prev[index],
                  satuan: "",
                };

                return [...prev];
              }
            }
            return [...prev];
          });
        } else {
          setPesanan((prev) => {
            if (prev.length != 0) {
              const index = prev.findIndex(
                (produk) => produk.nama_produk == item.nama_produk,
              );

              if (index != -1) {
                prev[index] = {
                  ...prev[index],
                  satuan: e.target.value,
                };

                return [...prev];
              }
            }
            return [...prev];
          });
        }
      }}
    >
      {SATUANLIST.map((item) => {
        return <SelectItem key={item}>{item}</SelectItem>;
      })}
    </Select>
  );
}
