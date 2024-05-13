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

export default function PopupImportProducts() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
                  />

                  <div className="grid gap-1.5">
                    <span className="inline-flex text-sm after:ml-[2px] after:text-danger after:content-['*']">
                      Cari Berkas
                    </span>
                    <input
                      type="file"
                      accept=".xlsx,.xls,.doc,.docx,.ppt,.pptx,.pdf"
                      className="rounded-xl bg-default-100 px-2 py-2 text-small text-foreground-500 file:mr-4 file:rounded-md file:border-0 file:bg-default-200 file:px-2 file:py-[2px] file:text-sm file:font-medium file:text-primary hover:file:bg-default-300"
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
