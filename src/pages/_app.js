import { useEffect } from 'react';
import { Provider } from 'react-redux';

import Head from 'next/head';
import Layout from 'src/components/layout/Layout';
import store from '../store/redux/index';

import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
   useEffect(() => {
      import('bootstrap/dist/js/bootstrap.bundle');
   }, []);

   return (
      <>
         <Head>
            <title>Realtime Chat Demo - Next.js</title>
            <meta
               name="description"
               content="An experimental web application that uses web sockets"
            />
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <Layout>
            <Provider store={store}>
               <Component {...pageProps} />
            </Provider>
         </Layout>
      </>
   );
}
