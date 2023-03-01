import { createApi, fakeBaseQuery, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { collection, getDocs } from "firebase/firestore/lite";
import { firebase } from "../../apis/firestore";
import { IBasicEntry } from "../../types";

export const townsApi = createApi({
  reducerPath: "townsApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    fetchTowns: builder.query<IBasicEntry[], void>({
      async queryFn() {
        try {
          const ref = collection(firebase, "towns");
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
  }),
});

export const { useFetchTownsQuery } = townsApi;
