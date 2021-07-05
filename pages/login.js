import { Fragment } from 'react';
import { useAuth } from '@/lib/auth';
import { NextSeo } from 'next-seo';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  useToast
} from '@chakra-ui/react';
import { FastFeedbackIcon } from '@/styles/icons';

import { useForm } from 'react-hook-form';
import { useState } from 'react';

const LoginPage = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const { signinWithEmail } = useAuth();
  const { handleSubmit, register, formState: { errors } } = useForm();

  const title = `Fast Feedback – Login`;
  const url = `https://fastfeedback.io/login`;

  const onLogin = ({ email, password }) => {
    email = email.trim();
    setLoading(true);
    signinWithEmail(email, password).catch(error => {
      setLoading(false);
      toast({
        title: 'An error occurred.',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    });
  };

  return (
    <Fragment>
      <NextSeo
        title={title}
        canonical={url}
        openGraph={{
          url,
          title
        }}
      />
      <Flex align="center" justify="center" h="100vh" backgroundColor="gray.100">
        <Stack
          as="form"
          backgroundColor="white"
          borderRadius={[0, 8]}
          errors={errors}
          maxWidth="400px"
          onSubmit={handleSubmit((data) => onLogin(data))}
          px={8}
          py={12}
          shadow={[null, 'md']}
          spacing={4}
          w="100%"
        >
          <Flex justify="center">
            <Box as="a" href="/" aria-label="Back to homepage">
              <FastFeedbackIcon color="black" name="logo" boxSize="64px" mb={4} />
            </Box>
          </Flex>
          <FormControl isInvalid={errors.email && errors.email.message}>
            <FormLabel>Email Address</FormLabel>
            <Input
              autoFocus
              aria-label="Email Address"
              id="email"
              name="email"
              placeholder="example@mail.com"
              {...register("email", {
                required: "Please, enter your e-mail"
              })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.password && errors.password.message}>
            <FormLabel>Password</FormLabel>
            <Input
              aria-label="Password"
              name="password"
              id="password"
              type="password"
              placeholder="********"
              {...register("password", {
                required: "Please enter your password"
              })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            id="login"
            type="submit"
            backgroundColor="gray.900"
            color="white"
            isLoading={loading}
            fontWeight="medium"
            mt={4}
            h="50px"
            fontSize="lg"
            _hover={{ bg: 'gray.700' }}
            _active={{
              bg: 'gray.800',
              transform: 'scale(0.95)'
            }}
          >
            Login
          </Button>
        </Stack>
      </Flex>
    </Fragment>
  );
};

export default LoginPage;
