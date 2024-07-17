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
  const { filmSales, seriesSales } = useLoaderData();

  return (
    <HStack w='60%' justify='center' gap='20'>
      {/* Film Sales */}
      <TableContainer>
        <Table variant='striped' size='sm' colorScheme='purple'>
          <TableCaption>
            <Heading size='sm' as='i' color='purple.200'>
              Film Sales
            </Heading>
          </TableCaption>
          <Thead>
            <Tr>
              <Th>Year</Th>
              <Th>Month</Th>
              <Th>Total</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filmSales.map((sale, i) => (
              <Tr key={i}>
                <Td>{sale.yr}</Td>
                <Td>{sale.mn}</Td>
                <Td>&euro; {sale.f_sales.toFixed(2)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {/* Series Sales */}
      <TableContainer>
        <Table variant='striped' size='sm' colorScheme='purple'>
          <TableCaption>
            <Heading size='sm' as='i' color='purple.200'>
              Series Sales
            </Heading>
          </TableCaption>
          <Thead>
            <Tr>
              <Th>Year</Th>
              <Th>Month</Th>
              <Th>Total</Th>
            </Tr>
          </Thead>
          <Tbody>
            {seriesSales.map((sale, i) => (
              <Tr key={i}>
                <Td>{sale.yr}</Td>
                <Td>{sale.mn}</Td>
                <Td>&euro; {sale.s_sales.toFixed(2)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </HStack>
  );
};

export default Sales;
