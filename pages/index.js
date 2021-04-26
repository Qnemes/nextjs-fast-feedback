import { useAuth } from '@/lib/auth';
import { Button, Box, Flex, Text, Link } from "@chakra-ui/react";
import { FastFeedbackIcon } from '@/styles/icons';
import { Fragment } from 'react';
import Head from 'next/head'

export default function Home() {
  const auth = useAuth();

  return (
    <Fragment>
      <Box bg="gray.100" py={16} px={4}>
        <Flex as="main" direction="column" maxW="700px" margin="0 auto">
          <Head>
            <script
              dangerouslySetInnerHTML={{
                __html: `
              if (document.cookie && document.cookie.includes('fast-feedback-auth')) {
                window.location.href = "/dashboard"
              }
            `
              }}
            />
          </Head>
          <FastFeedbackIcon color="black" name="github" boxSize="48px" marginBottom={2} />
          <Text mb={4} fontSize="lg" paddingY={4}>
            <Text as="span" fontWeight="bold" display="inline">
              Fast Feedback
            </Text>
            {' was built as part of '}
            <Link
              href="https://react2025.com"
              isExternal
              textDecoration="underline"
            >
              React 2025
            </Link>
            {`. It's the easiest way to add comments or reviews to your static site. Try it out by leaving a comment below. After the comment is approved, it will display below.`}
          </Text>
          {auth.user ? (
            <Button
              as="a"
              href="/dashboard"
              backgroundColor="gray.900"
              color="white"
              fontWeight="medium"
              mt={4}
              maxW="200px"
              _hover={{ bg: 'gray.700' }}
              _active={{
                bg: 'gray.800',
                transform: 'scale(0.95)'
              }}
            >
              View Dashboard
            </Button>
          ) : (
            <Button as="a"
              backgroundColor="gray.900"
              color="white"
              fontWeight="medium"
              mt={4}
              maxW="200px"
              _hover={{ bg: 'gray.700' }}
              _active={{
                bg: 'gray.800',
                transform: 'scale(0.95)'
              }}
              onClick={(e) => auth.signinWithGitHub()}>Sign In</Button>
          )}
        </Flex>
      </Box>
    </Fragment>
  )
}
