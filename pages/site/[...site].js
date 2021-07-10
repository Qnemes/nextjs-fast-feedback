import { useRef } from 'react';
import { useRouter } from "next/router";
import { Box, Button, FormControl, FormLabel, Textarea } from "@chakra-ui/react";

import useSWR, { mutate } from 'swr';
import { useAuth } from "@/lib/auth";
import { createFeedback } from '@/lib/db';
import fetcher from '@/utils/fetcher';

import Feedback from '@/components/Feedback';
import DashboardShell from '@/components/DashboardShell';
import SiteHeader from '@/components/SiteHeader';
import LoginButtons from '@/components/LoginButtons';

const FeedbackPage = () => {
  const { user, loading } = useAuth();
  const inputEl = useRef(null);
  const router = useRouter();

  const siteAndRoute = router.query?.site;
  const siteId = siteAndRoute ? siteAndRoute[0] : null;
  const route = siteAndRoute ? siteAndRoute[1] : null;
  const feedbackApi = route
    ? `/api/feedback/${siteId}/${route}`
    : `/api/feedback/${siteId}`;

  const { data: siteData } = useSWR(`/api/site/${siteId}`, fetcher);
  const { data: feedbackData } = useSWR(feedbackApi, fetcher);

  const site = siteData?.site;
  const allFeedback = feedbackData?.feedback;

  const onSubmit = (event) => {
    event.preventDefault();

    const newFeedback = {
      siteId,
      siteAuthorId: site.authorId,
      route: route || '/',
      author: user.name,
      authorId: user.uid,
      text: event.target.elements.comment.value.replace('\n', '\n\n'), //direct access instead of ref, better performance
      createdAt: new Date().toISOString(),
      provider: user.provider,
      status: "active"
    };

    inputEl.current.value = '';
    createFeedback(newFeedback);
    mutate(
      feedbackApi,
      async (data) => ({
        feedback: [newFeedback, ...data.feedback]
      }),
      false
    );
  };

  const LoginOrLeaveFeedback = () =>
    user ? (
      <Button
        id="leave-feedback-button"
        type="submit"
        isDisabled={!siteData || !feedbackData}
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        mt={4}
        _hover={{ bg: 'gray.700' }}
        _active={{
          bg: 'gray.800',
          transform: 'scale(0.95)'
        }}
      >
        Leave Feedback
      </Button>
    ) : (
      <LoginButtons />
    );

  return (
    <DashboardShell>
      <SiteHeader
        isSiteOwner={site?.authorId === user?.uid}
        site={site}
        siteId={siteId}
        route={route}
      />
      <Box
        display="flex"
        mx={4}
        flexDirection="column"
        width="full"
        maxWidth="700px"
      >
        <Box as="form" onSubmit={onSubmit}>
          <FormControl mb={8}>
            <Textarea
              ref={inputEl}
              id="comment"
              placeholder="Leave a comment"
              isDisabled={!user}
              h="100px"
            />
            {!loading && <LoginOrLeaveFeedback />}
          </FormControl>
        </Box>
        {allFeedback &&
          allFeedback.map((feedback, index) => (
            <Feedback
              key={feedback?.id}
              index={index}
              settings={site?.settings}
              isLast={index === allFeedback.length - 1}
              {...feedback}
            />
          ))}
      </Box>
    </DashboardShell>
  );
};

export default FeedbackPage;
