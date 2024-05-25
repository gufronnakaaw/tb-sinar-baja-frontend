import { fetcher } from "@/utils/fetcher";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import { UploadSimple } from "@phosphor-icons/react";
import { useState } from "react";
import { KeyedMutator } from "swr";
import * as xlsx from "xlsx";

type ErrorResponse = {
  success: boolean;
  status_code: number;
  error: {
    name: string;
    message: string;
    errors: unknown;
  };
};

export default function PopupImportProducts({
  mutate,
}: {
  mutate: KeyedMutator<any>;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [file, setFile] = useState<File | null>(null);
  const [sheet, setSheet] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreateProduk() {
    if (!file) return;

    setLoading(true);
    const data = await file.arrayBuffer();

    const workbook = xlsx.read(data);

    if (!workbook.SheetNames.includes(sheet)) {
      setLoading(false);
      return alert("Sheet tidak ditemukan");
    }

    const headers = xlsx.utils.sheet_to_json(workbook.Sheets[sheet], {
      raw: true,
      header: 1,
    })[0] as string[];

    const rows = xlsx.utils.sheet_to_json(workbook.Sheets[sheet]) as any[];

    const results = [];

    for (let i = 0; i < rows.length; i++) {
      const defaultObj = {};

      for (let j = 0; j < headers.length; j++) {
        const key = headers[j].toLocaleLowerCase().replace(/ /g, "_");

        switch (key) {
          case "sub_kategori_produk":
            Object.assign(defaultObj, {
              [key]: !rows[i][headers[j]] ? null : rows[i][headers[j]],
            });
            break;
          case "gudang":
            Object.assign(defaultObj, {
              gudang_id: !rows[i][headers[j]] ? null : rows[i][headers[j]],
            });
            break;
          case "stock_aman":
            Object.assign(defaultObj, {
              stok_aman: !rows[i][headers[j]] ? 0 : rows[i][headers[j]],
            });
            break;
          case "nama_sebutan":
            Object.assign(defaultObj, {
              nama_produk_sebutan: !rows[i][headers[j]]
                ? null
                : rows[i][headers[j]],
            });
            break;
          default:
            Object.assign(defaultObj, {
              [key]: !rows[i][headers[j]] ? null : rows[i][headers[j]],
            });
        }
      }

      results.push(defaultObj);
    }

    try {
      await fetcher({
        url: "/produk/bulk",
        method: "POST",
        data: {
          produk: results,
        },
      });

      alert(`${results.length} data berhasil masuk ke database`);
      setLoading(false);
      mutate();
      onClose();
    } catch (error) {
      setLoading(false);
      const response = error as ErrorResponse;

      if (response.status_code >= 500) {
        console.log(error);
        return alert("kode error 500. terjadi masalah pada server");
      }

      if (response.status_code >= 400) {
        console.log(error);
        return alert(
          `kode error ${response.status_code}. terjadi kesalahan saat input data. periksa kembali file excel anda.`,
        );
      }

      console.log(error);
      return alert("kode error tidak diketahui. terjadi masalah pada aplikasi");
    }
  }

  return (
    <>
      <Button
        onPress={onOpen}
        variant="solid"
        color="primary"
        className="w-full font-medium sm:w-max"
      >
        Buat Produk
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        size="lg"
        onClose={() => {
          setLoading(false);
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="font-semibold text-default-900">
                Unggah Produk
              </ModalHeader>

              <ModalBody>
                <div className="grid gap-6">
                  <Input
                    isRequired
                    variant="flat"
                    color="default"
                    label="Nama Sheet"
                    labelPlacement="outside"
                    placeholder="Masukan nama sheet..."
                    onChange={(e) => setSheet(e.target.value)}
                  />

                  <div className="grid gap-1.5">
                    <span className="inline-flex text-sm after:ml-[2px] after:text-danger after:content-['*']">
                      Cari Berkas
                    </span>
                    <input
                      type="file"
                      accept=".xlsx,.xls"
                      className="rounded-xl bg-default-100 px-2 py-2 text-small text-foreground-500 file:mr-4 file:rounded-md file:border-0 file:bg-default-200 file:px-2 file:py-[2px] file:text-sm file:font-medium file:text-primary hover:file:bg-default-300"
                      onChange={(e) => {
                        if (!e.target.files) return;

                        setFile(e.target.files[0]);
                      }}
                    />
                  </div>
                </div>
              </ModalBody>

              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    setLoading(false);
                    onClose();
                  }}
                  className="font-medium"
                >
                  Batal
                </Button>

                {loading ? (
                  <Button
                    variant="solid"
                    color="primary"
                    startContent={<Spinner color="white" size="sm" />}
                    className={`${loading ? "cursor-not-allowed justify-self-end font-medium" : ""}`}
                  >
                    Tunggu
                  </Button>
                ) : (
                  <Button
                    color="primary"
                    variant="solid"
                    startContent={<UploadSimple weight="bold" size={18} />}
                    onClick={handleCreateProduk}
                    className="font-medium"
                  >
                    Unggah Produk
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
