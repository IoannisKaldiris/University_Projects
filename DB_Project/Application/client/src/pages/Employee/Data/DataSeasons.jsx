import { useState, useEffect } from 'react';

// Components
import TableLayout from '../../../components/Employee/TableLayout';

// Chakra UI
import { VStack, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { Tr, Td } from '@chakra-ui/react';

// API
import { getSeasonsData } from '../../../api/employee.requests';

const ModalBody = () => {
  return <VStack w='100%'></VStack>;
};

const DataSeasons = () => {
  const [seasons, setSeasons] = useState([]);

  useEffect(() => {
    fetchSeasons();
  }, []);

  const fetchSeasons = async () => {
    const res = await getSeasonsData();
    setSeasons(res);
  };

  const onCreateCallback = () => {
    console.log('Create Season');
  };

  return (
    <TableLayout
      tableColTitles={['ID', 'Number', 'Series Title']}
      modalTitle='Create Season'
      modalChildren={ModalBody()}
      onCreateCallback={onCreateCallback}
      tableBody={seasons.map((season) => (
        <Tr key={season.id}>
          <Td>{season.id}</Td>
          <Td>{season.season_no}</Td>
          <Td>{season.name}</Td>
        </Tr>
      ))}
    />
  );
};

export default DataSeasons;
