import NextLink from 'next/link';
import { useRouter } from 'next/router'
import { Box, Flex, Link, Avatar, Button } from '@chakra-ui/react';

import { useAuth } from 'src/lib/auth';
import { FastFeedbackIcon } from 'src/styles/icons';
import Footer from './Footer';
import { NextSeo } from 'next-seo';

const DashboardShell = ({ children }) => {
  const router = useRouter();
  const { user, signout } = useAuth();

  const path = router.pathname;
  const capitalizedPath = path.charAt(1).toUpperCase() + path.slice(2);
  const title = `Fast Feedback – ${capitalizedPath}`;
  const url = `https://nextjs-fast-feedback.vercel.app${path}`;

  return (
    <>
      <NextSeo
        title={title}
        canonical={url}
        openGraph={{
          url,
          title
        }}
      />
      <Box backgroundColor="gray.100" h="100vh">
        <Flex
          backgroundColor="white"
          mb={[8, 16]}
          w="full"
          borderTop="5px solid #0AF5F4"
        >
          <Flex
            alignItems="center"
            justifyContent="space-between"
            pt={4}
            pb={4}
            maxW="1250px"
            margin="0 auto"
            w="full"
            px={8}
            h="60px"
          >
            <Flex align="center">
              <NextLink href="/" passHref>
                <Link marginRight={8}>
                  <FastFeedbackIcon aria-label="Back to homepage" boxSize="24px" />
                </Link>
              </NextLink>
              <NextLink href="/sites" passHref>
                <Link mr={4}>Sites</Link>
              </NextLink>
              <NextLink href="/feedback" passHref>
                <Link>Feedback</Link>
              </NextLink>
            </Flex>
            <Flex justifyContent="center" alignItems="center">
              {user && (
                <Button id="user-logout-button" mr={2} variant="ghost" onClick={() => signout()}>Log Out</Button>
              )}
              <NextLink href="/account" passHref>
                <Link id="account-link-button">
                  <Avatar size="sm" src={user?.photoUrl} />
                </Link>
              </NextLink>
            </Flex>
          </Flex>
        </Flex >
        <Flex margin="0 auto" direction="column" maxW="1250px" px={[0, 8, 8]}>
          {children}
        </Flex>
        <Footer />
      </Box >
    </>
  );
};

export default DashboardShell;
