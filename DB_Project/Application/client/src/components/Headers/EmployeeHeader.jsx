// Chakra UI
import {
  Flex,
  ButtonGroup,
  IconButton,
  Icon,
  Center,
  Text,
  Spacer,
  useToast,
} from '@chakra-ui/react';
import {
  FaUserAlt,
  FaDatabase,
  FaChartLine,
  FaSignOutAlt,
} from 'react-icons/fa';

// React Router
import { Link as RouterLink, useLocation } from 'react-router-dom';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/user.slice';

const EmployeeHeader = () => {
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
      <Center gap='1'>
        <Text>Welcome, </Text>
        <Text color='yellow.200'>
          {user.firstName} {user.lastName}
        </Text>
      </Center>
      <Spacer />

      <ButtonGroup isAttached colorScheme='yellow'>
        <IconButton
          aria-label='Customers'
          icon={<Icon as={FaUserAlt} />}
          variant={
            location.pathname === '/employee/customers' ? 'solid' : 'ghost'
          }
          as={RouterLink}
          to='/employee/customers'
        />
        <IconButton
          aria-label='Data'
          icon={<Icon as={FaDatabase} />}
          variant={
            location.pathname.includes('/employee/data') ? 'solid' : 'ghost'
          }
          as={RouterLink}
          to='/employee/data/films'
        />
        <IconButton
          aria-label='Sales'
          icon={<Icon as={FaChartLine} />}
          variant={location.pathname === '/employee/sales' ? 'solid' : 'ghost'}
          as={RouterLink}
          to='/employee/sales'
        />
      </ButtonGroup>

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

export default EmployeeHeader;
