import { useState, useEffect } from 'react';

// Components
import TableLayout from '../../../components/Employee/TableLayout';

// Chakra UI
import { VStack, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { Tr, Td } from '@chakra-ui/react';

// API
import { getCategoriesData } from '../../../api/employee.requests';

const ModalBody = () => {
  return <VStack w='100%'></VStack>;
};

const DataCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await getCategoriesData();
    setCategories(res);
  };

  const onCreateCallback = () => {
    console.log('Create Category');
  };

  return (
    <TableLayout
      tableColTitles={['ID', 'Name']}
      modalTitle='Create Category'
      modalChildren={ModalBody()}
      onCreateCallback={onCreateCallback}
      tableBody={categories.map((category) => (
        <Tr key={category.id}>
          <Td>{category.id}</Td>
          <Td>{category.name}</Td>
        </Tr>
      ))}
    />
  );
};

export default DataCategories;
