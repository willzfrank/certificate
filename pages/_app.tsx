// CSS FILES
import '../styles/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import * as React from 'react';
import { Provider } from 'react-redux';
import type { AppPropsWithLayout } from 'app/types';
import Head from 'next/head';
import Script from 'next/script';

import makeStore from 'app/redux/store';
import { CookiesProvider } from 'react-cookie';
import { NotifyWrapper, PersistAuth as PersistAuthState } from 'app/components';
import { DragAndDropContainer } from 'app/components/dnd';

// initialize the store on the client
const store = makeStore();

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Script
        strategy="lazyOnload"
        src="https://www.googletagmanager.com/gtag/js?id=G-MQDNXW4B73"
      />
      <Script
        id="google-analytics"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-MQDNXW4B73');`,
        }}
      />
      <Head>
        <title>Certifications by Unify</title>
        <meta
          name="description"
          content="Certification by unify is an online learning platform that allows anyone to watch, listen and learn from our everyday STARS. Create an account to get started."
        />
        <meta name="title" content="Certifications by Unify" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph / Facebook */}

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Certifications by Unify" />
        <meta
          property="og:description"
          content="Certification by unify is an online learning platform that allows anyone to watch, listen and learn from our everyday STARS. Create an account to get started."
        />
        <meta property="og:url" content="https://certifications.unifyedu.ng" />
        <meta
          property="og:image"
          content="https://firebasestorage.googleapis.com/v0/b/certs-by-unify.appspot.com/o/Screenshot%202022-10-23%20at%2022.54.25.png?alt=media&token=ee9f5313-6206-429a-b229-a0d8454aa331"
        />
        <meta property="og:site_name" content="Certifications by Unify" />

        {/* Twitter */}

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:domain"
          content="https://certifications.unifyedu.ng"
        />
        <meta
          property="twitter:url"
          content="https://certifications.unifyedu.ng"
        />
        <meta name="twitter:title" content="Certifications by Unify" />
        <meta
          name="twitter:description"
          content="Certification by unify is an online learning platform that allows anyone to watch, listen and learn from our everyday STARS. Create an account to get started."
        />
        <meta
          name="twitter:image"
          content="https://firebasestorage.googleapis.com/v0/b/certs-by-unify.appspot.com/o/Screenshot%202022-10-23%20at%2022.54.25.png?alt=media&token=ee9f5313-6206-429a-b229-a0d8454aa331"
        />
      </Head>
      <Provider store={store}>
        {/* @ts-ignore */}
        <PersistAuthState>
          <CookiesProvider>
            <NotifyWrapper>
              <DragAndDropContainer>
                {getLayout(<Component {...pageProps} />)}
              </DragAndDropContainer>
            </NotifyWrapper>
          </CookiesProvider>
        </PersistAuthState>
      </Provider>
    </>
  );
}

export default MyApp;
