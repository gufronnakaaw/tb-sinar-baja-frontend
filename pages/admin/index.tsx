import { Button, Input } from "@nextui-org/react";
import { Eye, EyeSlash, User } from "@phosphor-icons/react";
import { signIn } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [input, setInput] = useState({});
  const [type, setType] = useState("password");

  async function handleLogin() {
    if (Object.keys(input).length < 2) return;

    const result = await signIn("credentials", {
      ...input,
      redirect: false,
    });

    if (result?.error) {
      const { error } = JSON.parse(result?.error);

      alert(error.message);
    }

    if (result?.ok) {
      return router.push("/admin/dashboard");
    }
  }

  return (
    <>
      <Head>
        <title>Login Admin</title>
      </Head>

      <div className="container grid h-screen w-full grid-rows-[1fr_100px] items-center justify-center gap-4">
        <div className="grid gap-8">
          <div className="text-center">
            <h1 className="text-[24px] font-bold leading-[140%] text-default-900">
              Selamat Datang Admin <br />
              <span className="text-teal-500">TB. Sinar Baja</span>
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
              name="username"
              autoComplete="off"
              endContent={
                <User weight="bold" size={18} className="text-gray-600" />
              }
              onChange={(e) =>
                setInput({
                  ...input,
                  [e.target.name]: e.target.value,
                })
              }
            />

            <Input
              isRequired
              type={type}
              variant="flat"
              color="default"
              labelPlacement="outside"
              placeholder="Password"
              name="password"
              endContent={
                <button
                  onClick={() =>
                    type == "password" ? setType("text") : setType("password")
                  }
                >
                  {type == "password" ? (
                    <Eye
                      weight="bold"
                      size={18}
                      className="cursor-pointer text-gray-600"
                    />
                  ) : (
                    <EyeSlash
                      weight="bold"
                      size={18}
                      className="cursor-pointer text-gray-600"
                    />
                  )}
                </button>
              }
              onChange={(e) =>
                setInput({
                  ...input,
                  [e.target.name]: e.target.value,
                })
              }
              onKeyUp={(e) => {
                if (e.key == "Enter") {
                  handleLogin();
                }
              }}
            />

            <Button
              onClick={handleLogin}
              className="bg-teal-500 font-semibold text-white"
            >
              Masuk
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
