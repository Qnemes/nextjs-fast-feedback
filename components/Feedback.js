import React from 'react';
import { Box, Heading, Text, Divider, Icon, Flex } from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';
import { GitHubIcon, GoogleIcon } from '@/styles/icons';

export default function Feedback({ author, text, createdAt, provider, isLast, settings, index }) {
  let icon = null;

  if (provider) { // don`t know better approach to get proper icon in new Chakra-UI v2
    switch (provider.slice(0, -4).toLowerCase()) {  // removing .domain to get only provider name
      case "google":
        icon = <GoogleIcon ml={2} />;
        break;
      case "github":
        icon = <GitHubIcon ml={2} />;
        break;
    }
  }

  return (
    <Box borderRadius={4} maxWidth="700px" w="full" id={`feedback-${index}`}>
      <Flex align="center">
        <Heading size="sm" as="h3" mb={0} color="gray.900" fontWeight="medium">
          {author}
        </Heading>
        {settings?.icons && icon}
      </Flex>
      {settings?.timestamp && (
        <Text color="gray.500" mb={4} fontSize="xs">
          {format(parseISO(createdAt), 'PPpp')}
        </Text>
      )}
      <Text color="gray.800">{text}</Text>
      {!isLast && (
        <Divider
          borderColor="gray.200"
          backgroundColor="gray.200"
          mt={6}
          mb={6}
        />
      )}
    </Box>
  )
}
