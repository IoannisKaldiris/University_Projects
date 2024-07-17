import { useState, useEffect } from 'react';

// Chakra UI
import {
  VStack,
  Text,
  IconButton,
  Icon,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { FaTrash, FaPlus } from 'react-icons/fa';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';

import CustomerDeleteAlert from '../../components/Admin/CustomerDeleteAlert';
import AddCustomerModal from '../../components/Admin/AddCustomerModal';

import { getCustomers, deleteCustomer } from '../../api/admin.requests';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();
  const toast = useToast();
  const [selectedCustomer, setSelectedCustomer] = useState({});

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const data = await getCustomers();
    setCustomers(data);
  };

  const onModalOpen = (customer) => {
    onOpen();
    setSelectedCustomer(customer);
  };

  const onDeleteCallback = async () => {
    onClose();

    const res = await deleteCustomer(selectedCustomer.id);
    if (res) {
      toast({
        title: `Customer ${selectedCustomer.id} deleted.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: `Customer ${selectedCustomer.id} not deleted.`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
    fetchCustomers();
  };

  const onCustomerAddCallback = async () => {
    fetchCustomers();
  };

  return (
    <>
      <VStack w='60%' gap='3'>
        <Text fontSize='xl' as='b' color='purple.200'>
          Customers
        </Text>

        <IconButton
          w='100%'
          aria-label='Add Customer'
          icon={<Icon as={FaPlus} />}
          colorScheme='purple'
          variant='ghost'
          onClick={onOpen2}
        />

        <TableContainer w='100%'>
          <Table variant='striped' size='sm' colorScheme='purple'>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>First Name</Th>
                <Th>Last Name</Th>
                <Th>Email</Th>
                <Th>Sub Type</Th>
                <Th>Creation Date</Th>
                <Th>Del</Th>
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
                    <Td>
                      {new Date(customer.created_at).toLocaleDateString()}
                    </Td>
                    <Td>
                      <IconButton
                        aria-label={`Delete Customer ${customer.id}`}
                        icon={<Icon as={FaTrash} />}
                        colorScheme='red'
                        variant='ghost'
                        size='xs'
                        onClick={() => onModalOpen(customer)}
                      />
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>

      <CustomerDeleteAlert
        isOpen={isOpen}
        onClose={onClose}
        onDelete={onDeleteCallback}
        customer={selectedCustomer}
      />
      <AddCustomerModal
        isOpen={isOpen2}
        onClose={onClose2}
        callback={onCustomerAddCallback}
      />
    </>
  );
};

export default Customers;
