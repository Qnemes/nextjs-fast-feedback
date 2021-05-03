import React from 'react';
import NextLink from 'next/link';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Heading, Flex, Box } from '@chakra-ui/react';

const FeedbackTableHeader = () => (
  <Box mx={4}>
    <Breadcrumb>
      <BreadcrumbItem>
        <NextLink href="/feedback" passHref>
          <BreadcrumbLink>Feedback</BreadcrumbLink>
        </NextLink>
      </BreadcrumbItem>
    </Breadcrumb>
    <Flex justifyContent="space-between">
      <Heading mb={8}>All Feedback</Heading>
    </Flex>
  </Box>
);

export default FeedbackTableHeader;
