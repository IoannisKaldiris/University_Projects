import { useState, useEffect } from 'react';

// Components
import TableLayout from '../../../components/Employee/TableLayout';

// Chakra UI
import { VStack, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { Tr, Td } from '@chakra-ui/react';

// API
import { getSeriesData } from '../../../api/employee.requests';

const ModalBody = () => {
  return <VStack w='100%'></VStack>;
};

const DataSeries = () => {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    fetchSeries();
  }, []);

  const fetchSeries = async () => {
    const res = await getSeriesData();
    setSeries(res);
  };

  const onCreateCallback = () => {
    console.log('Create Series');
  };

  return (
    <TableLayout
      tableColTitles={['ID', 'Name']}
      modalTitle='Create Series'
      modalChildren={ModalBody()}
      onCreateCallback={onCreateCallback}
      tableBody={series.map((series) => (
        <Tr key={series.id}>
          <Td>{series.id}</Td>
          <Td>{series.name}</Td>
        </Tr>
      ))}
    />
  );
};

export default DataSeries;
