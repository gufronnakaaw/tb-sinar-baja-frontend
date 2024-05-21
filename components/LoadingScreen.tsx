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
    <div className="absolute bottom-0 left-0 right-0 top-0 z-[9999] bg-white">
      <div className="align-center relative top-[50%] flex translate-y-[-50%] flex-col items-center">
        <div className="flex items-center gap-5">
          <p className="text-[20px] font-bold text-black">TB. SINAR BAJA</p>
        </div>
        <Spinner color={getColor(role)} size="lg" />
      </div>
    </div>
  );
}
