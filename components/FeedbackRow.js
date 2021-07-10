import { Box, Code, Switch } from '@chakra-ui/react';
import { mutate } from 'swr';

import { Td } from './Table';
import { useAuth } from '@/lib/auth';
import { updateFeedback } from '@/lib/db';
import ReactMarkdown from 'react-markdown';
import MDXComponents from './MDXComponents';
import DeleteFeedbackButton from './DeleteFeedbackButton';

const FeedbackRow = ({ id, author, text, route, status }) => {
  const auth = useAuth();
  const isChecked = status === 'active';

  const toggleFeedback = async () => {
    await updateFeedback(id, { status: isChecked ? 'pending' : 'active' });
    mutate(['/api/feedback', auth.user.token]);
  };

  return (
    <Box as="tr" key={id}>
      <Td fontWeight="medium">{author}</Td>
      <Td>
        <ReactMarkdown>
          {text}
        </ReactMarkdown>
      </Td>
      <Td>
        <Code
          maxWidth="150px"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          overflow="hidden"
          display="inherit"
        >
          {route || '/'}
        </Code>
      </Td>
      <Td>
        <Switch color="green" onChange={toggleFeedback} isChecked={isChecked} />
      </Td>
      <Td>
        <DeleteFeedbackButton feedbackId={id} />
      </Td>
    </Box>
  );
};

export default FeedbackRow;
