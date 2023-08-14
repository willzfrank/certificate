import { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://unicons.iconscout.com/release/v4.0.8/css/line.css"
        ></link>

        <Script src="https://cdn.plyr.io/3.7.8/plyr.polyfilled.js" />
      </Head>
      <body>
        <div id="fixed" className="fixed z-50 w-screen"></div>
        <div id="mainapp">
          <Main />
        </div>
        <NextScript />
      </body>
    </Html>
  );
}
