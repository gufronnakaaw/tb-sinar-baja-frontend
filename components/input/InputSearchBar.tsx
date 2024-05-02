import { Input, InputProps } from "@nextui-org/react";
import { MagnifyingGlass } from "@phosphor-icons/react";

export default function InputSearchBar(props: InputProps) {
  return (
    <Input
      variant="flat"
      color="default"
      labelPlacement="outside"
      startContent={
        <MagnifyingGlass weight="bold" size={18} className="text-gray-500" />
      }
      {...props}
    />
  );
}
