import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { useDispatch } from "react-redux";
import { campaignsApi } from "./apis/campaignsApi";

const store = configureStore({
  reducer: {
    [campaignsApi.reducerPath]: campaignsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(campaignsApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export { useFetchCampaignsQuery, useUpdateCampaignMutation, useDeleteCampaignMutation } from "./apis/campaignsApi";

export default store;
