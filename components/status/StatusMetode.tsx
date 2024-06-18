import { Chip } from "@nextui-org/react";

export default function StatusMetode({ text }: { text: string }) {
  return (
    <Chip
      variant="flat"
      size="sm"
      classNames={{
        base: "px-3",
        content: "font-normal capitalize",
      }}
      className={
        text == "tempo" ? "bg-amber-500 text-white" : "bg-green-500 text-white"
      }
    >
      {text == "tempo" ? "Preorder" : text}
    </Chip>
  );
}
