import { Spinner } from "@nextui-org/react";

export default function LoadingScreen({
  role,
}: {
  role: "owner" | "admin" | "cashier";
}) {
  function getColor(role: string) {
    if (role == "owner") {
      return "border-b-primary";
    }

    if (role == "admin") {
      return "border-b-lime-500";
    }

    if (role == "cashier") {
      return "border-b-rose-500";
    }
  }

  return (
    <div className="absolute inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="grid gap-4">
        <p className="text-[20px] font-bold text-default-900">TB. SINAR BAJA</p>
        <Spinner
          size="lg"
          classNames={{
            circle1: getColor(role),
            circle2: getColor(role),
          }}
        />
      </div>
    </div>
  );
}
