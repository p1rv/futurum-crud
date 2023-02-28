import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IBasicEntry, ICampaignEntry } from "../../types";

export const townsApi = createApi({
  reducerPath: "townsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3003",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchTowns: builder.query<IBasicEntry[], null>({
      query: () => ({ url: "/towns", method: "GET" }),
    }),
  }),
});

export const { useFetchTownsQuery } = townsApi;
