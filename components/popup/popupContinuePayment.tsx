import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
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
        size="xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="font-semibold text-default-900">
                Metode Pembayaran
              </ModalHeader>

              <ModalBody>
                <div className="grid gap-12">
                  <RadioGroup
                    orientation="horizontal"
                    color="danger"
                    defaultValue="tunai"
                    classNames={{
                      wrapper: "justify-evenly",
                    }}
                  >
                    <Radio
                      value="tunai"
                      className="font-medium text-default-900"
                    >
                      Tunai
                    </Radio>
                    <Radio
                      value="transfer"
                      className="font-medium text-default-900"
                    >
                      Transfer
                    </Radio>
                    <Radio
                      value="qris"
                      className="font-medium text-default-900"
                    >
                      QRIS
                    </Radio>
                  </RadioGroup>

                  <div className="grid gap-4">
                    <Input
                      type="number"
                      variant="flat"
                      labelPlacement="outside"
                      label="Nominal (Rp)"
                      placeholder="Masukan nominal..."
                      className="w-full"
                    />

                    <RadioGroup
                      orientation="horizontal"
                      color="danger"
                      defaultValue="uang-pas"
                      classNames={{
                        wrapper: "justify-evenly",
                      }}
                    >
                      <Radio
                        value="uang-pas"
                        className="font-medium text-default-900"
                      >
                        Uang Pas
                      </Radio>
                      <Radio
                        value="250"
                        className="font-medium text-default-900"
                      >
                        Rp 250.000
                      </Radio>
                      <Radio
                        value="500"
                        className="font-medium text-default-900"
                      >
                        Rp 500.000
                      </Radio>
                    </RadioGroup>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-foreground-600">
                      Total Pembayaran
                    </p>
                    <h4 className="text-[24px] font-bold text-rose-500">
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
