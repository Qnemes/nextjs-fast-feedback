import { Fragment } from 'react';
import Head from 'next/head';
import { getAllFeedback, getSite } from 'src/lib/db-admin';
import { useAuth } from 'src/lib/auth';

import { Box, Button, Flex, Text, Link } from "@chakra-ui/react";
import { FastFeedbackIcon } from 'src/styles/icons';
import { ArrowForwardIcon } from '@chakra-ui/icons';

import LoginButtons from 'src/components/LoginButtons';
import FeedbackLink from 'src/components/FeedbackLink';
import Feedback from 'src/components/Feedback';
import Footer from 'src/components/Footer';

const SITE_ID = process.env.NEXT_PUBLIC_HOME_PAGE_SITE_ID;

export async function getStaticProps() {
  const { feedback } = await getAllFeedback(SITE_ID);
  const { site } = await getSite(SITE_ID);

  return {
    props: {
      allFeedback: feedback,
      site
    },
    revalidate: 1
  };
}

export default function Home({ allFeedback, site }) {
  const auth = useAuth();

  return (
    <Fragment>
      <Box bg="gray.100" py={16} px={4}>
        <Flex as="main" direction="column" maxW="700px" margin="0 auto">
          {/* <Head>
            <script
              dangerouslySetInnerHTML={{
                __html: `
              if (document.cookie && document.cookie.includes('fast-feedback-auth')) {
                window.location.href = "/sites"
              }
            `
              }}
            />
          </Head> */}
          <FastFeedbackIcon color="black" name="logo" boxSize="48px" mb={2} />
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
              href="/sites"
              backgroundColor="gray.900"
              paddingRight={2}
              rightIcon={<ArrowForwardIcon />}
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
            <LoginButtons />
          )}
        </Flex>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        width="full"
        maxWidth="700px"
        margin="0 auto"
        mt={8}
        px={4}
      >
        <FeedbackLink paths={[SITE_ID]} />
        {allFeedback.map((feedback, index) => (
          <Feedback
            key={feedback.id}
            settings={site?.settings}
            isLast={index === allFeedback.length - 1}
            {...feedback}
          />
        ))}
      </Box>
      <Footer />
    </Fragment>
  )
}
