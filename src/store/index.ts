import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { useDispatch } from "react-redux";
import { campaignsApi } from "./apis/campaignsApi";
import { townsApi } from "./apis/townsApi";

const store = configureStore({
  reducer: {
    [campaignsApi.reducerPath]: campaignsApi.reducer,
    [townsApi.reducerPath]: townsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(campaignsApi.middleware).concat(townsApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export { useFetchCampaignsQuery, useUpdateCampaignMutation, useDeleteCampaignMutation } from "./apis/campaignsApi";
export { useFetchTownsQuery } from "./apis/townsApi";

export default store;
