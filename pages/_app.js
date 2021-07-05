import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from '@/lib/auth';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config';

import customTheme from '@/styles/theme';

function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={customTheme}>
      <AuthProvider>
        <DefaultSeo {...SEO} />
        <Head>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
        </Head>
        <Component {...pageProps} />
      </AuthProvider >
    </ChakraProvider >
  )
}

export default App;
