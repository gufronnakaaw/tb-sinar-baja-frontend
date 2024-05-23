import { Spinner } from "@nextui-org/react";

export default function LoadingScreen({
  role,
}: {
  role: "owner" | "admin" | "cashier";
}) {
  function getColor(role: string) {
    if (role == "owner") {
      return "primary";
    }

    if (role == "admin") {
      return "success";
    }

    if (role == "cashier") {
      return "danger";
    }
  }

  return (
    <div className="absolute inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="grid gap-4">
        <p className="text-[20px] font-bold text-default-900">TB. SINAR BAJA</p>
        <Spinner color={getColor(role)} size="lg" />
      </div>
    </div>
  );
}
