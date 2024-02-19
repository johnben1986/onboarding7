import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en-US">
      <Head>
        <Script id="gtag-base">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-MGQDFLQGG2');
          `}
        </Script>
        <Script id="global-error-handler" strategy="beforeInteractive">
          {`
            window.addEventListener('error', event => {
              if (window.globalErrorHandler) {
                window.globalErrorHandler(event)
              }
            })
          
            window.addEventListener('unhandledrejection', event => {
              if (window.globalErrorHandler) {
                window.globalErrorHandler(event)
              }
            })
          `}
        </Script>
      </Head>

      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NJ9C69R"
            height="0"
            width="0"
            style={{
              display: "none",
              visibility: "hidden",
            }}
          ></iframe>
        </noscript>
        <Script id="gtag-base" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NJ9C69R');
          `}
        </Script>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-MGQDFLQGG2"
        ></Script>
        <Script id="taboola" strategy="afterInteractive">
          {`
            window._tfa = window._tfa || [];
            window._tfa.push({notify: 'event', name: 'page_view', id: 1550167});
            !function (t, f, a, x) {
                  if (!document.getElementById(x)) {
                      t.async = 1;t.src = a;t.id=x;f.parentNode.insertBefore(t, f);
                  }
            }(document.createElement('script'),
            document.getElementsByTagName('script')[0],
            '//cdn.taboola.com/libtrc/unip/1550167/tfa.js',
            'tb_tfa_script');
          `}
        </Script>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
