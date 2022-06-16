import axios from 'axios';
import { refs } from './refs';
import {API_KEY, BASE_URL} from './basic'


export async function getGenres() {
    const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`;
    const response = await axios.get(url);
    return response.data;
};

export async function renderGenresList() {

    const resp = await getGenres();
    const genresItems = resp.genres.map(({ name }) => {
    return `<option value="${name}">${name}</option>`
}).join('');
refs.searchGenreEl.insertAdjacentHTML('beforeend', genresItems)
}
renderGenresList();