import { Button } from "@nextui-org/react";
import { CheckCircle, Eye, Pencil, XCircle } from "@phosphor-icons/react";
import { NextRouter } from "next/router";

// components
import CustomTooltip from "@/components/tooltip";

type DocumentsTable = {
  id_suratjalan: string;
  transaksi_id: string;
  nama_driver: string;
  kendaraan: string;
  plat_kendaraan: string;
  verifikasi: boolean;
  transaksi: {
    penerima: string;
    alamat: string;
    keterangan: string;
    no_telp: string;
  };
};

export const columnsDocuments = [
  { name: "ID Surat Jalan", uid: "id_suratjalan" },
  { name: "ID Transaksi", uid: "transaksi_id" },
  { name: "Penerima", uid: "penerima" },
  { name: "Nama Driver", uid: "nama_driver" },
  { name: "Kendaraan", uid: "kendaraan" },
  { name: "Plat Kendaraan", uid: "plat_kendaraan" },
  { name: "Verifikasi", uid: "verifikasi" },
  { name: "Alamat", uid: "alamat" },
  { name: "Keterangan", uid: "keterangan" },
  { name: "No Telpon", uid: "no_telp" },
  { name: "Aksi", uid: "action" },
];

export const renderCellDocuments = (
  document: DocumentsTable,
  columnKey: React.Key,
  router: NextRouter,
) => {
  const cellValue = document[columnKey as keyof DocumentsTable];

  switch (columnKey) {
    case "id_suratjalan":
      return <div className="text-default-900">{document.id_suratjalan}</div>;
    case "transaksi_id":
      return <div className="text-default-900">{document.transaksi_id}</div>;
    case "penerima":
      return (
        <div className="text-default-900">{document.transaksi.penerima}</div>
      );

    case "nama_driver":
      return (
        <div className="line-clamp-1 w-max max-w-[250px] text-default-900">
          {!document.nama_driver ? (
            <XCircle className="text-danger" weight="fill" size={20} />
          ) : (
            document.nama_driver
          )}
        </div>
      );
    case "kendaraan":
      return (
        <div className="line-clamp-1 w-max max-w-[250px] text-default-900">
          {!document.kendaraan ? (
            <XCircle className="text-danger" weight="fill" size={20} />
          ) : (
            document.kendaraan
          )}
        </div>
      );
    case "plat_kendaraan":
      return (
        <div className="line-clamp-1 w-max max-w-[250px] text-default-900">
          {!document.plat_kendaraan ? (
            <XCircle className="text-danger" weight="fill" size={20} />
          ) : (
            document.plat_kendaraan
          )}
        </div>
      );
    case "alamat":
      return (
        <div className="line-clamp-1 w-max max-w-[250px] text-default-900">
          {document.transaksi.alamat}
        </div>
      );
    case "keterangan":
      return (
        <div className="line-clamp-1 w-max max-w-[250px] text-default-900">
          {document.transaksi.keterangan}
        </div>
      );
    case "no_telp":
      return (
        <div className="line-clamp-1 w-max max-w-[250px] text-default-900">
          {document.transaksi.no_telp}
        </div>
      );
    case "verifikasi":
      return (
        <div className="line-clamp-1 w-max max-w-[250px] text-default-900">
          {!document.verifikasi ? (
            <XCircle className="text-danger" weight="fill" size={20} />
          ) : (
            <div className="flex items-center gap-1">
              <CheckCircle className="text-success" weight="fill" size={20} />
              <span className="text-sm font-medium text-default-600">
                Terverifikasi
              </span>
            </div>
          )}
        </div>
      );
    case "action":
      return (
        <div className="flex max-w-[110px] items-center gap-1">
          <CustomTooltip content="Detail">
            <Button
              isIconOnly
              variant="light"
              size="sm"
              onClick={() =>
                router.push(
                  `/owner/warehouses/documents/${document.id_suratjalan}`,
                )
              }
            >
              <Eye weight="bold" size={20} className="text-default-600" />
            </Button>
          </CustomTooltip>

          <CustomTooltip content="Edit">
            <Button
              isIconOnly
              variant="light"
              size="sm"
              onClick={() =>
                router.push(
                  `/owner/warehouses/documents/edit/${document.id_suratjalan}`,
                )
              }
            >
              <Pencil weight="bold" size={20} className="text-default-600" />
            </Button>
          </CustomTooltip>
        </div>
      );

    default:
      return cellValue;
  }
};
