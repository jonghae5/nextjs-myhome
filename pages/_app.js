import propTypes from 'prop-types';
import Head from 'next/head';
import '../styles/global.css';
import { Provider } from 'react-redux';
import store from '../store/store';
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <Head>
          <title>내집마련</title>
        </Head>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

MyApp.propTypes = {
  Component: propTypes.elementType.isRequired,
};

export default MyApp;
