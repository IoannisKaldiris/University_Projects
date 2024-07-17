import { useEffect } from 'react';

// React Router
import { Outlet, useNavigate } from 'react-router-dom';

// Chakra UI
import { VStack } from '@chakra-ui/react';

// Redux
import { useSelector } from 'react-redux';

import AdminHeader from '../Headers/AdminHeader';

const AdminLayout = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.loggedIn || !user.isAdmin) navigate('/login');
  }, [user, navigate]);

  return (
    <VStack pb='5'>
      <AdminHeader />
      <Outlet />
    </VStack>
  );
};

export default AdminLayout;
