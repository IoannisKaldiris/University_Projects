import { useState, useEffect } from 'react';

// Components
import TableLayout from '../../../components/Employee/TableLayout';

// Chakra UI
import { VStack, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { Tr, Td } from '@chakra-ui/react';

// API
import { getAddressesData } from '../../../api/employee.requests';

const ModalBody = () => {
  return <VStack w='100%'></VStack>;
};

const DataAddresses = () => {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    const res = await getAddressesData();
    setAddresses(res);
  };

  const onCreateCallback = () => {
    console.log('Create Address');
  };

  return (
    <TableLayout
      tableColTitles={['ID', 'Street', 'City', 'Country']}
      modalTitle='Create Address'
      modalChildren={ModalBody()}
      onCreateCallback={onCreateCallback}
      tableBody={addresses.map((address) => (
        <Tr key={address.id}>
          <Td>{address.id}</Td>
          <Td>{address.street}</Td>
          <Td>{address.city_name}</Td>
          <Td>{address.country_name}</Td>
        </Tr>
      ))}
    />
  );
};

export default DataAddresses;
