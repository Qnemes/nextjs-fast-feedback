import { ChakraProvider } from "@chakra-ui/react";
import customTheme from 'src/styles/theme';

import { AuthProvider } from 'src/lib/auth';

import { MDXProvider } from '@mdx-js/react';
import MDXComponents from 'src/components/MDXComponents';

import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config';
import Head from 'next/head';

function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={customTheme}>
      <AuthProvider>
        <MDXProvider components={MDXComponents}>
          <DefaultSeo {...SEO} />
          <Head>
            <meta content="width=device-width, initial-scale=1" name="viewport" />
          </Head>
          <Component {...pageProps} />
        </MDXProvider>
      </AuthProvider >
    </ChakraProvider >
  )
}

export default App;
