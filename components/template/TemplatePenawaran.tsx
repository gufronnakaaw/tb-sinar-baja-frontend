import { PenawaranDetail } from "@/types/preorders.type";
import { formatDateWithoutTime } from "@/utils/formatDate";
import { forwardRef } from "react";

const Penawaran = (props: PenawaranDetail, ref: any) => {
  return (
    <>
      <style media="print">
        {
          "\
      @page { size: 21cm 29.7cm; }\
    "
        }
      </style>

      <div className="container grid gap-2 px-8 pt-4 font-inter" ref={ref}>
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

            <div className="mt-2">
              <h5 className="text-[10px] font-medium text-black">Kepada</h5>
              <h5 className="text-[10px] font-medium text-black">
                Yth. {props.nama_supplier}
              </h5>
              <h5 className="text-[10px] font-medium text-black">
                {props.alamat}
              </h5>
            </div>
          </div>

          <div className="grid items-start gap-1">
            <h1 className="font-bold uppercase text-black">
              Surat Permintaan Penawaran
            </h1>

            <div className="grid">
              <div className="grid w-[250px] grid-cols-[70px_6px_1fr] gap-1 text-[10px] text-black">
                <div className="font-medium">Nomor</div>
                <div className="font-medium">:</div>
                <p className="font-medium">{props.id_penawaran}</p>
              </div>

              <div className="grid w-[250px] grid-cols-[70px_6px_1fr] gap-1 text-[10px] text-black">
                <div className="font-medium">Tanggal</div>
                <div className="font-medium">:</div>
                <p className="font-medium">
                  {formatDateWithoutTime(props.created_at)}
                </p>
              </div>

              <div className="grid w-[250px] grid-cols-[70px_6px_1fr] gap-1 text-[10px] text-black">
                <div className="font-medium">ID Supplier</div>
                <div className="font-medium">:</div>
                <p className="font-medium">{props.supplier_id}</p>
              </div>

              <div className="grid w-[250px] grid-cols-[70px_6px_1fr] gap-1 text-[10px] text-black">
                <div className="font-medium">Email</div>
                <div className="font-medium">:</div>
                <p className="font-medium">{props.email_supplier}</p>
              </div>

              <div className="grid w-[250px] grid-cols-[70px_6px_1fr] gap-1 text-[10px] text-black">
                <div className="font-medium">No. Telpon</div>
                <div className="font-medium">:</div>
                <p className="font-medium">{props.no_telp}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-2">
          <p className="text-[10px] font-medium text-black">
            Mohon dapat diberikan penawaran, harga, dan ketersediaan stok untuk
            item sebagai berikut :
          </p>

          <table className="table-auto border border-black">
            <thead>
              <tr className="border-b border-black text-left text-[10px] font-medium text-black">
                <th className="px-2 py-1">No</th>
                <th className="px-2 py-1">Kode Pabrik</th>
                <th className="px-2 py-1">Nama Produk</th>
                <th className="px-2 py-1">Qty</th>
              </tr>
            </thead>

            <tbody>
              {props.produk.map((item, index) => (
                <tr
                  key={item.kode_pabrik}
                  className="text-left text-[10px] text-black"
                >
                  <td className="w-[100px] px-2 py-1">{index + 1}</td>
                  <td className="w-max px-2 py-1">
                    {!item.kode_pabrik ? "-" : item.kode_pabrik}
                  </td>
                  <td className="w-max px-2 py-1">{item.nama_produk}</td>
                  <td className="w-max px-2 py-1">
                    {item.qty} {item.satuan}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mr-6 mt-2 grid justify-self-end">
          <h1 className="text-[10px] font-normal text-black">
            Kediri, {formatDateWithoutTime(props.created_at)}
          </h1>
          <h1 className="mt-1 text-center text-[10px] font-bold text-black">
            TB. SINAR BAJA
          </h1>
        </div>
      </div>
    </>
  );
};

export const TemplatePenawaran = forwardRef(Penawaran);
