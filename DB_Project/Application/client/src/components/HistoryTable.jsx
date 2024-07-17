import { useState, useEffect } from 'react';

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

import { getHistory } from '../api/customer.requests';

const HistoryTable = ({ id }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await getHistory(id);
      setHistory(res);
    };

    fetchHistory();
  }, [id]);

  return (
    <TableContainer pt='2'>
      <Table variant='simple' size='sm' maxH='250px'>
        <Thead>
          <Tr>
            <Th>Order ID</Th>
            <Th>Order Type</Th>
            <Th>Title</Th>
            <Th>Order Date</Th>
            <Th>Price</Th>
          </Tr>
        </Thead>
        <Tbody>
          {history.map((order) => (
            <Tr key={order.id}>
              <Td>{order.id}</Td>
              <Td>{order.is_film ? 'FILM' : 'EPISODE'}</Td>
              <Td>
                {order.is_film
                  ? `${order.title}`
                  : `${order.series_name}: S${order.season_no} E${order.episode_no}`}
              </Td>
              <Td>{new Date(order.created_at).toLocaleDateString()}</Td>
              <Td>&euro; {order.amount.toFixed(2)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default HistoryTable;
