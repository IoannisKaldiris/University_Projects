import API_URI from './endpoint';

export const getSeries = async () => {
  const res = await fetch(`${API_URI}/series/all`);
  const series = await res.json();
  return { series };
};

export const getSeriesDetails = async (id) => {
  const resSeries = await fetch(`${API_URI}/series/${id}`);

  if (resSeries.status === 404) {
    return { series: null, seasons: null, episodes: null };
  }

  const resSeasons = await fetch(`${API_URI}/series/${id}/seasons`);
  const resEpisodes = await fetch(`${API_URI}/series/${id}/episodes`);

  const series = await resSeries.json();
  const seasons = await resSeasons.json();
  const episodes = await resEpisodes.json();

  return { series, seasons, episodes };
};

export const getEpisodeDetails = async (id) => {
  const resEpisode = await fetch(`${API_URI}/series/episodes/${id}`);

  if (resEpisode.status === 404) {
    return { episode: null, categories: null, languages: null, actors: null };
  }

  const resCategories = await fetch(
    `${API_URI}/series/episodes/${id}/categories`
  );
  const resLanguages = await fetch(
    `${API_URI}/series/episodes/${id}/languages`
  );
  const resActors = await fetch(`${API_URI}/series/episodes/${id}/actors`);

  const episode = await resEpisode.json();
  const categories = await resCategories.json();
  const languages = await resLanguages.json();
  const actors = await resActors.json();

  return { episode, categories, languages, actors };
};
