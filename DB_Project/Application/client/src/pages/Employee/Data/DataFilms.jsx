import { useState, useEffect } from 'react';

// Components
import TableLayout from '../../../components/Employee/TableLayout';

// Chakra UI
import { VStack, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { Tr, Td } from '@chakra-ui/react';

// API
import { getFilmsData } from '../../../api/employee.requests';

const ModalBody = () => {
  return <VStack w='100%'></VStack>;
};

const DataFilms = () => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    fetchFilms();
  }, []);

  const fetchFilms = async () => {
    const res = await getFilmsData();
    setFilms(res);
  };

  const onCreateCallback = () => {
    console.log('Create Film');
  };

  return (
    <TableLayout
      tableColTitles={['ID', 'Title']}
      modalTitle='Create Film'
      modalChildren={ModalBody()}
      onCreateCallback={onCreateCallback}
      tableBody={films.map((film) => (
        <Tr key={film.id}>
          <Td>{film.id}</Td>
          <Td>{film.title}</Td>
        </Tr>
      ))}
    />
  );
};

export default DataFilms;
