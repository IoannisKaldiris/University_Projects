// Chakra UI
import { Card, CardBody, CardFooter } from '@chakra-ui/react';
import { Center, Text, Image } from '@chakra-ui/react';

// React Router
import { Link as RouterLink } from 'react-router-dom';

const SeriesPoster = ({ id, name, posterPath }) => {
  return (
    <Card
      maxW='2xs'
      h='100%'
      variant='elevated'
      overflow='hidden'
      as={RouterLink}
      to={`/series/${id}`}
    >
      <CardBody p='0'>
        <Image
          src={posterPath}
          alt={name}
          objectFit='cover'
          fallbackSrc='https://via.placeholder.com/300x500.png/2D3748?text=rentomatic'
        />
      </CardBody>

      <CardFooter h='100%' p='3'>
        <Center>
          <Text fontSize='lg'>{name}</Text>
        </Center>
      </CardFooter>
    </Card>
  );
};

export default SeriesPoster;
