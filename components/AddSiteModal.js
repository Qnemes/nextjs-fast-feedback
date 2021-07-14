import { useForm } from 'react-hook-form';
import { useAuth } from 'src/lib/auth';
import { mutate } from 'swr';
import { createSite } from 'src/lib/db';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useToast,
  useDisclosure
} from "@chakra-ui/react";

const AddSiteModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast()
  const auth = useAuth();
  const { register, handleSubmit } = useForm();

  const onCreateSite = ({ siteName, siteUrl }) => {
    const newSite = {
      authorId: auth.user.uid,
      createdAt: new Date().toISOString(),
      siteName,
      siteUrl,
      settings: {
        icons: true,
        timestamp: true,
        ratings: false
      }
    };

    const { id } = createSite(newSite);
    toast({
      title: 'Success!',
      description: "We've added your site.",
      status: 'success',
      duration: 5000,
      isClosable: true
    });
    mutate(
      ['/api/sites', auth.user.token],
      async (data) => ({
        sites: [{ id, ...newSite }, ...data.sites]
      }),
      false
    );
    onClose();
  }

  return (
    <>
      <Button id="add-site-modal-button"
        onClick={onOpen}
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        _hover={{ bg: 'gray.700' }}
        _active={{
          bg: 'gray.800',
          transform: 'scale(0.95)'
        }}
      >
        {children}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onCreateSite)}>
          <ModalHeader fontWeight="bold">Add Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel htmlFor="site-input">Name</FormLabel>
              <Input id="site-input"
                name="name"
                placeholder="My site"
                {...register("siteName", {
                  required: true
                })}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel htmlFor="link-input">Link</FormLabel>
              <Input id="link-input"
                name="url"
                placeholder="https://example.com"
                {...register("siteUrl", {
                  required: true
                })}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3} fontWeight="medium">
              Cancel
            </Button>
            <Button id="create-site-button" fontWeight="medium" colorScheme="teal" type="submit">
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddSiteModal;
