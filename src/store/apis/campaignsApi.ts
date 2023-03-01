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
  tagTypes: ["Campaigns", "SingleCampaign"],
  endpoints: (builder) => ({
    fetchCampaigns: builder.query<ICampaignEntry[], null>({
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "SingleCampaign" as const, id })), { type: "Campaigns", id: "LIST" }]
          : [{ type: "Campaigns", id: "LIST" }],
      query: () => ({ url: "/campaigns", method: "GET" }),
    }),
    addCampaign: builder.mutation<ICampaignEntry, Omit<ICampaignEntry, "id">>({
      invalidatesTags: () => [{ type: "Campaigns", id: "LIST" }],
      query: (campaign) => ({ url: "/campaigns", method: "POST", body: campaign }),
    }),
    updateCampaign: builder.mutation<ICampaignEntry, ICampaignEntry>({
      invalidatesTags: (result, error, arg) => [{ type: "SingleCampaign", id: arg.id }],
      query: ({ id, ...rest }) => ({ url: `/campaigns/${id}`, method: "PUT", body: { ...rest } }),
    }),
    deleteCampaign: builder.mutation<ICampaignEntry, ICampaignEntry["id"]>({
      invalidatesTags: (result, error, arg) => [{ type: "SingleCampaign", id: arg }],
      query: (id) => ({ url: `/campaigns/${id}`, method: "DELETE" }),
    }),
  }),
});

export const { useFetchCampaignsQuery, useUpdateCampaignMutation, useDeleteCampaignMutation, useAddCampaignMutation } = campaignsApi;
