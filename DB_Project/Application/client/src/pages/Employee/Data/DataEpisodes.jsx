import { useState, useEffect } from 'react';

// Components
import TableLayout from '../../../components/Employee/TableLayout';

// Chakra UI
import { VStack, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { Tr, Td } from '@chakra-ui/react';

// API
import { getEpisodesData } from '../../../api/employee.requests';

const ModalBody = () => {
  return <VStack w='100%'></VStack>;
};

const DataEpisodes = () => {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    fetchEpisodes();
  }, []);

  const fetchEpisodes = async () => {
    const res = await getEpisodesData();
    setEpisodes(res);
  };

  const onCreateCallback = () => {
    console.log('Create Episode');
  };

  return (
    <TableLayout
      tableColTitles={['ID', 'Title', 'Season', 'Series']}
      modalTitle='Create Episode'
      modalChildren={ModalBody()}
      onCreateCallback={onCreateCallback}
      tableBody={episodes.map((episode) => (
        <Tr key={episode.id}>
          <Td>{episode.id}</Td>
          <Td>{episode.title}</Td>
          <Td>{episode.season_no}</Td>
          <Td>{episode.name}</Td>
        </Tr>
      ))}
    />
  );
};

export default DataEpisodes;
