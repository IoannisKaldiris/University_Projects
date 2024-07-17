import { useState, useEffect } from 'react';

// Chakra UI
import { VStack, Text, IconButton, Icon } from '@chakra-ui/react';
import { FaEdit } from 'react-icons/fa';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';

// React Router
import { Link as RouterLink } from 'react-router-dom';

import { getCustomers } from '../../api/admin.requests';

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const data = await getCustomers();
    setCustomers(data);
  };

  return (
    <VStack w='60%' gap='3'>
      <Text fontSize='xl' as='b' color='purple.200'>
        Customers
      </Text>

      <TableContainer w='100%'>
        <Table variant='striped' size='sm' colorScheme='yellow'>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>First Name</Th>
              <Th>Last Name</Th>
              <Th>Email</Th>
              <Th>Sub Type</Th>
              <Th>Creation Date</Th>
              <Th>Edit</Th>
            </Tr>
          </Thead>
          <Tbody>
            {customers &&
              customers.map((customer) => (
                <Tr key={customer.id}>
                  <Td>{customer.id}</Td>
                  <Td>{customer.first_name}</Td>
                  <Td>{customer.last_name}</Td>
                  <Td>{customer.email}</Td>
                  <Td>{customer.sub_type}</Td>
                  <Td>{new Date(customer.created_at).toLocaleDateString()}</Td>
                  <Td>
                    <IconButton
                      aria-label={`Edit Customer ${customer.id}`}
                      icon={<Icon as={FaEdit} />}
                      colorScheme='yellow'
                      variant='ghost'
                      size='xs'
                      as={RouterLink}
                      to={`/employee/customers/${customer.id}`}
                    />
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
};

export default Customers;
