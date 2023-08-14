import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { API_URL } from "app/constants";
import { RootState } from "app/types";

export const confirmPaymentApi = createApi({
  reducerPath: "confirmPaymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      const {
        user: { token },
      } = getState() as RootState;
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["PAYMENT"],
  endpoints: (builder) => {
    return {
      paymentConfirm: builder.query<any, { tx_ref: string }>({
        query: (arg) => ({
          url: `/Transactions/complete-transaction?transactionReference=${arg.tx_ref}`,
          method: "GET",
        }),
        providesTags: (result, error, id) => [{ type: "PAYMENT" }],
      }),
    };
  },
});

export const { usePaymentConfirmQuery, useLazyPaymentConfirmQuery } =
  confirmPaymentApi;
export default confirmPaymentApi;
