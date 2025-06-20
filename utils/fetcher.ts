import axios, { isAxiosError } from "axios";

type FetcherParams = {
  url: string;
  method: "GET" | "POST" | "PATCH" | "DELETE";
  data?: unknown;
  token?: string;
};

function getUrl(mode: string) {
  if (mode == "dev") {
    return `http://sinarbajakediri.my.id:3434/api`;
  }

  if (mode == "prod") {
    return `http://172.168.22.15:2424/api`;
  }

  if (mode == "online") {
    return `http://sinarbajakediri.my.id:2626/api`;
  }

  if (mode == "vps") {
    return `https://apitoko.sinarbajakediri.my.id/api`;
  }
}

export async function fetcher({ url, method, data, token }: FetcherParams) {
  const options = {
    url: getUrl(process.env.NEXT_PUBLIC_MODE as string) + url,
    method,
  };

  if (data) {
    Object.assign(options, { data });
  }

  if (token) {
    Object.assign(options, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response?.data;
    }
  }
}
