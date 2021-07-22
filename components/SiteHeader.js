import { Fragment } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Heading, Flex, Box } from '@chakra-ui/react';

import { NextSeo } from 'next-seo';
import EditSiteModal from './EditSiteModal';

const SiteHeader = ({ isSiteOwner, site, siteId, route }) => {
  const siteName = site?.siteName;
  const router = useRouter();
  const path = router.asPath;

  const title = siteName ? `Fast Feedback – ${siteName}` : `Fast Feedback – Loading...`;
  const url = `https://nextjs-fast-feedback.vercel.app${path}`;

  return (
    <Fragment>
      <NextSeo
        title={title}
        canonical={url}
        openGraph={{
          url,
          title,
        }}
      />
      <Box mx={4}>
        <Breadcrumb>
          <BreadcrumbItem>
            <NextLink href="/sites" passHref>
              <BreadcrumbLink>Sites</BreadcrumbLink>
            </NextLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <NextLink href={`/site/${siteId}`} passHref>
              <BreadcrumbLink>{siteName || '-'}</BreadcrumbLink>
            </NextLink>
          </BreadcrumbItem>
          {siteName && route && (
            <BreadcrumbItem>
              <NextLink href={`/site/${siteId}/${route}`} passHref>
                <BreadcrumbLink>{route}</BreadcrumbLink>
              </NextLink>
            </BreadcrumbItem>
          )}
        </Breadcrumb>
        <Flex justifyContent="space-between">
          <Heading mb={8}>{siteName || '-'}</Heading>
          {isSiteOwner && (
            <EditSiteModal settings={site?.settings} siteId={siteId}>
              Edit Site
            </EditSiteModal>
          )}
        </Flex>
      </Box>
    </Fragment>
  );
};

export default SiteHeader;
