import axios from 'axios';
import {API_KEY, BASE_URL, SEARCH_URL} from './basic'
import { genres, getMovieGenre, renderGenresList } from './genres';


let page = 1;

export async function getTrendingMovies(page) {
    const url = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&language=en&include_adult=falsepage=${page}`;
    const response = await axios.get(url);
    return response.data;
}

export async function getMoviesById(id) {
    const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en&include_adult=false`;
    const response = await axios.get(url);
    return response;
}

export async function getMoviesByName(keyword) {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${keyword}&language=en&include_adult=false`;
    const response = await axios.get(url);
    return response.data;
}

export async function getGenres() {
    const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en`;
    const response = await axios.get(url);
    return response.data;
};

// ---- for searching form with genres, year and popularity---



export async function getMoviesByGenres(genreId) {
    const url = `${SEARCH_URL}api_key=${API_KEY}&language=en-US&include_adult=false&include_video=false&page=1&with_genres=${genreId}`;
    const response = await axios.get(url);
    return response.data.results;
};

export async function getMoviesByYear(year) {
    const url = `${SEARCH_URL}api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=${year}-01-01&primary_release_date.lte=${year}-12-31`;
    const response = await axios.get(url);
    return response.data.results;
}

export async function getMoviesByPopularity(param) {
    const url = `${SEARCH_URL}api_key=${API_KEY}&language=en-US&sort_by=${param}.desc&include_adult=false`;
    const response = await axios.get(url);
    return response.data.results;
}