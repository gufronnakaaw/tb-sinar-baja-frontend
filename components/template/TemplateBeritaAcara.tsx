import { BrokenDetailType } from "@/types/broken.type";
import { formatDate } from "@/utils/formatDate";
import { forwardRef } from "react";

const BeritaAcara = (props: BrokenDetailType, ref: any) => {
  return (
    <>
      <div className="container grid gap-2 pt-4 font-inter" ref={ref}>
        <div className="flex items-start justify-between gap-4">
          <div className="grid gap-1">
            <h1 className="font-bold text-black">TB. SINAR BAJA</h1>
            <p className="max-w-[300px] text-[10px] font-medium text-black">
              Jl. Letjend Sutoyo No.67, Burengan, Kec. Pesantren, Kabupaten
              Kediri, Jawa Timur 64131
            </p>
            <p className="max-w-[300px] text-[10px] font-medium text-black">
              082140735711
            </p>
          </div>

          <div className="grid items-start gap-1">
            <h1 className="font-bold uppercase text-black">Berita Acara</h1>

            <div className="grid">
              <div className="grid w-[250px] grid-cols-[80px_6px_1fr] gap-1 text-[10px] text-black">
                <div className="font-medium">ID Berita Acara</div>
                <div className="font-medium">:</div>
                <p className="font-medium">{props.id_ba}</p>
              </div>

              <div className="grid w-[250px] grid-cols-[80px_6px_1fr] gap-1 text-[10px] text-black">
                <div className="font-medium">Tanggal</div>
                <div className="font-medium">:</div>
                <p className="font-medium">{formatDate(props.created_at)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-1">
          <p className="text-[10px] font-medium text-black">
            Berikut adalah data item yang mengalami masalah :
          </p>

          <table className="table-auto border border-black">
            <thead>
              <tr className="border-b border-black text-left text-[10px] font-medium text-black">
                <th className="px-2 py-1">Jumlah</th>
                <th className="px-2 py-1">Kode Item</th>
                <th className="px-2 py-1">Nama Barang</th>
                <th className="px-2 py-1">Keterangan</th>
                <th className="px-2 py-1">Lokaasi</th>
              </tr>
            </thead>

            <tbody>
              {props.list_produk.map((item) => (
                <tr
                  key={item.kode_item}
                  className="text-left text-[10px] text-black"
                >
                  <td className="w-[100px] px-2 py-1">
                    {item.jumlah} {item.satuan}
                  </td>
                  <td className="w-max px-2 py-1">{item.kode_item}</td>
                  <td className="w-max px-2 py-1">{item.nama_produk}</td>
                  <td className="w-max px-2 py-1">{item.alasan}</td>
                  <td className="w-[150px] px-2 py-1">
                    {item.gudang}, {item.rak}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="grid gap-10 text-center">
            <h4 className="text-[10px] font-medium text-black">
              Disetujui oleh,
            </h4>
            <div className="text-sm font-medium text-black">
              (..................................)
            </div>
          </div>

          <div className="grid gap-10 text-center">
            <h4 className="text-[10px] font-medium text-black">Oleh,</h4>
            <div className="text-sm font-medium text-black">
              (..................................)
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const TemplateBeritaAcara = forwardRef(BeritaAcara);
