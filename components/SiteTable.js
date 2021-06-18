import React from 'react';
import NextLink from 'next/link';
import { Box, Link } from '@chakra-ui/react';
import { parseISO, format } from 'date-fns';
import { Table, Tr, Th, Td } from './Table';
// import DeleteSiteButton from './DeleteSiteButton';

const SiteTable = ({ sites }) => {
  return (
    <Box overflowX="scroll">
      <Table w="full">
        <thead>
          <Tr>
            <Th>Name</Th>
            <Th>Site Link</Th>
            <Th>Feedback Link</Th>
            <Th>Date Added</Th>
            <Th width="50px">{''}</Th>
          </Tr>
        </thead>
        <tbody>
          {sites.map((site, index) => (
            <Box as="tr" key={site.id}>
              <Td>
                <NextLink
                  href="/site/[siteId]"
                  as={`/site/${site.id}`}
                  passHref
                >
                  <Link id={`site-table-link-${index}`} fontWeight="medium">
                    {site.siteName}
                  </Link>
                </NextLink>
              </Td>
              <Td>
                <Link href={site.siteUrl} isExternal>
                  {site.siteUrl}
                </Link>
              </Td>
              <Td>
                <NextLink
                  href="/feedback/[siteId]"
                  as={`/feedback/${site.id}`}
                  passHref
                >
                  <Link color="blue.500" fontWeight="medium">
                    View Feedback
                  </Link>
                </NextLink>
              </Td>
              <Td>{format(parseISO(site.createdAt), 'PPpp')}</Td>
              <Td>
                {/* <DeleteSiteButton siteId={site.id} /> */}
              </Td>
            </Box>
          ))}
        </tbody>
      </Table>
    </Box>
  );
};

export default SiteTable;
