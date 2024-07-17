import { useEffect } from 'react';

// React Router
import { Outlet, useNavigate } from 'react-router-dom';

// Chakra UI
import { VStack } from '@chakra-ui/react';

// Redux
import { useSelector } from 'react-redux';

import EmployeeHeader from '../Headers/EmployeeHeader';

const EmployeeLayout = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.loggedIn || user.isAdmin) navigate('/login');
  }, [user, navigate]);

  return (
    <VStack pb='5'>
      <EmployeeHeader />
      <Outlet />
    </VStack>
  );
};

export default EmployeeLayout;
