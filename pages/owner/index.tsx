import { Button, Input } from "@nextui-org/react";
import { EnvelopeSimple, Key } from "@phosphor-icons/react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function LoginPage() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <div className="container grid h-screen w-full grid-rows-[1fr_100px] items-center justify-center gap-4">
        <div className="grid gap-8">
          <div className="text-center">
            <h1 className="text-[24px] font-bold leading-[140%] text-default-900">
              Selamat Datang Di Aplikasi{" "}
              <span className="text-blue-600">TB. Sinar Baja</span>
            </h1>
            <p className="font-medium text-default-500">
              Silahkan login untuk mengatur semuanya.
            </p>
          </div>

          <div className="mx-auto grid w-full max-w-[420px] gap-4">
            <Input
              type="text"
              variant="flat"
              color="default"
              labelPlacement="outside"
              placeholder="Email"
              endContent={
                <EnvelopeSimple
                  weight="bold"
                  size={18}
                  className="text-gray-600"
                />
              }
            />

            <Input
              isRequired
              type="password"
              variant="flat"
              color="default"
              labelPlacement="outside"
              placeholder="Password"
              endContent={
                <Key weight="bold" size={18} className="text-gray-600" />
              }
            />

            <Button
              color="primary"
              onClick={() => router.push("/owner/dashboard")}
              className="mt-4 font-semibold"
            >
              Login
            </Button>
          </div>
        </div>

        <p className="max-w-[500px] text-center text-sm font-medium text-default-500">
          TB. Sinar Baja - Jl. Letjend Sutoyo No.67, Burengan, Kec. Pesantren,
          Kabupaten Kediri, Jawa Timur 64131
        </p>
      </div>
    </>
  );
}
