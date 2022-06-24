import { refs } from './refs';

export const API_KEY = '532c56a8c591a340308597d9f66fd331';
export const BASE_URL = "https://api.themoviedb.org/3";
export const SEARCH_URL = "https://api.themoviedb.org/3/discover/movie?";

export function clearGallery() {
    refs.galleryEl.innerHTML = '';
}