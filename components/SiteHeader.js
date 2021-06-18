import React from 'react';
import NextLink from 'next/link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Flex,
  Box
} from '@chakra-ui/react';

// import EditSiteModal from './EditSiteModal';

const SiteHeader = ({ siteName }) => {

  return (
    <Box mx={4}>
      <Breadcrumb>
        <BreadcrumbItem>
          <NextLink href="/sites" passHref>
            <BreadcrumbLink>Sites</BreadcrumbLink>
          </NextLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink>{siteName || '-'}</BreadcrumbLink>
        </BreadcrumbItem>
        {/* {siteName && route && (
          <BreadcrumbItem>
            <NextLink href={`/site/${siteId}/${route}`} passHref>
              <BreadcrumbLink>{route}</BreadcrumbLink>
            </NextLink>
          </BreadcrumbItem>
        )} */}
      </Breadcrumb>
      <Flex justifyContent="space-between">
        <Heading mb={8}>{siteName || '-'}</Heading>
        {/* {isSiteOwner && (
          <EditSiteModal settings={site?.settings} siteId={siteId}>
            Edit Site
          </EditSiteModal>
        )} */}
      </Flex>
    </Box>
  );
};

export default SiteHeader;
