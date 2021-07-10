import { Box, Button, Flex, Stack } from '@chakra-ui/react';
import { useAuth } from '@/lib/auth';
import SEOPage from '@/components/SEOPage';
import { FastFeedbackIcon, GitHubIcon, GoogleIcon } from '@/styles/icons';

const Login = () => {
  const auth = useAuth();

  return (
    <Flex
      align="center"
      justify="center"
      h="100vh"
      backgroundColor={['white', 'gray.100']}
    >
      <Stack
        backgroundColor="white"
        borderRadius={[0, 8]}
        maxWidth="400px"
        px={8}
        py={12}
        shadow={[null, 'md']}
        spacing={4}
        w="100%"
      >
        <Flex justify="center">
          <Box as="a" href="/" aria-label="Back to homepage">
            <FastFeedbackIcon color="black" name="logo" boxSize="56px" mb={4} />
          </Box>
        </Flex>
        <Button
          onClick={() => auth.signinWithGitHub('/sites')}
          backgroundColor="gray.900"
          color="white"
          fontWeight="medium"
          leftIcon={<GitHubIcon />}
          mt={4}
          mr={2}
          _hover={{ bg: 'gray.700' }}
          _active={{
            bg: 'gray.800',
            transform: 'scale(0.95)'
          }}
        >
          Continue with GitHub
        </Button>
        <Button
          onClick={() => auth.signinWithGoogle('/sites')}
          backgroundColor="white"
          color="gray.900"
          variant="outline"
          fontWeight="medium"
          leftIcon={<GoogleIcon />}
          mt={4}
          _hover={{ bg: 'gray.100' }}
          _active={{
            bg: 'gray.100',
            transform: 'scale(0.95)'
          }}
        >
          Continue with Google
        </Button>
      </Stack>
    </Flex>
  );
};

const LoginPage = () => (
  <SEOPage name="Login" path="/login">
    <Login />
  </SEOPage>
);

export default LoginPage;
