import { Button } from "@nextui-org/react";

// components
import InputSearchBar from "@/components/input/InputSearchBar";
import Container from "@/components/wrapper/DashboardContainer";
import Layout from "@/components/wrapper/DashboardLayout";

import LoadingScreen from "@/components/LoadingScreen";
import LevelsTable from "@/components/tables/LevelsTable";
import { GlobalResponse } from "@/types/global.type";
import { LevelType } from "@/types/members";
import { fetcher } from "@/utils/fetcher";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useState } from "react";
import useSWR from "swr";

export const getServerSideProps = (async () => {
  const level: GlobalResponse<LevelType[]> = await fetcher({
    url: "/level",
    method: "GET",
  });

  return {
    props: {
      level,
    },
  };
}) satisfies GetServerSideProps<{ level: GlobalResponse<LevelType[]> }>;

export default function LevelsPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const [search, setSearch] = useState("");
  const swr = useSWR<GlobalResponse<LevelType[]>>(
    {
      url: "/level",
      method: "GET",
    },
    fetcher,
    {
      fallbackData: props.level,
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
      item.id_level.toLowerCase().includes(search.toLowerCase()) ||
      item.nama.toLowerCase().includes(search.toLowerCase())
    );
  });

  return <SubComponentLevelsPage {...{ level: filter, setSearch }} />;
}

function SubComponentLevelsPage({
  level,
  setSearch,
}: {
  level: LevelType[] | undefined;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <Layout title="Level Member">
      <Container className="gap-8">
        <h4 className="text-lg font-semibold text-default-900">Level Member</h4>

        <div className="grid gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <InputSearchBar
              placeholder="Cari ID Level atau Nama"
              className="w-full sm:max-w-[500px]"
              onChange={(e) => setSearch(e.target.value)}
            />

            <Button
              variant="solid"
              color="primary"
              className="w-full font-medium sm:w-max"
            >
              Tambah Level
            </Button>
          </div>

          <LevelsTable level={level} role="owner" />
        </div>
      </Container>
    </Layout>
  );
}
