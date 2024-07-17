import { useState, useEffect } from 'react';

// Redux
import { useSelector } from 'react-redux';

// Chakra UI
import {
  HStack,
  VStack,
  Text,
  IconButton,
  Icon,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { FaTrash, FaLockOpen, FaLock, FaPlus } from 'react-icons/fa';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';

import EmployeeDeleteAlert from '../../components/Admin/EmployeeDeleteAlert';
import AddEmployeeModal from '../../components/Admin/AddEmployeeModal';

import {
  getEmployees,
  deleteEmployee,
  employeeAdminStatus,
} from '../../api/admin.requests';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();
  const toast = useToast();
  const [selectedEmployee, setSelectedEmployee] = useState({});
  const user = useSelector((state) => state.user);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const data = await getEmployees(user.uid);
    setEmployees(data);
  };

  const onModalOpen = (employee) => {
    onOpen();
    setSelectedEmployee(employee);
  };

  const onAdminStatusChange = async (id, isAdmin) => {
    const res = await employeeAdminStatus(id, isAdmin);

    if (res) {
      toast({
        title: 'Employee admin status changed.',
        description: `Employee ${id} is now ${
          isAdmin ? 'an admin' : 'not an admin'
        }.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Error',
        description: 'Something went wrong.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const onDeleteCallback = async () => {
    onClose();

    const res = await deleteEmployee(selectedEmployee.id);
    if (res) {
      toast({
        title: `Employee ${selectedEmployee.id} deleted.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: `Employee ${selectedEmployee.id} not deleted.`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }

    fetchEmployees();
  };

  const onEmployeeAddCallback = () => {
    fetchEmployees();
  };

  return (
    <>
      <VStack w='60%' gap='3'>
        <Text fontSize='xl' as='b' color='purple.200'>
          Employees
        </Text>

        <IconButton
          w='100%'
          aria-label='Add Employee'
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
                <Th>Creation Date</Th>
                <Th>IsAdmin</Th>
                <Th>Admin</Th>
                <Th>Del</Th>
              </Tr>
            </Thead>
            <Tbody>
              {employees &&
                employees.map((employee) => (
                  <Tr key={employee.id}>
                    <Td>{employee.id}</Td>
                    <Td>{employee.first_name}</Td>
                    <Td>{employee.last_name}</Td>
                    <Td>{employee.email}</Td>
                    <Td>
                      {new Date(employee.created_at).toLocaleDateString()}
                    </Td>
                    <Td>
                      {employee.is_admin ? (
                        <Text color='green.200'>TRUE</Text>
                      ) : (
                        <Text color='red.200'>FALSE</Text>
                      )}
                    </Td>
                    <Td>
                      <HStack>
                        <IconButton
                          aria-label={`Set admin status ${employee.id} true`}
                          icon={<Icon as={FaLockOpen} />}
                          variant='ghost'
                          size='xs'
                          colorScheme='purple'
                          onClick={() => onAdminStatusChange(employee.id, true)}
                        />
                        <IconButton
                          aria-label={`Set admin status ${employee.id} false`}
                          icon={<Icon as={FaLock} />}
                          variant='ghost'
                          size='xs'
                          colorScheme='purple'
                          onClick={() =>
                            onAdminStatusChange(employee.id, false)
                          }
                        />
                      </HStack>
                    </Td>
                    <Td>
                      <IconButton
                        aria-label={`Delete ${employee.id}`}
                        icon={<Icon as={FaTrash} />}
                        variant='ghost'
                        size='xs'
                        colorScheme='red'
                        onClick={() => onModalOpen(employee)}
                      />
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>

      <EmployeeDeleteAlert
        isOpen={isOpen}
        onClose={onClose}
        onDelete={onDeleteCallback}
        employee={selectedEmployee}
      />
      <AddEmployeeModal
        isOpen={isOpen2}
        onClose={onClose2}
        callback={onEmployeeAddCallback}
      />
    </>
  );
};

export default Employees;
