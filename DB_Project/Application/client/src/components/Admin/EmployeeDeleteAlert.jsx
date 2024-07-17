import { useRef } from 'react';

// Chakra UI
import { Button, VStack, Text } from '@chakra-ui/react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';

const EmployeeDeleteAlert = ({ isOpen, onClose, onDelete, employee }) => {
  const cancelRef = useRef();

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Delete Employee
          </AlertDialogHeader>

          <AlertDialogBody>
            <VStack align='flex-start'>
              <Text as='i' color='purple.200'>
                ID: {employee.id}, {employee.first_name} {employee.last_name},{' '}
                {employee.email}
              </Text>
              <Text>Are you sure? You can't undo this action afterwards.</Text>
            </VStack>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='red' onClick={onDelete} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default EmployeeDeleteAlert;
