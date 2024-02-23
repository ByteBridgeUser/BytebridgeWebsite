import GothamBook from 'assets/fonts/gotham-book.woff2';
import GothamMedium from 'assets/fonts/gotham-medium.woff2';
import { fontStyles, tokenStyles } from 'components/ThemeProvider';
import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />

        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {/* <link rel="shortcut icon" href="/favicon.png" type="image/png"/> */}
        {/* <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" /> */}
        {/* <link rel="apple-touch-icon" href="/icon-256.png" /> */}
        <link type="text/plain" rel="author" href="/humans.txt" />

        <link rel="preload" href={GothamMedium} as="font" crossOrigin="true" />
        <link rel="preload" href={GothamBook} as="font" crossOrigin="true" />
        <style dangerouslySetInnerHTML={{ __html: fontStyles }} />
        <style dangerouslySetInnerHTML={{ __html: tokenStyles }} />
        <script type="module" src="https://unpkg.com/@splinetool/viewer@1.0.38/build/spline-viewer.js"></script>
        <script src="https://kit.fontawesome.com/586d61eb04.js" crossorigin="anonymous"></script>
      </Head>
      <body data-theme="dark" tabIndex={-1}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              const initialTheme = JSON.parse(localStorage.getItem('theme'));
              document.body.dataset.theme = initialTheme || 'dark';
            `,
          }}
        />
        <Main />
        <NextScript />
        <div id="portal-root" />
     
      </body>
    </Html>
  );
}
