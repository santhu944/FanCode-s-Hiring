const apiKey = '2dca580c2a14b55200e784d157207b4d';

export const fetchMovies = async (year: number, genreId: number | null, query: string) => {
  let apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&primary_release_year=${year}&page=1&vote_count.gte=100`;
  if (genreId) {
    apiUrl += `&with_genres=${genreId}`;
  }
  if (query) {
    apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&page=1&vote_count.gte=100`;
  }
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.results;
};
