import API_URI from './endpoint';

export const getFilms = async () => {
  const res = await fetch(`${API_URI}/films/all`);
  const films = await res.json();
  return { films };
};

export const getFilmDetails = async (id) => {
  const res = await fetch(`${API_URI}/films/${id}`);

  if (res.status === 404) {
    return { film: null, categories: null, languages: null, actors: null };
  }

  const resCategories = await fetch(`${API_URI}/films/${id}/categories`);
  const resLanguages = await fetch(`${API_URI}/films/${id}/languages`);
  const resActors = await fetch(`${API_URI}/films/${id}/actors`);

  const film = await res.json();
  const categories = await resCategories.json();
  const languages = await resLanguages.json();
  const actors = await resActors.json();

  return { film, categories, languages, actors };
};
