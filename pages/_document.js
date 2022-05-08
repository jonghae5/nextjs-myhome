import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
  render() {
    return (
      <Html>
        <Head>
          {/* 네이버 로그인 */}
          <script
            type='text/javascript'
            src='https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js'
            charSet='utf-8'
          />
          <meta charSet='utf-8' />
          {/* 여기어때 폰트 */}
          <link rel='stylesheet' href='../fonts/fonts.css' />
          {/* 카카오 지도 */}
          <script src='https://developers.kakao.com/sdk/js/kakao.js'></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
