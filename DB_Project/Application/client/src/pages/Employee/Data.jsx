// Chakra UI
import { VStack, ButtonGroup, Button } from '@chakra-ui/react';

// React Router
import { Outlet, Link as RouterLink, useLocation } from 'react-router-dom';

const Data = () => {
  const location = useLocation();

  return (
    <VStack w='60%'>
      <ButtonGroup spacing='6' isAttached colorScheme='yellow'>
        <Button
          variant={
            location.pathname === '/employee/data/films' ? 'solid' : 'ghost'
          }
          as={RouterLink}
          to='/employee/data/films'
        >
          Films
        </Button>
        <Button
          variant={
            location.pathname === '/employee/data/series' ? 'solid' : 'ghost'
          }
          as={RouterLink}
          to='/employee/data/series'
        >
          Series
        </Button>
        <Button
          variant={
            location.pathname === '/employee/data/seasons' ? 'solid' : 'ghost'
          }
          as={RouterLink}
          to='/employee/data/seasons'
        >
          Seasons
        </Button>
        <Button
          variant={
            location.pathname === '/employee/data/episodes' ? 'solid' : 'ghost'
          }
          as={RouterLink}
          to='/employee/data/episodes'
        >
          Episodes
        </Button>
        <Button
          variant={
            location.pathname === '/employee/data/categories'
              ? 'solid'
              : 'ghost'
          }
          as={RouterLink}
          to='/employee/data/categories'
        >
          Categories
        </Button>
        <Button
          variant={
            location.pathname === '/employee/data/languages' ? 'solid' : 'ghost'
          }
          as={RouterLink}
          to='/employee/data/languages'
        >
          Languages
        </Button>
        <Button
          variant={
            location.pathname === '/employee/data/actors' ? 'solid' : 'ghost'
          }
          as={RouterLink}
          to='/employee/data/actors'
        >
          Actors
        </Button>
        <Button
          variant={
            location.pathname === '/employee/data/addresses' ? 'solid' : 'ghost'
          }
          as={RouterLink}
          to='/employee/data/addresses'
        >
          Addresses
        </Button>
        <Button
          variant={
            location.pathname === '/employee/data/cities' ? 'solid' : 'ghost'
          }
          as={RouterLink}
          to='/employee/data/cities'
        >
          Cities
        </Button>
        <Button
          variant={
            location.pathname === '/employee/data/countries' ? 'solid' : 'ghost'
          }
          as={RouterLink}
          to='/employee/data/countries'
        >
          Countries
        </Button>
      </ButtonGroup>

      <Outlet />
    </VStack>
  );
};

export default Data;
