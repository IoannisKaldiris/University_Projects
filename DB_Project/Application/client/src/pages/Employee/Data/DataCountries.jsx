import { useState, useEffect } from 'react';

// Components
import TableLayout from '../../../components/Employee/TableLayout';

// Chakra UI
import { VStack, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { Tr, Td } from '@chakra-ui/react';

// API
import { getCountriesData } from '../../../api/employee.requests';

const ModalBody = () => {
  return (
    <VStack w='100%'>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input variant='filled' />
      </FormControl>
    </VStack>
  );
};

const DataCountries = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    const res = await getCountriesData();
    setCountries(res);
  };

  const onCreateCallback = (values) => {
    console.log('Create Country');
  };

  return (
    <TableLayout
      tableColTitles={['ID', 'Name']}
      modalTitle='Create Country'
      modalChildren={ModalBody()}
      onCreateCallback={onCreateCallback}
      tableBody={countries.map((country) => (
        <Tr key={country.id}>
          <Td>{country.id}</Td>
          <Td>{country.name}</Td>
        </Tr>
      ))}
    />
  );
};

export default DataCountries;
