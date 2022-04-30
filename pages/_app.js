import propTypes from 'prop-types';
import Head from 'next/head';
import '../styles/global.css';
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>내집마련</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

MyApp.propTypes = {
  Component: propTypes.elementType.isRequired,
};

export default MyApp;
