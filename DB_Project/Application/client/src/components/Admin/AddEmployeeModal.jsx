import { useState, useRef } from 'react';

// Chakra UI
import { VStack, Button, Checkbox, useToast } from '@chakra-ui/react';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

import CountrySelect from '../CountrySelect';
import CitySelect from '../CitySelect';
import AddressSelect from '../AddressSelect';

// API
import { addEmployee } from '../../api/admin.requests';

const AddEmployeeModal = ({ isOpen, onClose, callback }) => {
  const [countryId, setCountryId] = useState(0);
  const [cityId, setCityId] = useState(0);
  const [addressId, setAddressId] = useState(0);
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const adminRef = useRef();

  const toast = useToast();

  const onCreateClick = async () => {
    const res = await addEmployee({
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      email: emailRef.current.value,
      isAdmin: adminRef.current.checked,
      addressId: addressId,
    });

    if (res) {
      toast({
        title: 'Success',
        description: 'Employee created successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose();
      callback();
    } else {
      toast({
        title: 'Error',
        description: 'An error occured.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Employee</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <VStack>
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input variant='filled' ref={firstNameRef} />
            </FormControl>
            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input variant='filled' ref={lastNameRef} />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input variant='filled' type='email' ref={emailRef} />
            </FormControl>

            <FormControl>
              <FormLabel>Country</FormLabel>
              <CountrySelect value={countryId} setValue={setCountryId} />
            </FormControl>
            <FormControl>
              <FormLabel>City</FormLabel>
              <CitySelect
                value={cityId}
                setValue={setCityId}
                countryId={countryId}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Street</FormLabel>
              <AddressSelect
                value={addressId}
                setValue={setAddressId}
                cityId={cityId}
              />
            </FormControl>

            <Checkbox colorScheme='purple' size='lg' pt='2' ref={adminRef}>
              Administrator
            </Checkbox>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant='ghost' colorScheme='purple' mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme='purple' onClick={onCreateClick}>
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddEmployeeModal;
