import { Chip, ChipProps } from "@nextui-org/react";
import { Circle } from "@phosphor-icons/react";

export default function StatusStock({
  text,
  ...props
}: ChipProps & { text: string }) {
  return (
    <Chip
      variant="flat"
      color={
        text === "aman" ? "success" : text === "menipis" ? "warning" : "danger"
      }
      size="lg"
      startContent={<Circle weight="fill" size={8} className="animate-ping" />}
      classNames={{
        base: "px-3",
        content: "font-semibold capitalize",
      }}
      {...props}
    >
      stok {text}
    </Chip>
  );
}
