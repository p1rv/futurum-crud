import { createApi, fakeBaseQuery, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore/lite";
import { firebase } from "../../apis/firestore";
import { ICampaignEntry } from "../../types";

export const campaignsApi = createApi({
  reducerPath: "campaignsApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Campaigns", "SingleCampaign"],
  endpoints: (builder) => ({
    fetchCampaigns: builder.query<ICampaignEntry[], void>({
      async queryFn() {
        try {
          const ref = collection(firebase, "campaigns");
          const querySnapshot = await getDocs(ref);
          const results: ICampaignEntry[] = [];
          querySnapshot?.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() } as ICampaignEntry);
          });
          return { data: results };
        } catch (error: any) {
          console.error(error);
          return { error: error.message };
        }
      },
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "SingleCampaign" as const, id })), { type: "Campaigns", id: "LIST" }]
          : [{ type: "Campaigns", id: "LIST" }],
    }),
    updateCampaign: builder.mutation<null, ICampaignEntry>({
      async queryFn({ id, ...rest }) {
        try {
          await updateDoc(doc(firebase, "campaigns", id), rest);
          return { data: null };
        } catch (error: any) {
          console.error(error);
          return { error: error.message };
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: "SingleCampaign", id: arg.id }],
    }),
    deleteCampaign: builder.mutation<null, string>({
      async queryFn(id) {
        try {
          await deleteDoc(doc(firebase, "campaigns", id));
          return { data: null };
        } catch (error: any) {
          console.error(error);
          return { error: error.message };
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: "SingleCampaign", id: arg }],
    }),
    addCampaign: builder.mutation<null, Omit<ICampaignEntry, "id">>({
      async queryFn(newCampaign) {
        try {
          const ref = collection(firebase, "campaigns");
          await addDoc(ref, newCampaign);
          return { data: null };
        } catch (error: any) {
          console.error(error);
          return { error: error.message };
        }
      },
      invalidatesTags: () => [{ type: "Campaigns", id: "LIST" }],
    }),
  }),
});

export const { useFetchCampaignsQuery, useUpdateCampaignMutation, useDeleteCampaignMutation, useAddCampaignMutation } = campaignsApi;
