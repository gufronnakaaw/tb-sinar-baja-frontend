import LoadingScreen from "@/components/LoadingScreen";
import InputSearchBar from "@/components/input/InputSearchBar";
import MembersTable from "@/components/tables/MembersTable";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";
import { GlobalResponse } from "@/types/global.type";
import { MemberType } from "@/types/members";
import { fetcher } from "@/utils/fetcher";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useState } from "react";
import useSWR, { KeyedMutator } from "swr";

export const getServerSideProps = (async () => {
  const member: GlobalResponse<MemberType[]> = await fetcher({
    url: "/member",
    method: "GET",
  });

  return {
    props: {
      member,
    },
  };
}) satisfies GetServerSideProps<{ member: GlobalResponse<MemberType[]> }>;

export default function MemberPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const [search, setSearch] = useState("");
  const swr = useSWR<GlobalResponse<MemberType[]>>(
    {
      url: "/member",
      method: "GET",
    },
    fetcher,
    {
      fallbackData: props.member,
    },
  );

  if (swr.isLoading) {
    return <LoadingScreen role="owner" />;
  }

  if (swr.error) {
    console.log(swr.error);
  }

  const filter = swr.data?.data.filter((item) => {
    return (
      item.id_member.toLowerCase().includes(search.toLowerCase()) ||
      item.nama.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <SubComponentMemberPage
      {...{ member: filter, setSearch, mutate: swr.mutate }}
    />
  );
}

function SubComponentMemberPage({
  member,
  setSearch,
  mutate,
}: {
  member: MemberType[] | undefined;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  mutate: KeyedMutator<any>;
}) {
  return (
    <Layout title="Daftar Member">
      <Container className="gap-8">
        <h4 className="text-lg font-semibold text-default-900">
          Daftar Member
        </h4>

        <div className="grid gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <InputSearchBar
              placeholder="Cari ID Member atau Nama"
              className="w-full sm:max-w-[500px]"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <MembersTable member={member} role="owner" />
      </Container>
    </Layout>
  );
}
