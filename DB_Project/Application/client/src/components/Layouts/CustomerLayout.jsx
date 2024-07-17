import { useEffect } from 'react';

// React Router
import { Outlet, useNavigate } from 'react-router-dom';

// Chakra UI
import { VStack } from '@chakra-ui/react';

// Redux
import { useSelector } from 'react-redux';

import CustomerHeader from '../Headers/CustomerHeader';

const CustomerLayout = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.loggedIn || !user.isCustomer) navigate('/login');
  }, [user, navigate]);

  return (
    <VStack pb='5'>
      <CustomerHeader />
      <Outlet />
    </VStack>
  );
};

export default CustomerLayout;
