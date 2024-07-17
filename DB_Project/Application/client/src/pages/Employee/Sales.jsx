// React Router
import { useLoaderData } from 'react-router-dom';

// Chakra UI
import { HStack, Heading } from '@chakra-ui/react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';

const Sales = () => {
  const { films, series } = useLoaderData();

  return (
    <HStack w='60%' justify='center' gap='20'>
      {/* Films */}
      <TableContainer>
        <Table variant='striped' size='sm' colorScheme='yellow'>
          <TableCaption>
            <Heading size='sm' as='i' color='yellow.200'>
              Film Rentals
            </Heading>
          </TableCaption>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Title</Th>
              <Th>Rentals</Th>
            </Tr>
          </Thead>
          <Tbody>
            {films[0].map((rental) => (
              <Tr key={rental.id}>
                <Td>{rental.id}</Td>
                <Td>{rental.title}</Td>
                <Td>{rental.amount}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {/* Series */}
      <TableContainer>
        <Table variant='striped' size='sm' colorScheme='yellow'>
          <TableCaption>
            <Heading size='sm' as='i' color='yellow.200'>
              Series Rentals
            </Heading>
          </TableCaption>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Title</Th>
              <Th>Rentals</Th>
            </Tr>
          </Thead>
          <Tbody>
            {series[0].map((rental) => (
              <Tr key={rental.id}>
                <Td>{rental.id}</Td>
                <Td>{rental.name}</Td>
                <Td>{rental.amount}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </HStack>
  );
};

export default Sales;
