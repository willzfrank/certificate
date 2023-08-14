import type { NextPage } from "next";
import { ReactNode, ReactElement } from "react";
import type { AppProps } from "next/app";


export type NextPageWithLayout<T> = NextPage<T> & { getLayout?: (page: ReactNode) => ReactElement }
export type AppPropsWithLayout = AppProps & { Component: NextPageWithLayout<{}> }