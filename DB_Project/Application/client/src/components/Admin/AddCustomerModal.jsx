import { useState, useEffect, useRef } from 'react';

// Chakra UI
import { VStack, HStack, Button, useToast } from '@chakra-ui/react';
import { FormControl, FormLabel, Input, Checkbox } from '@chakra-ui/react';
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
import { addCustomer } from '../../api/admin.requests';

const AddCustomerModal = ({ isOpen, onClose, callback }) => {
  const [countryId, setCountryId] = useState(0);
  const [cityId, setCityId] = useState(0);
  const [addressId, setAddressId] = useState(0);
  const [filmsChecked, setFilmsChecked] = useState(false);
  const [seriesChecked, setSeriesChecked] = useState(false);

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();

  const toast = useToast();

  const onCreateClick = async () => {
    let subType;
    if (filmsChecked && seriesChecked) {
      subType = 'FILMS_AND_SERIES';
    } else if (filmsChecked) {
      subType = 'ONLY_FILMS';
    } else if (seriesChecked) {
      subType = 'ONLY_SERIES';
    } else {
      subType = 'FILMS_AND_SERIES';
    }

    const res = await addCustomer({
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      email: emailRef.current.value,
      addressId: addressId,
      subType: subType,
    });

    if (res) {
      toast({
        title: 'Success',
        description: 'Customer created successfully.',
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
        <ModalHeader>Create Customer</ModalHeader>
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

            <FormControl>
              <FormLabel>Subscription Type</FormLabel>
              <HStack spacing='10' pt='2'>
                <Checkbox
                  colorScheme='purple'
                  size='lg'
                  isChecked={filmsChecked}
                  onChange={(e) => setFilmsChecked(e.target.checked)}
                >
                  Films
                </Checkbox>
                <Checkbox
                  colorScheme='purple'
                  size='lg'
                  isChecked={seriesChecked}
                  onChange={(e) => setSeriesChecked(e.target.checked)}
                >
                  Series
                </Checkbox>
              </HStack>
            </FormControl>
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

export default AddCustomerModal;
