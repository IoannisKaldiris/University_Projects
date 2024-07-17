import { useState, useEffect } from 'react';

// Components
import TableLayout from '../../../components/Employee/TableLayout';

// Chakra UI
import { VStack, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { Tr, Td } from '@chakra-ui/react';

// API
import { getLanguagesData } from '../../../api/employee.requests';

const ModalBody = () => {
  return <VStack w='100%'></VStack>;
};

const DataLanguages = () => {
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    fetchLanguages();
  }, []);

  const fetchLanguages = async () => {
    const res = await getLanguagesData();
    setLanguages(res);
  };

  const onCreateCallback = () => {
    console.log('Create Language');
  };

  return (
    <TableLayout
      tableColTitles={['ID', 'Name']}
      modalTitle='Create Language'
      modalChildren={ModalBody()}
      onCreateCallback={onCreateCallback}
      tableBody={languages.map((language) => (
        <Tr key={language.id}>
          <Td>{language.id}</Td>
          <Td>{language.name}</Td>
        </Tr>
      ))}
    />
  );
};

export default DataLanguages;
