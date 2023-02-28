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
  tagTypes: ["Keywords"],
  endpoints: (builder) => ({
    fetchKeywords: builder.query<IBasicEntry[], null>({
      providesTags: () => [{ type: "Keywords", id: "LIST" }],
      query: () => ({ url: "/keywords", method: "GET" }),
    }),
    addKeyword: builder.mutation<IBasicEntry[], string>({
      invalidatesTags: () => [{ type: "Keywords", id: "LIST" }],
      query: (newKeyword) => ({ url: "/keywords", method: "POST", body: { name: newKeyword } }),
    }),
  }),
});

export const { useFetchKeywordsQuery, useAddKeywordMutation } = keywordsApi;
