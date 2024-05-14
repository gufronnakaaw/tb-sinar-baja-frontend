import { Button, Input } from "@nextui-org/react";
import { ArrowLeft, Key, User } from "@phosphor-icons/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    if (username == "sbowner" && password == "sb3258") {
      return router.push("/owner/dashboard");
    }
    alert("username atau password salah");
  }
  return (
    <>
      <Head>
        <title>Login Owner</title>
      </Head>

      <div className="container grid h-screen w-full grid-rows-[1fr_100px] items-center justify-center gap-4">
        <div className="grid gap-8">
          <div className="text-center">
            <h1 className="text-[24px] font-bold leading-[140%] text-default-900">
              Selamat Datang Di Aplikasi{" "}
              <span className="text-primary">TB. Sinar Baja</span>
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
              placeholder="Username"
              endContent={
                <User weight="bold" size={18} className="text-gray-600" />
              }
              onChange={(e) => setUsername(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="mt-4 grid gap-2">
              <Button
                color="primary"
                onClick={handleLogin}
                className="font-semibold"
              >
                Login
              </Button>

              <Button
                variant="light"
                color="default"
                onClick={() => router.push("/")}
                startContent={<ArrowLeft weight="bold" size={16} />}
                className="font-semibold"
              >
                Kembali
              </Button>
            </div>
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
