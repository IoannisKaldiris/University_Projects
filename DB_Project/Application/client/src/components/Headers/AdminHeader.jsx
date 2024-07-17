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
  FaHardHat,
  FaDollarSign,
  FaChartLine,
  FaList,
  FaSignOutAlt,
} from 'react-icons/fa';

// React Router
import { Link as RouterLink, useLocation } from 'react-router-dom';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/user.slice';

const AdminHeader = () => {
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
        <Text color='purple.200'>
          {user.firstName} {user.lastName}
        </Text>
      </Center>
      <Spacer />

      <ButtonGroup isAttached colorScheme='purple'>
        <IconButton
          aria-label='Customers'
          icon={<Icon as={FaUserAlt} />}
          variant={location.pathname === '/admin/customers' ? 'solid' : 'ghost'}
          as={RouterLink}
          to='/admin/customers'
        />
        <IconButton
          aria-label='Employees'
          icon={<Icon as={FaHardHat} />}
          variant={location.pathname === '/admin/employees' ? 'solid' : 'ghost'}
          as={RouterLink}
          to='/admin/employees'
        />
        <IconButton
          aria-label='Sales'
          icon={<Icon as={FaChartLine} />}
          variant={location.pathname === '/admin/sales' ? 'solid' : 'ghost'}
          as={RouterLink}
          to='/admin/sales'
        />
        <IconButton
          aria-label='Pricing'
          icon={<Icon as={FaDollarSign} />}
          variant={location.pathname === '/admin/pricing' ? 'solid' : 'ghost'}
          as={RouterLink}
          to='/admin/pricing'
        />
        <IconButton
          aria-label='Logs'
          icon={<Icon as={FaList} />}
          variant={location.pathname === '/admin/logs' ? 'solid' : 'ghost'}
          as={RouterLink}
          to='/admin/logs'
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

export default AdminHeader;
