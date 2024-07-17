import { useState, useRef } from 'react';

// Chakra UI
import {
  Grid,
  GridItem,
  VStack,
  HStack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react';

// React Router
import { useLoaderData } from 'react-router-dom';

// Components
import CountrySelect from '../../components/CountrySelect';
import CitySelect from '../../components/CitySelect';
import AddressSelect from '../../components/AddressSelect';
import SubscriptionSelector from '../../components/SubscriptionSelector';
import HistoryTable from '../../components/HistoryTable';

import { updateProfileInfo } from '../../api/customer.requests';

const CustomerDetails = () => {
  const { customer } = useLoaderData();

  const toast = useToast();

  const [subTypeState, setSubTypeState] = useState(customer.sub_type);
  const [countryId, setCountryId] = useState(customer.country_id);
  const [cityId, setCityId] = useState(customer.city_id);
  const [addressId, setAddressId] = useState(customer.address_id);
  const firstNameRef = useRef();
  const lastNameRef = useRef();

  // Callbacks
  const onUpdateClick = () => {
    const res = updateProfileInfo({
      id: customer.id,
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      subType: subTypeState,
      addressId: addressId,
    });

    if (res) {
      toast({
        title: 'Profile updated.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Profile update failed.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Grid
      maxW='60%'
      gap='5'
      templateAreas={`
      "infoLeft infoRight"
      "history history"
      `}
      gridTemplateRows={'fit-content 1fr'}
      gridTemplateColumns={'1fr 1fr'}
    >
      <GridItem area='infoLeft'>
        <VStack>
          <FormControl>
            <FormLabel>First Name</FormLabel>
            <Input
              variant='filled'
              defaultValue={customer.first_name}
              ref={firstNameRef}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Last Name</FormLabel>
            <Input
              variant='filled'
              defaultValue={customer.last_name}
              ref={lastNameRef}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input variant='filled' defaultValue={customer.email} isDisabled />
          </FormControl>

          <SubscriptionSelector
            value={subTypeState}
            setValue={setSubTypeState}
            colorScheme='yellow'
          />
        </VStack>
      </GridItem>

      <GridItem area='infoRight'>
        <VStack align='flex-end'>
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
            <FormLabel>Address</FormLabel>
            <AddressSelect
              value={addressId}
              setValue={setAddressId}
              cityId={cityId}
            />
          </FormControl>

          <HStack pt='2' pb='2'>
            <Text as='i'>ID:</Text>
            <Text as='i' color='yellow.200'>
              {customer.id}
            </Text>
            <Text as='i'>Creation Date:</Text>
            <Text as='i' color='yellow.200'>
              {new Date(customer.created_at).toLocaleDateString()}
            </Text>
          </HStack>

          <Button colorScheme='yellow' onClick={onUpdateClick}>
            Update
          </Button>
        </VStack>
      </GridItem>

      <GridItem area='history' textAlign='center'>
        <Text fontSize='xl' color='yellow.200'>
          Order History
        </Text>
        <HistoryTable id={customer.id} />
      </GridItem>
    </Grid>
  );
};

export default CustomerDetails;
