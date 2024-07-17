import { useEffect } from 'react';

// Chakra UI
import { Wrap, WrapItem } from '@chakra-ui/react';

// React Router
import { useLoaderData, useNavigate } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';

import FilmPoster from '../../components/Customer/FilmPoster';

const Films = () => {
  const { films } = useLoaderData();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.subType !== 'FILMS_AND_SERIES' && user.subType !== 'ONLY_FILMS') {
      navigate('/series');
    }
  }, [user]);

  return (
    <Wrap w='80%' spacing='4'>
      {films.map(({ id, title, poster_path }) => (
        <WrapItem key={id}>
          <FilmPoster id={id} title={title} posterPath={poster_path} />
        </WrapItem>
      ))}
    </Wrap>
  );
};

export default Films;
