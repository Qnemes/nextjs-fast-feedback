import { useState, useRef } from 'react';
import { mutate } from 'swr';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  IconButton,
  Button,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

import { deleteSite } from 'src/lib/db';
import { useAuth } from 'src/lib/auth';

const DeleteSiteButton = ({ siteId }) => {
  const [isOpen, setIsOpen] = useState();
  const cancelRef = useRef();
  const auth = useAuth();

  const onClose = () => setIsOpen(false);
  const onDelete = () => {
    deleteSite(siteId);
    mutate(
      ['/api/sites', auth.user.token],
      async (data) => {
        return {
          sites: data.sites.filter((site) => site.id !== siteId),
        };
      },
      false
    );
    onClose();
  };

  return (
    <>
      <IconButton
        id="delete-site-button"
        aria-label="Delete site"
        icon={<DeleteIcon />}
        variant="ghost"
        onClick={() => setIsOpen(true)}
      />
      <AlertDialog
        id="delete-site-modal"
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Site
          </AlertDialogHeader>
          <AlertDialogBody>
            Are you sure? This will also delete all feedback left on the site. You can&apos;t undo
            this action afterwards.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              id="delete-site-modal-button"
              fontWeight="bold"
              colorScheme="red"
              onClick={onDelete}
              ml={3}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteSiteButton;
