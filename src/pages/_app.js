import { useEffect } from 'react';

import Head from 'next/head';
import Layout from 'src/components/layout/Layout';

import 'bootstrap/dist/css/bootstrap.css';
import 'styles/globals.css';

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
               content="width=device-width, initialscale=1"
            />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <Layout>
            <Component {...pageProps} />
         </Layout>
      </>
   );
}
