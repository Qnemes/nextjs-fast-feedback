import { useState } from 'react';
import { getAllFeedback, getAllSites } from "@/lib/db-admin";
import { createFeedback } from '@/lib/db';
import Feedback from '@/components/Feedback';
import { Box, Button, FormControl, FormLabel, Textarea } from "@chakra-ui/react";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/router";

export async function getStaticProps(context) {
  const { siteId } = context.params;
  const { feedback, error } = await getAllFeedback(siteId);

  return {
    props: {
      initialFeedback: feedback
    },
    revalidate: 1
  }
}

export async function getStaticPaths() {
  const { sites } = await getAllSites();
  const paths = sites.map(site => ({
    params: {
      siteId: site.id.toString()
    }
  }));

  return {
    paths,
    fallback: false
  };
}

export default function SiteFeedback({ initialFeedback }) {
  const auth = useAuth();
  const router = useRouter();
  const [allFeedback, setAllFeedback] = useState(initialFeedback);
  const onSubmit = (event) => {
    event.preventDefault();

    const newFeedback = {
      author: auth.user.name,
      authorId: auth.user.uid,
      siteId: router.query.siteId,
      text: event.target.elements.comment.value,  //direct access instead of ref, better performance
      createdAt: new Date().toISOString(),
      provider: auth.user.provider,
      status: "pending"
    };
    setAllFeedback([newFeedback, ...allFeedback]);
    createFeedback(newFeedback);
    console.log(newFeedback);
  }
  return (
    <Box display="flex" flexDirection="column" width="full" maxWidth="768px" margin="0 auto">
      <FormControl as="form" marginY={4} onSubmit={onSubmit} id="comment">
        <FormLabel htmlFor="comment">Leave a comment:</FormLabel>
        <Textarea type="comment" name="comment" placeholder="Text goes here..." />
        <Button type="submit" fontWeight="medium" marginY={1}>
          Add Comment
        </Button>
      </FormControl>
      {initialFeedback.map(feedback => (
        <Feedback
          key={feedback.id}
          {...feedback}
        />
      ))}
    </Box>
  )
};