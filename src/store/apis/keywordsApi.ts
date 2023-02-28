import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IBasicEntry } from "../../types";

export const keywordsApi = createApi({
  reducerPath: "keywordsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3003",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchKeywords: builder.query<IBasicEntry[], null>({
      query: () => ({ url: "/keywords", method: "GET" }),
    }),
  }),
});

export const { useFetchKeywordsQuery } = keywordsApi;
