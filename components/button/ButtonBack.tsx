import { Button, ButtonProps } from "@nextui-org/react";
import { ArrowLeft } from "@phosphor-icons/react";

export default function ButtonBack(props: ButtonProps) {
  return (
    <Button
      variant="light"
      color="primary"
      size="sm"
      startContent={<ArrowLeft weight="bold" size={17} />}
      className="w-max font-semibold"
      {...props}
    >
      {props.children}
    </Button>
  );
}
