import { getMoviesByName } from './get-movies';
import { refs } from './refs'
import { SEARCH_KEY, clearGallery } from './basic';

import {markupMovieList} from './markup-movie-list'
import { genres } from './genres';
import Notiflix from 'notiflix';

let genresList = genres;
let inputText = '';
let page = 1;
const errorNotificationEl = document.querySelector('.header-warning')

refs.formBtnEl.addEventListener('click', onFormBtnClick);
refs.inputEl.addEventListener('change', onInputType)

function onInputType(event) {
    inputText = event.currentTarget.value;
}


function insertGenresToMovies(keyword, page) {
    return getMoviesByName(keyword, page).then(data => {
    return data.results.map(movie => ({
        ...movie,
        release_date: movie.release_date.split('-')[0],
        genres: movie.genre_ids
        .map(id => genresList.filter(el => el.id === id))
        .flat(),
    }))
    })
}

export function markupKeawordSearchMovies(keyword, page) {
    insertGenresToMovies(keyword, page).then(res => {
        if (res.length === 0) {
            errorNotificationEl.classList.remove('visually-hidden');
            return;
        } else {
        errorNotificationEl.classList.add('visually-hidden')
        }
        Notiflix.Notify.success(`Hooray! Here your movies with ${keyword}!`);

    res.map(element => {
        if (element.genres.length > 2) {
        const Obj = {name: "Other"};
        element.genres[2] = Obj;
        element.genres.length = 3
        }
    })
        markupMovieList(res);
}).catch(error => {
    console.log(error.message)
})
}

function onFormBtnClick(event) {
    event.preventDefault();
    clearGallery();
    localStorage.clear()
    markupKeawordSearchMovies(inputText, page);
    localStorage.setItem('inputValue', inputText);
    localStorage.setItem(SEARCH_KEY, 'byKeywordSearch');
    refs.inputEl.value = '';
}
