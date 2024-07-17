import { useEffect } from 'react';

// React Router
import { useLoaderData, useNavigate } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';

// Chakra UI
import { HStack, Center } from '@chakra-ui/react';
import { Card, CardBody, CardFooter } from '@chakra-ui/react';
import { Image, Heading, Text } from '@chakra-ui/react';

import EpisodesTable from '../../components/Customer/EpisodesTable';

const SeriesDetails = () => {
  const { series, seasons, episodes } = useLoaderData();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.subType !== 'FILMS_AND_SERIES' && user.subType !== 'ONLY_SERIES') {
      navigate('/films');
    }
  }, [user]);

  return (
    <HStack maxW='70%' gap='5' maxH='50%' align='flex-start'>
      {/* Poster */}
      <Card overflow='hidden' variant='unstyled' maxW='sm'>
        <CardBody p='0' w='fit-content'>
          <Image
            src={series.poster_path}
            alt={series.name}
            borderRadius='5'
            objectFit='cover'
            maxW='sm'
          />
        </CardBody>

        <CardFooter p='1'>
          <Center flexDirection='column'>
            <Heading size='md' color='teal.200'>
              {series.name}
            </Heading>
            <Text as='i' w='100%'>
              {new Date(series.release_date).getFullYear()}
            </Text>
          </Center>
        </CardFooter>
      </Card>

      {/* Seasons */}
      <EpisodesTable seasons={seasons} episodes={episodes} />
    </HStack>
  );
};

export default SeriesDetails;
