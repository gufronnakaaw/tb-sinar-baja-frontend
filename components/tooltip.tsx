import { Tooltip, TooltipProps } from "@nextui-org/react";

export default function CustomTooltip(props: TooltipProps) {
  return (
    <Tooltip
      delay={0}
      closeDelay={400}
      placement="top-start"
      classNames={{
        content: "font-medium text-default-900 p-4 max-w-[300px]",
      }}
      {...props}
    >
      {props.children}
    </Tooltip>
  );
}
