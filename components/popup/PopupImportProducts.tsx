import { fetcher } from "@/utils/fetcher";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { UploadSimple } from "@phosphor-icons/react";
import { useState } from "react";
import { KeyedMutator } from "swr";
import * as xlsx from "xlsx";

export default function PopupImportProducts({
  mutate,
}: {
  mutate: KeyedMutator<any>;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [file, setFile] = useState<File | null>(null);
  const [sheet, setSheet] = useState("");

  async function handleCreateProduk() {
    if (!file) return;

    const data = await file.arrayBuffer();

    const workbook = xlsx.read(data);

    console.log(workbook.SheetNames);

    if (!workbook.SheetNames.includes(sheet)) {
      return alert("Sheet tidak ditemukan");
    }

    const headers = xlsx.utils.sheet_to_json(workbook.Sheets[sheet], {
      raw: true,
      header: 1,
    })[0];

    const rows = xlsx.utils.sheet_to_json(workbook.Sheets[sheet]);

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
      mutate();
      onClose();
    } catch (error) {
      console.log(error);
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
                    labelPlacement="outside"
                    label="Nama Sheet"
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
                  color="primary"
                  variant="light"
                  onPress={onClose}
                  className="font-medium"
                >
                  Batal
                </Button>

                <Button
                  color="primary"
                  variant="solid"
                  startContent={<UploadSimple weight="bold" size={18} />}
                  className="font-semibold"
                  onClick={handleCreateProduk}
                >
                  Unggah Produk
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
