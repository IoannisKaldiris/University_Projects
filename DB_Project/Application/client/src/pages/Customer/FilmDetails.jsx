import { useEffect } from 'react';

// Chakra UI
import { Grid, GridItem, VStack, Box, Flex, useToast } from '@chakra-ui/react';
import { Image, Heading, Text, Button, Icon } from '@chakra-ui/react';
import { FaTag } from 'react-icons/fa';

// Redux
import { useSelector } from 'react-redux';

// React Router
import { useLoaderData, useNavigate } from 'react-router-dom';

import { rentShow } from '../../api/customer.requests';

const FilmDetails = () => {
  const { film, categories, languages, actors } = useLoaderData();
  const user = useSelector((state) => state.user);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.subType !== 'FILMS_AND_SERIES' && user.subType !== 'ONLY_FILMS') {
      navigate('/series');
    }
  }, [user]);

  const onRentClick = async () => {
    const res = await rentShow(user.uid, film.id);

    if (res) {
      toast({
        title: 'Film rented successfully.',
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
    <Grid
      maxW='60%'
      gap='5'
      templateAreas={`
    "poster details"
    "poster button"
    `}
      gridTemplateRows={'1fr min-content'}
    >
      <GridItem area='poster'>
        <Image
          src={film.poster_path}
          alt={film.title}
          borderRadius='5'
          maxW='sm'
        />
      </GridItem>

      <GridItem area='details'>
        <VStack h='100%' align='flex-start' justify='center'>
          <Heading size='lg'>{film.title}</Heading>

          <Heading size='xs' color='teal.200' as='i'>
            {new Date(film.release_date).getFullYear()},{' '}
            {film.original_language}, '{film.rating}'{' '}
            {film.special_features ? ', ' + film.special_features : ''}
          </Heading>

          <Text>{film.description}</Text>

          {/* Categories */}
          <Box>
            <Text as='b'>Genres: </Text>
            <Text as='i'>
              {categories.map(({ name }, i, { length }) =>
                i === length - 1 ? `${name}` : `${name}, `
              )}
            </Text>
          </Box>

          {/* Languages */}
          <Box gap='2'>
            <Text as='b'>Available in: </Text>
            <Text as='i'>
              {languages.map(({ name }, i, { length }) =>
                i === length - 1 ? `${name}` : `${name}, `
              )}
            </Text>
          </Box>

          {/* Actors */}
          <Box gap='2'>
            <Text as='b'>Starring: </Text>
            <Text as='i'>
              {actors.map(({ first_name, last_name }, i, { length }) =>
                i === length - 1
                  ? `${first_name} ${last_name}`
                  : `${first_name} ${last_name}, `
              )}
            </Text>
          </Box>
        </VStack>
      </GridItem>

      <GridItem area='button'>
        <Flex w='100%' justify='end'>
          <Button
            colorScheme='teal'
            size='lg'
            leftIcon={<Icon as={FaTag} />}
            onClick={onRentClick}
          >
            Rent
          </Button>
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default FilmDetails;
