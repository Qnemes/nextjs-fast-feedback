import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from '@/lib/auth';
import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config';

import customTheme from '@/styles/theme';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={customTheme}>
      <AuthProvider>
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </AuthProvider >
    </ChakraProvider >
  )
}

export default MyApp;
