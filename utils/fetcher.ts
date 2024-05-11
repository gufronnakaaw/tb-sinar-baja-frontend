import axios, { isAxiosError } from "axios";

type FetcherParams = {
  url: string;
  method: "GET" | "POST" | "PATCH" | "DELETE";
  data?: unknown;
  token?: string;
};

export async function fetcher({
  url,
  method,
  data,
  token,
}: FetcherParams) {
  const options = {
    url: "http://api.sinarbajakediri.my.id/api" + url,
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