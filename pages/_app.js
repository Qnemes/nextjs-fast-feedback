import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from '@/lib/auth';
import Head from 'next/head'
import customTheme from '@/styles/theme';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={customTheme}>
      <AuthProvider>
        <Head>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <title>Fast Feedback</title>
        </Head>
        <Component {...pageProps} />
      </AuthProvider >
    </ChakraProvider >
  )
}

export default MyApp;
