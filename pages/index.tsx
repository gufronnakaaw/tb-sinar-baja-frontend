import { Button, Input } from "@nextui-org/react";
import { Lock, User } from "@phosphor-icons/react";
import { useRouter } from "next/router";

const HomePage = () => {
  const router = useRouter();

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-8">
      <div className="text-center">
        <h1 className="text-[28px] font-bold text-default-900">
          Halo, Admin FGLabs 💙
        </h1>
        <p className="font-medium text-default-500">
          Silakan login dulu, agar bisa mengatur semuanya.
        </p>
      </div>

      <div className="mx-auto grid w-full max-w-[420px] gap-4">
        <Input
          type="text"
          variant="flat"
          color="default"
          labelPlacement="outside"
          label="Email"
          placeholder="Masukan email"
          startContent={
            <User weight="bold" size={18} className="text-gray-500" />
          }
        />

        <Input
          isRequired
          type="password"
          variant="flat"
          color="default"
          labelPlacement="outside"
          label="Kata Sandi"
          placeholder="Masukan kata sandi"
          startContent={
            <Lock weight="bold" size={18} className="text-gray-500" />
          }
        />

        <Button
          color="primary"
          onClick={() => router.push("/dashboard")}
          className="mt-4 font-semibold"
        >
          Masuk
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
