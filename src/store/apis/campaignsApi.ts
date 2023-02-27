import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICampaignEntry } from "../../types";

export const campaignsApi = createApi({
  reducerPath: "campaignsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3003",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchCampaigns: builder.query<ICampaignEntry[], null>({
      query: () => ({ url: "/campaigns", method: "GET" }),
    }),
  }),
});

export const { useFetchCampaignsQuery } = campaignsApi;
