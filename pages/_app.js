import propTypes from 'prop-types';
import Head from 'next/head';
import '../styles/global.css';
import { Provider } from 'react-redux';
import store from '../store/store';
import React, { useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <Provider store={store}>
          <Head>
            <title>내집마련</title>
          </Head>
          <Component {...pageProps} />
        </Provider>
      </SessionProvider>
    </>
  );
}

MyApp.propTypes = {
  Component: propTypes.elementType.isRequired,
};

export default MyApp;
