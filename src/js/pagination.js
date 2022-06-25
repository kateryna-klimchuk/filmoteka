import { refs } from "./refs";
import {markupPopularMovies} from './trending-movie'
import { SEARCH_KEY, clearGallery } from './basic';
import { markupKeawordSearchMovies } from './keaword-search';
import { markupMoviesByPopularity, markupMoviesByGenres, markupMoviesByYear } from './search-form';

let page = 1;
let currentValue;
let inputValue;

refs.loadMoreBtn.addEventListener('click', onLoadBtnClick);

function onLoadBtnClick(event) {
    event.preventDefault();
    page += 1;

    currentValue = localStorage.getItem(SEARCH_KEY);
    clearGallery();
    if (currentValue === 'byKeywordSearch') {
        inputValue = localStorage.getItem('inputValue');
        console.log(inputValue);
        markupKeawordSearchMovies(inputValue, page);

    } else if (currentValue === 'byYearSearch') {
        inputValue = localStorage.getItem('inputValue');
        markupMoviesByYear(inputValue, page);

    } else if (currentValue === 'byGenreSearch') {
        inputValue = localStorage.getItem('inputValue');
        markupMoviesByGenres(inputValue, page)
    } else if (currentValue === 'byPopularitySearch') {
        inputValue = localStorage.getItem('inputValue');
        markupMoviesByPopularity(inputValue, page)

    } else {
    markupPopularMovies(page);
    }
}
