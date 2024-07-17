import { useState } from 'react';

// Chakra UI
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';
import { Box, Heading, Link, useDisclosure } from '@chakra-ui/react';

import EpisodeModal from './EpisodeModal';

const EpisodesTable = ({ seasons, episodes }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedEpisodeId, setSelectedEpisodeId] = useState(null);

  return (
    <>
      <Accordion allowToggle w='md' defaultIndex={[0]}>
        {seasons.map((season) => (
          <AccordionItem key={season.id} w='100%'>
            <AccordionButton>
              <Box flex='1' textAlign='left'>
                <Heading size='sm'>Season {season.season_no}</Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <TableContainer w='100%'>
                <Table variant='simple' size='sm'>
                  <Thead>
                    <Tr>
                      <Th>No.</Th>
                      <Th>Title</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {episodes
                      .filter((ep) => ep.season_no === season.season_no)
                      .map((ep) => (
                        <Tr key={ep.id}>
                          <Td>{ep.episode_no}</Td>
                          <Td>
                            <Link
                              color='teal.200'
                              onClick={() => {
                                onOpen();
                                setSelectedEpisodeId(ep.id);
                              }}
                            >
                              {ep.title}
                            </Link>
                          </Td>
                        </Tr>
                      ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
      <EpisodeModal isOpen={isOpen} onClose={onClose} id={selectedEpisodeId} />
    </>
  );
};

export default EpisodesTable;
