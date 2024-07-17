// Chakra UI
import { VStack, IconButton, Icon, useDisclosure } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';

// Components
import NewItemModal from './NewItemModal';

const TableLayout = ({
  tableColTitles = [],
  tableBody,
  modalChildren,
  modalTitle,
  onCreateCallback,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <VStack w='80%'>
        <IconButton
          aria-label='Add Item'
          w='100%'
          variant='ghost'
          colorScheme='yellow'
          icon={<Icon as={FaPlus} />}
          onClick={onOpen}
        />

        <TableContainer w='100%'>
          <Table variant='simple' size='sm'>
            <Thead>
              <Tr>
                {tableColTitles.map((title, index) => (
                  <Th key={index}>{title}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>{tableBody}</Tbody>
          </Table>
        </TableContainer>
      </VStack>

      <NewItemModal
        title={modalTitle}
        isOpen={isOpen}
        onClose={onClose}
        children={modalChildren}
        onCreateCallback={() => {
          onCreateCallback();
          onClose();
        }}
      />
    </>
  );
};

export default TableLayout;
