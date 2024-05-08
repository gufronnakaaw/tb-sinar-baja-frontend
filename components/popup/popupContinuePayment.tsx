import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { Printer } from "@phosphor-icons/react";

export default function PopupContinuePayment() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        onPress={onOpen}
        variant="solid"
        className="bg-rose-500 py-8 font-semibold text-white"
      >
        Lanjutkan Pembayaran
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        size="2xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="font-semibold text-default-900">
                Informasi Tambahan
              </ModalHeader>

              <ModalBody>
                <div className="grid gap-8">
                  <div className="grid gap-4">
                    <Input
                      type="number"
                      variant="flat"
                      labelPlacement="outside"
                      label="No. Telp"
                      placeholder="Masukan no. telp..."
                      className="w-full"
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <Textarea
                        type="number"
                        variant="flat"
                        maxRows={3}
                        labelPlacement="outside"
                        label="Keterangan"
                        placeholder="Masukan keterangan..."
                        className="w-full"
                      />
                      <Textarea
                        type="number"
                        variant="flat"
                        maxRows={3}
                        labelPlacement="outside"
                        label="Alamat"
                        placeholder="Masukan alamat lengkap..."
                        className="w-full"
                      />
                    </div>

                    <Input
                      type="number"
                      variant="flat"
                      labelPlacement="outside"
                      label="Biaya Ongkir"
                      placeholder="Masukan biaya ongkir..."
                      startContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-sm text-default-600">Rp</span>
                        </div>
                      }
                      className="w-full"
                    />

                    <Input
                      type="number"
                      variant="flat"
                      labelPlacement="outside"
                      label="Nominal"
                      placeholder="Masukan nominal..."
                      startContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-sm text-default-600">Rp</span>
                        </div>
                      }
                      className="w-full"
                    />
                  </div>

                  <div className="flex items-center gap-8">
                    <p className="font-medium text-foreground-600">
                      Total Pembayaran :
                    </p>
                    <h4 className="text-[28px] font-bold text-rose-500">
                      Rp 417.000
                    </h4>
                  </div>
                </div>
              </ModalBody>

              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  className="font-medium"
                >
                  Batal
                </Button>

                <Button
                  variant="solid"
                  onPress={onClose}
                  endContent={<Printer weight="bold" size={17} />}
                  className="bg-rose-500 font-semibold text-white"
                >
                  Cetak Nota
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
