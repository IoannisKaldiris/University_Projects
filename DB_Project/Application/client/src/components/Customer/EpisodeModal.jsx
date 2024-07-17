import { useState, useEffect } from 'react';

// Redux
import { useSelector } from 'react-redux';

// Chakra UI
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import {
  Button,
  Icon,
  VStack,
  Heading,
  Text,
  Box,
  useToast,
} from '@chakra-ui/react';
import { FaTag } from 'react-icons/fa';

import { getEpisodeDetails } from '../../api/series.requests';
import { rentShow } from '../../api/customer.requests';

const EpisodeModal = ({ isOpen, onClose, id }) => {
  const [episode, setEpisode] = useState({});
  const uid = useSelector((state) => state.user.uid);
  const toast = useToast();

  useEffect(() => {
    const fetchEpisode = async () => {
      const res = await getEpisodeDetails(id);
      setEpisode(res);
    };

    isOpen && fetchEpisode();
  }, [isOpen]);

  const onRentClick = async () => {
    const res = await rentShow(uid, id);

    if (res) {
      toast({
        title: 'Episode rented successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Something went wrong.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setEpisode({});
      }}
      size='2xl'
    >
      <ModalOverlay />
      {episode.episode && (
        <ModalContent>
          <ModalHeader>
            S{episode.episode.season_no}E{episode.episode.episode_no}:{' '}
            {episode.episode.title}
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <VStack h='100%' align='flex-start' justify='center'>
              <Heading size='xs' color='teal.200' as='i'>
                {new Date(episode.episode.release_date).toLocaleDateString()},{' '}
                {episode.episode.original_language}, '{episode.episode.rating}'{' '}
                {episode.episode.special_features
                  ? ', ' + episode.episode.special_features
                  : ''}
              </Heading>
              <Text>{episode.episode.description}</Text>

              {/* Categories */}
              <Box>
                <Text as='b'>Genres: </Text>
                <Text as='i'>
                  {episode.categories.map(({ name }, i, { length }) =>
                    i === length - 1 ? `${name}` : `${name}, `
                  )}
                </Text>
              </Box>

              {/* Languages */}
              <Box gap='2'>
                <Text as='b'>Available in: </Text>
                <Text as='i'>
                  {episode.languages.map(({ name }, i, { length }) =>
                    i === length - 1 ? `${name}` : `${name}, `
                  )}
                </Text>
              </Box>

              {/* Actors */}
              <Box gap='2'>
                <Text as='b'>Starring: </Text>
                <Text as='i'>
                  {episode.actors.map(
                    ({ first_name, last_name }, i, { length }) =>
                      i === length - 1
                        ? `${first_name} ${last_name}`
                        : `${first_name} ${last_name}, `
                  )}
                </Text>
              </Box>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme='teal'
              leftIcon={<Icon as={FaTag} />}
              onClick={onRentClick}
            >
              Rent
            </Button>
          </ModalFooter>
        </ModalContent>
      )}
    </Modal>
  );
};

export default EpisodeModal;
