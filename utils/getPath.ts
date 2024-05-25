import { NextRouter } from "next/router";

export function getPath(router: NextRouter) {
  if (router.pathname.startsWith("/owner")) {
    return "owner";
  }

  if (router.pathname.startsWith("/admin")) {
    return "admin";
  }

  if (router.pathname.startsWith("/cashier")) {
    return "cashier";
  }
}
