import "@/styles/globals.css";
import { fetcher } from "@/utils/fetcher";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider, getSession, signOut } from "next-auth/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import NextNProgress from "nextjs-progressbar";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { SWRConfig } from "swr";

const routeLogin = ["/", "/owner", "/admin", "/cashier"];

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();

  function setColor() {
    const ownerColor = "#006FEE";
    const adminColor = "#14b8a6";
    const cashierColor = "#f43f5e";
    const defaultColor = "#000";

    if (router.pathname.startsWith("/owner")) {
      return ownerColor;
    }

    if (router.pathname.startsWith("/admin")) {
      return adminColor;
    }

    if (router.pathname.startsWith("/cashier")) {
      return cashierColor;
    }

    return defaultColor;
  }

  useEffect(() => {
    window.onfocus = async () => {
      if (!routeLogin.includes(router.asPath)) {
        const session = await getSession();

        if (!session) {
          await signOut({
            redirect: false,
            callbackUrl: `/${router.asPath.split("/")[1]}`,
          });

          router.push(`/${router.asPath.split("/")[1]}`);
        }
      }
    };
  }, [router]);

  return (
    <NextUIProvider>
      <NextNProgress color={setColor()} />
      <SessionProvider session={session} refetchOnWindowFocus={false}>
        <Toaster />
        <SWRConfig value={{ refreshInterval: 10 * 1000, fetcher }}>
          <Component {...pageProps} />
        </SWRConfig>
      </SessionProvider>
    </NextUIProvider>
  );
}
