import { useState, useEffect } from 'react';

// Components
import TableLayout from '../../../components/Employee/TableLayout';

// Chakra UI
import { VStack, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { Tr, Td } from '@chakra-ui/react';

// API
import { getActorsData } from '../../../api/employee.requests';

const ModalBody = () => {
  return <VStack w='100%'></VStack>;
};

const DataActors = () => {
  const [actors, setActors] = useState([]);

  useEffect(() => {
    fetchActors();
  }, []);

  const fetchActors = async () => {
    const res = await getActorsData();
    setActors(res);
  };

  const onCreateCallback = () => {
    console.log('Create Actor');
  };

  return (
    <TableLayout
      tableColTitles={['ID', 'First Name', 'Last Name']}
      modalTitle='Create Actor'
      modalChildren={ModalBody()}
      onCreateCallback={onCreateCallback}
      tableBody={actors.map((actor) => (
        <Tr key={actor.id}>
          <Td>{actor.id}</Td>
          <Td>{actor.first_name}</Td>
          <Td>{actor.last_name}</Td>
        </Tr>
      ))}
    />
  );
};

export default DataActors;
