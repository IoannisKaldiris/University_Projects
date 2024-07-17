// Chakra UI
import {
  Flex,
  IconButton,
  Icon,
  Center,
  Text,
  Spacer,
  useToast,
} from '@chakra-ui/react';
import { FaFilm, FaTv, FaUserAlt, FaSignOutAlt } from 'react-icons/fa';

// React Router
import { Link as RouterLink, useLocation } from 'react-router-dom';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/user.slice';

const CustomerHeader = () => {
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const toast = useToast();

  const onLogoutClicked = () => {
    dispatch(logout());
    toast({
      title: 'Logout Successful',
      description: 'You have been logged out successfully.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Flex w='50%' gap='2' p='3'>
      {(user.subType === 'FILMS_AND_SERIES' ||
        user.subType === 'ONLY_FILMS') && (
        <IconButton
          aria-label='Films'
          icon={<Icon as={FaFilm} />}
          variant={location.pathname === '/films' ? 'solid' : 'ghost'}
          colorScheme='teal'
          as={RouterLink}
          to='/films'
        />
      )}
      {(user.subType === 'FILMS_AND_SERIES' ||
        user.subType === 'ONLY_SERIES') && (
        <IconButton
          aria-label='Series'
          icon={<Icon as={FaTv} />}
          variant={location.pathname === '/series' ? 'solid' : 'ghost'}
          colorScheme='teal'
          as={RouterLink}
          to='/series'
        />
      )}

      <Spacer />
      <Center gap='1'>
        <Text>Welcome, </Text>
        <Text color='teal.200'>
          {user.firstName} {user.lastName}
        </Text>
      </Center>
      <Spacer />
      <IconButton
        aria-label='Profile'
        icon={<Icon as={FaUserAlt} />}
        variant={location.pathname === '/profile' ? 'solid' : 'ghost'}
        colorScheme='teal'
        as={RouterLink}
        to='/profile'
      />
      <IconButton
        aria-label='Logout'
        icon={<Icon as={FaSignOutAlt} />}
        variant='ghost'
        colorScheme='red'
        onClick={onLogoutClicked}
      />
    </Flex>
  );
};

export default CustomerHeader;
