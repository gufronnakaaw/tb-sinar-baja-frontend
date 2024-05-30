import {
  Button,
  Checkbox,
  CheckboxGroup,
  Input,
  Spinner,
} from "@nextui-org/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

// components
import ButtonBack from "@/components/button/ButtonBack";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";

// utils
import { GlobalResponse } from "@/types/global.type";
import { fetcher } from "@/utils/fetcher";

type PenggunaType = {
  username: string;
  nama: string;
  password_encrypt: string;
  role: string;
  created_at: string;
  updated_at: string;
};

export default function EditUser({
  pengguna,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [input, setInput] = useState({});
  const [role, setRole] = useState<string[] | any>(pengguna?.role.split(","));
  const [loading, setLoading] = useState(false);

  async function handleUpdate() {
    setLoading(true);
    try {
      await fetcher({
        url: "/pengguna",
        method: "PATCH",
        data: {
          username: pengguna?.username,
          ...input,
          role: role.join(","),
        },
      });
      setLoading(false);
      alert("update berhasil");
      return router.push("/owner/users");
    } catch (error) {
      setLoading(false);
      const response = error as {
        success: boolean;
        status_code: number;
        error: { name: string; message: string };
      };

      if (response.status_code >= 500) {
        console.log(response.error);
        return alert("terjadi masalah pada server");
      }

      if (response.status_code >= 400) {
        console.log(response.error);
        return alert(response.error.message);
      }

      console.log(response.error);
      return alert("terjadi error tidak diketahui pada aplikasi");
    }
  }

  return (
    <Layout title="Edit Pengguna">
      <Container className="gap-12">
        <ButtonBack onClick={() => router.push("/owner/users")}>
          Kembali
        </ButtonBack>

        <div className="grid gap-6">
          <Input
            isRequired
            variant="flat"
            color="default"
            label="Nama"
            labelPlacement="outside"
            name="nama"
            placeholder="Masukan nama"
            defaultValue={pengguna?.nama}
            onChange={(e) => {
              setInput({
                ...input,
                [e.target.name]: e.target.value,
              });
            }}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              isRequired
              variant="flat"
              color="default"
              label="Kata Sandi Lama"
              labelPlacement="outside"
              name="password_old"
              placeholder="Masukan kata sandi lama"
              onChange={(e) => {
                setInput({
                  ...input,
                  [e.target.name]: e.target.value,
                });
              }}
            />

            <Input
              isRequired
              variant="flat"
              color="default"
              label="Kata Sandi Baru"
              labelPlacement="outside"
              name="password_new"
              placeholder="Masukan kata sandi baru"
              onChange={(e) => {
                setInput({
                  ...input,
                  [e.target.name]: e.target.value,
                });
              }}
            />
          </div>

          <CheckboxGroup
            orientation="horizontal"
            label={
              <span className="inline-flex text-sm text-default-900 after:ml-[1px] after:text-danger after:content-['*']">
                Pilih Role
              </span>
            }
            defaultValue={role}
          >
            <Checkbox
              value="owner"
              onChange={(e) => {
                if (e.target.checked) {
                  setRole([...role, e.target.value]);
                } else {
                  const filter = role?.filter(
                    (item: string) => item !== e.target.value,
                  );

                  setRole([...filter]);
                }
              }}
              defaultSelected={role?.includes("owner")}
            >
              Owner
            </Checkbox>
            <Checkbox
              value="admin"
              onChange={(e) => {
                if (e.target.checked) {
                  setRole([...role, e.target.value]);
                } else {
                  const filter = role?.filter(
                    (item: string) => item !== e.target.value,
                  );

                  setRole([...filter]);
                }
              }}
              defaultSelected={role?.includes("admin")}
            >
              Admin
            </Checkbox>

            <Checkbox
              value="cashier"
              onChange={(e) => {
                if (e.target.checked) {
                  setRole([...role, e.target.value]);
                } else {
                  const filter = role?.filter(
                    (item: string) => item !== e.target.value,
                  );

                  setRole([...filter]);
                }
              }}
              defaultSelected={role?.includes("cashier")}
            >
              Kasir
            </Checkbox>
          </CheckboxGroup>
        </div>

        {loading ? (
          <Button
            variant="solid"
            color="primary"
            startContent={<Spinner color="white" size="sm" />}
            className={`${loading ? "cursor-not-allowed justify-self-end font-medium" : ""}`}
          >
            Tunggu
          </Button>
        ) : (
          <Button
            variant="solid"
            color="primary"
            size="md"
            onClick={handleUpdate}
            className="w-max justify-self-end font-medium"
          >
            Update Pengguna
          </Button>
        )}
      </Container>
    </Layout>
  );
}

export const getServerSideProps = (async ({ query }) => {
  const result = await fetcher({
    url: "/pengguna",
    method: "GET",
  });

  const pengguna: GlobalResponse<PenggunaType[]> = result;

  return {
    props: {
      pengguna: pengguna.data.find((item) => item.username == query?.username),
    },
  };
}) satisfies GetServerSideProps<{
  pengguna: GlobalResponse<PenggunaType> | any;
}>;
