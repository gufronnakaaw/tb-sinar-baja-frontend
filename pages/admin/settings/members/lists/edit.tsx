import {
  Button,
  Input,
  Select,
  SelectItem,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// components & utils
import ButtonBack from "@/components/button/ButtonBack";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";
import { GlobalResponse } from "@/types/global.type";
import { LevelType, MemberType } from "@/types/members";
import { fetcher } from "@/utils/fetcher";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export default function MemberUpdate(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const [input, setInput] = useState({});
  const [levelId, setLevelId] = useState("");

  const [level, setLevel] = useState<LevelType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getLevel();

    async function getLevel() {
      try {
        const response: GlobalResponse<LevelType[]> = await fetcher({
          url: "/level",
          method: "GET",
        });

        setLevel(response.data);
      } catch (error) {
        alert("terjadi kesalahan saat mengambil data level");
      }
    }
  }, []);

  const router = useRouter();

  async function handleUpdate() {
    setLoading(true);

    const data = {};

    if (!levelId) {
      Object.assign(data, {
        id_member: props.member?.id_member,
        ...input,
      });
    } else {
      Object.assign(data, {
        id_member: props.member?.id_member,
        level_id: levelId,
        ...input,
      });
    }

    try {
      await fetcher({
        url: "/member",
        method: "PATCH",
        data,
      });
      alert("update member berhasil");
      return router.back();
    } catch (error) {
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
    <Layout title="Update Member">
      <Container className="gap-12">
        <ButtonBack
          onClick={() => router.back()}
          className="justify-self-start text-teal-500"
        >
          Kembali
        </ButtonBack>

        <div className="grid gap-8">
          <div className="grid w-max gap-2 border-l-4 border-teal-500 p-[1rem_0_1rem_1rem]">
            <h4 className="text-[18px] font-bold text-default-900">
              Informasi Member
            </h4>

            <div className="grid gap-[2px]">
              <div className="grid grid-cols-[170px_10px_10fr]  gap-1 text-sm text-default-900">
                <div className="text-sm font-medium text-default-600">
                  Nama Member
                </div>
                <div className="font-medium">:</div>
                <p className="font-bold text-teal-500">{props.member?.nama}</p>
              </div>
              <div className="grid grid-cols-[170px_10px_10fr]  gap-1 text-sm text-default-900">
                <div className="text-sm font-medium text-default-600">
                  Level Member
                </div>
                <div className="font-medium">:</div>
                <p className="font-bold text-teal-500">{props.member?.level}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <Select
              label="Pilih Level"
              size="sm"
              defaultSelectedKeys={props.member?.level}
              onChange={(e) => {
                setLevelId(e.target.value);
              }}
            >
              {level.map((item) => (
                <SelectItem key={item.id_level} value={item.id_level}>
                  {item.nama}
                </SelectItem>
              ))}
            </Select>

            <div className="grid grid-cols-3 gap-2">
              <Input
                defaultValue={props.member?.nama}
                isRequired
                variant="flat"
                color="default"
                label="Nama Member"
                labelPlacement="outside"
                name="nama"
                placeholder="Ex: Member 1"
                onChange={(e) => {
                  setInput({
                    ...input,
                    [e.target.name]: e.target.value,
                  });
                }}
              />

              <Input
                defaultValue={props.member?.email}
                isRequired
                variant="flat"
                color="default"
                label="Email"
                labelPlacement="outside"
                name="email"
                placeholder="Ex: sup1@mail.com"
                onChange={(e) => {
                  setInput({
                    ...input,
                    [e.target.name]: e.target.value,
                  });
                }}
              />

              <Input
                defaultValue={props.member?.no_telp}
                isRequired
                variant="flat"
                color="default"
                label="No Telpon"
                labelPlacement="outside"
                name="no_telp"
                placeholder="Ex: 081122334455"
                onChange={(e) => {
                  setInput({
                    ...input,
                    [e.target.name]: e.target.value,
                  });
                }}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Textarea
                defaultValue={props.member?.perusahaan}
                isRequired
                variant="flat"
                maxRows={3}
                label="Perusahaan"
                labelPlacement="outside"
                name="perusahaan"
                placeholder="Ex: Perusahaan Beton"
                onChange={(e) => {
                  setInput({
                    ...input,
                    [e.target.name]: e.target.value,
                  });
                }}
              />

              <Textarea
                defaultValue={props.member?.alamat}
                isRequired
                variant="flat"
                maxRows={3}
                label="Alamat"
                labelPlacement="outside"
                name="alamat"
                placeholder="Ex: Jln Melati"
                onChange={(e) => {
                  setInput({
                    ...input,
                    [e.target.name]: e.target.value,
                  });
                }}
              />
            </div>
          </div>

          {loading ? (
            <Button
              variant="solid"
              startContent={<Spinner color="white" size="sm" />}
              className={`${loading ? "cursor-not-allowed justify-self-end bg-teal-500 font-medium text-white" : ""}`}
            >
              Tunggu
            </Button>
          ) : (
            <Button
              variant="solid"
              size="md"
              onClick={handleUpdate}
              className="w-max justify-self-end bg-teal-500 font-medium text-white"
            >
              Update Member
            </Button>
          )}
        </div>
      </Container>
    </Layout>
  );
}

export const getServerSideProps = (async ({ query }) => {
  const result: GlobalResponse<MemberType[]> = await fetcher({
    url: "/member",
    method: "GET",
  });

  const member = result.data.find((item) => item.id_member == query?.id_member);

  return {
    props: {
      member,
    },
  };
}) satisfies GetServerSideProps<{ member: MemberType | undefined }>;
