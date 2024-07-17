import { useEffect } from 'react';

// Chakra UI
import { Wrap, WrapItem } from '@chakra-ui/react';

// React Router
import { useLoaderData, useNavigate } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';

import SeriesPoster from '../../components/Customer/SeriesPoster';

const Series = () => {
  const { series } = useLoaderData();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.subType !== 'FILMS_AND_SERIES' && user.subType !== 'ONLY_SERIES') {
      navigate('/films');
    }
  }, [user]);

  return (
    <Wrap w='80%' spacing='4'>
      {series.map(({ id, name, poster_path }) => (
        <WrapItem key={id}>
          <SeriesPoster id={id} name={name} posterPath={poster_path} />
        </WrapItem>
      ))}
    </Wrap>
  );
};

export default Series;
