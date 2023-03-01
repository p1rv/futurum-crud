import { createApi, fakeBaseQuery, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { addDoc, collection, getDocs } from "firebase/firestore/lite";
import { firebase } from "../../apis/firestore";
import { IBasicEntry } from "../../types";

export const keywordsApi = createApi({
  reducerPath: "keywordsApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Keywords"],
  endpoints: (builder) => ({
    fetchKeywords: builder.query<IBasicEntry[], void>({
      providesTags: () => [{ type: "Keywords", id: "LIST" }],
      async queryFn() {
        try {
          const ref = collection(firebase, "keywords");
          const querySnapshot = await getDocs(ref);
          const results: IBasicEntry[] = [];
          querySnapshot?.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() } as IBasicEntry);
          });
          return { data: results };
        } catch (error: any) {
          console.error(error);
          return { error: error.message };
        }
      },
    }),
    addKeyword: builder.mutation<null, string>({
      invalidatesTags: () => [{ type: "Keywords", id: "LIST" }],
      async queryFn(newKeyword) {
        try {
          const ref = collection(firebase, "keywords");
          await addDoc(ref, { name: newKeyword });
          return { data: null };
        } catch (error: any) {
          console.error(error);
          return { error: error.message };
        }
      },
    }),
  }),
});

export const { useFetchKeywordsQuery, useAddKeywordMutation } = keywordsApi;
