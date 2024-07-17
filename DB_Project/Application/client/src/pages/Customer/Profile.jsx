import { useState, useEffect, useRef } from 'react';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import {
  setFirstName,
  setLastName,
  setSubType,
} from '../../store/slices/user.slice';

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

// Components
import CountrySelect from '../../components/CountrySelect';
import CitySelect from '../../components/CitySelect';
import AddressSelect from '../../components/AddressSelect';
import SubscriptionSelector from '../../components/SubscriptionSelector';
import HistoryTable from '../../components/HistoryTable';

import { getProfileInfo, updateProfileInfo } from '../../api/customer.requests';

const Profile = () => {
  const [profile, setProfile] = useState({});
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const toast = useToast();

  const [subTypeState, setSubTypeState] = useState();
  const [countryId, setCountryId] = useState();
  const [cityId, setCityId] = useState();
  const [addressId, setAddressId] = useState();
  const firstNameRef = useRef();
  const lastNameRef = useRef();

  useEffect(() => {
    fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    const res = await getProfileInfo(user.uid);

    setProfile(res);
    setSubTypeState(res.sub_type);
    setCountryId(res.country_id);
    setCityId(res.city_id);
    setAddressId(res.address_id);
  };

  // Callbacks
  const onUpdateClick = () => {
    dispatch(setFirstName(firstNameRef.current.value));
    dispatch(setLastName(lastNameRef.current.value));
    dispatch(setSubType(subTypeState));

    const res = updateProfileInfo({
      id: user.uid,
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
              defaultValue={user.firstName}
              ref={firstNameRef}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Last Name</FormLabel>
            <Input
              variant='filled'
              defaultValue={user.lastName}
              ref={lastNameRef}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input variant='filled' defaultValue={profile.email} isDisabled />
          </FormControl>

          <SubscriptionSelector
            value={subTypeState}
            setValue={setSubTypeState}
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
            <Text as='i' color='teal.200'>
              {user.uid}
            </Text>
            <Text as='i'>Creation Date:</Text>
            <Text as='i' color='teal.200'>
              {new Date(profile.created_at).toLocaleDateString()}
            </Text>
          </HStack>

          <Button colorScheme='teal' onClick={onUpdateClick}>
            Update
          </Button>
        </VStack>
      </GridItem>

      <GridItem area='history' textAlign='center'>
        <Text fontSize='xl' color='teal.200'>
          Order History
        </Text>
        <HistoryTable id={user.uid} />
      </GridItem>
    </Grid>
  );
};

export default Profile;
