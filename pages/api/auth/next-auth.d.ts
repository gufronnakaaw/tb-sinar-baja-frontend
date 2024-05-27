import "next-auth";
import "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    nama: string;
    role: string[];
  }
}

declare module "next-auth" {
  interface User {
    nama: string;
    role: string[];
    id?: string;
  }

  interface Session {
    user: {
      nama: string;
      role: string[];
    };
  }
}
