import { Box, Heading, Text, Divider, Flex, Code } from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import MDXComponents from './MDXComponents';
import { GitHubIcon, GoogleIcon, FastFeedbackIcon } from '@/styles/icons';
import { useTheme } from '@/utils/useTheme';

export default function Feedback({ author, text, createdAt, provider, isLast, settings, index }) {
  const colorMode = useTheme();
  const authorColor = {
    light: 'gray.900',
    dark: 'gray.200'
  };
  const textColor = {
    light: 'gray.800',
    dark: 'gray.300'
  };
  const dividerColor = {
    light: 'gray.200',
    dark: 'gray.700'
  };

  let icon = null;
  if (provider) {
    switch (provider.slice(0, -4).toLowerCase()) {  // removing .top-level domain to get only provider name
      case "google":
        icon = <GoogleIcon ml={2} />;
        break;
      case "github":
        icon = <GitHubIcon ml={2} />;
        break;
      default:
        icon = <FastFeedbackIcon ml={2} />
    }
  }

  return (
    <Box id={`feedback-${index}`} borderRadius={4} maxWidth="700px" w="full">
      <Flex align="center">
        <Heading size="sm" as="h3" mb={0} color={authorColor[colorMode]} fontWeight="medium">
          {author}
        </Heading>
        {settings?.icons && icon}
      </Flex>
      {settings?.timestamp && (
        <Text color="gray.500" mb={4} fontSize="xs">
          {format(parseISO(createdAt), 'PPpp')}
        </Text>
      )}
      <Box color={textColor[colorMode]}>
        <ReactMarkdown
          components={{
            p: MDXComponents.p,
            blockquote: MDXComponents.blockquote,
            a: MDXComponents.a,
            ul: MDXComponents.ul,
            li: MDXComponents.li,
            table: MDXComponents.table,
            thead: MDXComponents.th,
            td: MDXComponents.td,
            /* eslint-disable react/display-name */
            code: ({ value }) => (
              <pre>
                <Code borderRadius={8} p={4} my={4}>
                  {value}
                </Code>
              </pre>
            ),
            /* eslint-enable react/display-name */
            pre: MDXComponents.inlineCode
          }}
        >
          {text}
        </ReactMarkdown>
      </Box>
      {!isLast && (
        <Divider
          borderColor={dividerColor[colorMode]}
          backgroundColor="gray.200"
          mt={6}
          mb={6}
        />
      )}
    </Box>
  )
}
