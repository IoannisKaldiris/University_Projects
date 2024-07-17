import API_URI from './endpoint';

export const getStats = async () => {
  const resFilms = await fetch(`${API_URI}/employee/films/stats/5`);
  const resSeries = await fetch(`${API_URI}/employee/series/stats/5`);

  const films = await resFilms.json();
  const series = await resSeries.json();

  return { films, series };
};

export const getCountriesData = async () => {
  const res = await fetch(`${API_URI}/employee/data/countries`);
  return await res.json();
};

export const getCitiesData = async () => {
  const res = await fetch(`${API_URI}/employee/data/cities`);
  return await res.json();
};

export const getAddressesData = async () => {
  const res = await fetch(`${API_URI}/employee/data/addresses`);
  return await res.json();
};

export const getActorsData = async () => {
  const res = await fetch(`${API_URI}/employee/data/actors`);
  return await res.json();
};

export const getLanguagesData = async () => {
  const res = await fetch(`${API_URI}/employee/data/languages`);
  return await res.json();
};

export const getCategoriesData = async () => {
  const res = await fetch(`${API_URI}/employee/data/categories`);
  return await res.json();
};

export const getEpisodesData = async () => {
  const res = await fetch(`${API_URI}/employee/data/episodes`);
  return await res.json();
};

export const getSeasonsData = async () => {
  const res = await fetch(`${API_URI}/employee/data/seasons`);
  return await res.json();
};

export const getSeriesData = async () => {
  const res = await fetch(`${API_URI}/employee/data/series`);
  return await res.json();
};

export const getFilmsData = async () => {
  const res = await fetch(`${API_URI}/employee/data/films`);
  return await res.json();
};
