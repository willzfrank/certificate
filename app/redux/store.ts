import { configureStore, Middleware } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { userSlice, courseSlice, modalSlice } from './slices';
import authApi from 'app/api/authApi';
import courseApi from 'app/api/courseApi';
import categoriesApi from 'app/api/categoriesApi';
import courseCreationApi from 'app/api/courseCreationApi';
import { userApi, professionsApi } from 'app/api/userApi';
import wishlistApi from 'app/api/wishlistApi';
import wishListSlice from './slices/wishlistSlice';
import subscriptionApi from 'app/api/subscriptionApi';
import confirmPaymentApi from 'app/api/confirmPaymentApi';
import ratingsApi from 'app/api/ratingsApi';

const middlewares: Array<Middleware> = [
  authApi.middleware,
  userApi.middleware,
  professionsApi.middleware,
  courseApi.middleware,
  categoriesApi.middleware,
  courseCreationApi.middleware,
  wishlistApi.middleware,
  subscriptionApi.middleware,
  confirmPaymentApi.middleware,
  ratingsApi.middleware,
];

const makeStore = () =>
  configureStore({
    reducer: {
      user: userSlice.reducer,
      course: courseSlice.reducer,
      modalToggle: modalSlice.reducer,
      [authApi.reducerPath]: authApi.reducer,
      [userApi.reducerPath]: userApi.reducer,
      [wishListSlice.name]: wishListSlice.reducer,
      [professionsApi.reducerPath]: professionsApi.reducer,
      [courseApi.reducerPath]: courseApi.reducer,
      [categoriesApi.reducerPath]: categoriesApi.reducer,
      [courseCreationApi.reducerPath]: courseCreationApi.reducer,
      [wishlistApi.reducerPath]: wishlistApi.reducer,
      [subscriptionApi.reducerPath]: subscriptionApi.reducer,
      [confirmPaymentApi.reducerPath]: confirmPaymentApi.reducer,
      [ratingsApi.reducerPath]: ratingsApi.reducer,
    },
    middleware: (getDefaultMiddleware: any) =>
      getDefaultMiddleware().concat(middlewares),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

/**
 * the 'next-redux-wrapper' allows us to connect redux and nextjs. it gives us the ability
 * to make a store and dispatch actions from the server. this is useful for server-side rendering.
 * In our case, it allows us use RTKQuery for server-related stuffs like getStaticProps, getStaticPath, etc
 *
 * RESOURCES TO HELP YOU FIGURE OUT HOW TO USE 'next-redux-wrapper';
 *
 * [https://redux-toolkit.js.org/rtk-query/usage/server-side-rendering#server-side-rendering-with-nextjs]([https://redux-toolkit.js.org/rtk-query/usage/server-side-rendering#server-side-rendering-with-nextjs)
 * [https://github.com/phryneas/ssr-experiments/tree/main/nextjs-blog](https://github.com/phryneas/ssr-experiments/tree/main/nextjs-blog)
 */
export const wrapper = createWrapper<AppStore>(makeStore, { debug: false });

export default makeStore;
