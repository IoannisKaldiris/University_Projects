import { useState, useEffect } from 'react';

// Components
import TableLayout from '../../../components/Employee/TableLayout';

// Chakra UI
import { VStack, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { Tr, Td } from '@chakra-ui/react';

// API
import { getCitiesData } from '../../../api/employee.requests';

const ModalBody = () => {
  return <VStack w='100%'></VStack>;
};

const DataCities = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    const res = await getCitiesData();
    setCities(res);
  };

  const onCreateCallback = () => {
    console.log('Create City');
  };

  return (
    <TableLayout
      tableColTitles={['ID', 'Name', 'Country']}
      modalTitle='Create City'
      modalChildren={ModalBody()}
      onCreateCallback={onCreateCallback}
      tableBody={cities.map((city) => (
        <Tr key={city.id}>
          <Td>{city.id}</Td>
          <Td>{city.name}</Td>
          <Td>{city.country_name}</Td>
        </Tr>
      ))}
    />
  );
};

export default DataCities;
