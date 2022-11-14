import { QueryParams } from "@pet/animal";
import { getVariable } from "../utils";
const apiTokenUrl = getVariable("VITE_PET_FINDER_TOKEN_URL");
const clientId = getVariable("VITE_PET_FINDER_CLIENT_ID");
const clientSecret = getVariable("VITE_PET_FINDER_CLIENT_SECRET");

const apiBaseUrl = "https://api.petfinder.com/v2";

const options = {
  method: "POST",
  body: new URLSearchParams({
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret,
  }),
};

export async function fetchToken(): Promise<string> {
  const response = await globalThis.fetch(apiTokenUrl, options);
  const data = await response.json();
  return data.access_token;
}

export type Response<T> = Promise<[T | null, Error | null]>;
export async function fetchData<T>(
  apiUrl: string,
  params: QueryParams = {}
): Response<T> {
  try {
    const token = await fetchToken();
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const url = `${apiBaseUrl}${apiUrl}`;

    const baseUrl = new URL(url);

    const searchParams = new URLSearchParams(baseUrl.search);
    const paramsEntries = Object.entries(params);
    if (paramsEntries.length > 0) {
      paramsEntries.forEach(([key, value]) => {
        searchParams.append(key, value);
      });
      baseUrl.search = searchParams.toString();
    }

    const response = await globalThis.fetch(baseUrl.toString(), options);
    const data = (await response.json()) as T;
    return [data, null];
  } catch (error) {
    let message = "Something went wrong";
    if (error instanceof Error) message = error.message;
    return [null, new Error(message)];
  }
}
