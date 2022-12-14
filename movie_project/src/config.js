export const fetcher = (...args) => fetch(...args).then(res => res.json())
export const ApiKey = '03bd541bf2f755415dbc79580980a1ff';
const tmdbEndpoint = 'https://api.themoviedb.org/3/movie';
const tmdbEndpointSearch = 'https://api.themoviedb.org/3/search/movie';
export const tmdbAPI = {
    getMovieList : (type,page=1)=>`${tmdbEndpoint}/${type}?api_key=${ApiKey}&language=en-US&page=${page}`,
    getMovieDetails : (movieId)=>`${tmdbEndpoint}/${movieId}?api_key=${ApiKey}&language=en-US`,
    getMovieMeta : (movieId,type)=>`${tmdbEndpoint}/${movieId}/${type}?api_key=${ApiKey}&language=en-US`,
    getMovieSearch : (query,page)=>`${tmdbEndpointSearch}?api_key=${ApiKey}&language=en-US&query=${query}&page=${page}&include_adult=false`,
    imgOriginal: (url)=>`https://image.tmdb.org/t/p/original${url}`,
    img500:(url)=>`https://image.tmdb.org/t/p/w500${url}`,
}