import { useState, useEffect, useRef } from 'react';

// React Router
import { useLoaderData } from 'react-router-dom';

// Chakra UI
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';
import { VStack, HStack, Select, Icon, IconButton } from '@chakra-ui/react';
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { FaSyncAlt } from 'react-icons/fa';

// API
import { getLogs } from '../../api/admin.requests';

const Logs = () => {
  const [logs, setlogs] = useState([]);
  const { customerIDs, tableNames } = useLoaderData();

  const customerIdRef = useRef(0);
  const tableNameRef = useRef('');
  const offsetRef = useRef(0);
  const limitRef = useRef(20);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    const res = await getLogs(
      offsetRef.current.children[0].value,
      limitRef.current.children[0].value,
      customerIdRef.current.value,
      tableNameRef.current.value
    );

    setlogs(res);
  };

  const onRefreshClicked = () => {
    fetchLogs();
  };

  return (
    <VStack w='60%'>
      <HStack w='100%' justifyContent='space-between'>
        <Select
          placeholder='Select customer'
          variant='filled'
          ref={customerIdRef}
        >
          {customerIDs.map((customerID) => (
            <option key={customerID.customer_id} value={customerID.customer_id}>
              Customer {customerID.customer_id}
            </option>
          ))}
        </Select>

        <NumberInput
          defaultValue={0}
          ref={offsetRef}
          min={0}
          step={5}
          allowMouseWheel
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>

        <IconButton
          aria-label='Refresh'
          colorScheme='purple'
          variant='ghost'
          icon={<Icon as={FaSyncAlt} />}
          onClick={onRefreshClicked}
        />

        <NumberInput
          defaultValue={20}
          ref={limitRef}
          min={1}
          step={5}
          allowMouseWheel
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>

        <Select placeholder='Select table' variant='filled' ref={tableNameRef}>
          {tableNames.map((table) => (
            <option key={table.table} value={table.table}>
              {table.table}
            </option>
          ))}
        </Select>
      </HStack>

      <TableContainer w='80%'>
        <Table variant='striped' size='sm' colorScheme='purple'>
          <Thead>
            <Tr>
              <Th>Log ID</Th>
              <Th>Type</Th>
              <Th>Table</Th>
              <Th>Success</Th>
              <Th>Date</Th>
              <Th>Customer ID</Th>
            </Tr>
          </Thead>
          <Tbody>
            {logs &&
              logs.map((log) => (
                <Tr key={log.id}>
                  <Td>{log.id}</Td>
                  <Td>{log.type}</Td>
                  <Td>{log.table}</Td>
                  <Td>{log.was_successful ? 'TRUE' : 'FALSE'}</Td>
                  <Td>{new Date(log.created_at).toLocaleDateString()}</Td>
                  <Td>{log.customer_id}</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
};

export default Logs;
