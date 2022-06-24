import axios from 'axios';
import {API_KEY, BASE_URL, SEARCH_URL} from './basic'
import { genres, getMovieGenre, renderGenresList } from './genres';


export async function getTrendingMovies(page = 1) {
    const url = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&language=en&include_adult=false&page=${page}`;
    const response = await axios.get(url);
    return response.data;
}

export async function getMoviesById(id, page = 1) {
    const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en&include_adult=false&page=${page}`;
    const response = await axios.get(url);
    return response;
}

export async function getMoviesByName(keyword, page = 1) {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${keyword}&language=en&include_adult=false&page=${page}`;
    const response = await axios.get(url);
    return response.data;
}

export async function getGenres() {
    const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en`;
    const response = await axios.get(url);
    return response.data;
};

// ---- for searching form with genres, year and popularity---



export async function getMoviesByGenres(genreId, page = 1) {
    const url = `${SEARCH_URL}api_key=${API_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}&with_genres=${genreId}`;
    const response = await axios.get(url);
    return response.data.results;
};

export async function getMoviesByYear(year, page = 1) {
    const url = `${SEARCH_URL}api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&primary_release_date.gte=${year}-01-01&primary_release_date.lte=${year}-12-31`;
    const response = await axios.get(url);
    return response.data.results;
}

export async function getMoviesByPopularity(param, page = 1) {
    const url = `${SEARCH_URL}api_key=${API_KEY}&language=en-US&sort_by=${param}.desc&include_adult=false&page=${page}`;
    const response = await axios.get(url);
    return response.data.results;
}

export async function getMorePopularMovies(page = 1) {
    const url = `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`;
    const response = await axios.get(url);
    return response.data.results;
}