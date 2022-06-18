// import { getMovieGenre } from './movie-genres';
import { getGenres, getMoviesByPopularity, getMoviesByYear, getMoviesByGenres } from './get-movies';
import { refs } from './refs';

import {API_KEY, BASE_URL} from './basic'

import { startLoader, stopLoader } from './loader.js';
// import { renderGenresList } from './genres';
import moviesListPatern from '../handlebars/movie-item.hbs';
import Notiflix from 'notiflix';


renderGenresList();

let genresList;


refs.formEl.addEventListener('click', (event) => {
    const formValue = event.target;
    event.preventDefault();

if (formValue.id === 'years') {
    
    if (formValue.value !== 'year') {
        startLoader();

        onClickSearchBtnClose();
        Notiflix.Notify.success(`Hooray! Here your films by ${formValue.value} year!`);
        clearGallery();
        markupMoviesByYear(formValue.value); 
        stopLoader();

    }}

    
    if (formValue.id === 'genres') {

        let genreId;

        if (formValue.value !== 'genres') {
                startLoader();

            onClickSearchBtnClose();
            Notiflix.Notify.success(`Hooray! Here your ${formValue.value} movies!`);
            for (const el of genresList) {

                if (el.name === formValue.value) {
                    genreId = el.id;
                }
            }
            clearGallery();
            markupMoviesByGenres(genreId);
            stopLoader();

        }
    }

    if (formValue.id === 'popularity') {

        if (formValue.value !== 'option') {
                startLoader();

            onClickSearchBtnClose();
            Notiflix.Notify.success(`Hooray! We found most popular movies!`);
            clearGallery();
            markupMoviesByPopularity(formValue.value);
            stopLoader();

        }
    }

    refs.formEl.reset();

})


refs.searchBtnOpen.addEventListener('click', onClickSearchBtnOpen)
refs.searchBtnClose.addEventListener('click', onClickSearchBtnClose)
function onClickSearchBtnOpen() {
    refs.searchBackdrop.classList.add('is-open');
}

function onClickSearchBtnClose() {
    refs.searchBackdrop.classList.remove('is-open');
}


async function renderGenresList() {

    const response = await getGenres();
    genresList = response.genres;
    const genresItems = genresList.map(({ name }) => {
    return `<option value="${name}">${name}</option>`
}).join('');
refs.searchGenreEl.insertAdjacentHTML('beforeend', genresItems)
}


function clearGallery() {
    refs.galleryEl.innerHTML = '';
}


function insertGenresToMoviesByPopularity(param) {
return getMoviesByPopularity(param).then(data => {
    return getGenres().then(genresList => {
    return data.map(movie => ({
        ...movie,
        release_date: movie.release_date.split('-')[0],
        genres: movie.genre_ids
        .map(id => genresList.genres.filter(el => el.id === id))
        .flat(),
    }))
    })
})
}

function markupMoviesByPopularity(param) {
    insertGenresToMoviesByPopularity(param).then(res => {
    res.map(element => {
    if (element.genres.length > 2) {
        const Obj = {name: "Other"};
        element.genres[2] = Obj;
        element.genres.length = 3
    }
    })
        renderMoviesList(res);
}).catch(error => {
    console.log(error.message)
})
}


function insertGenresToMoviesByGenres(id) {
    return getMoviesByGenres(id).then(data => {
        return getGenres().then(genresList => {
    return data.map(movie => ({
        ...movie,
        release_date: movie.release_date.split('-')[0],
        genres: movie.genre_ids
        .map(id => genresList.genres.filter(el => el.id === id))
        .flat(),
    }))
    })
})
}

function markupMoviesByGenres(id) {
    insertGenresToMoviesByGenres(id).then(res => {
        res.map(element => {
    if (element.genres.length > 2) {
        const Obj = {name: "Other"};
        element.genres[2] = Obj;
        element.genres.length = 3
    }
    })
        return renderMoviesList(res);
}).catch(error => {
    console.log(error.message)
})
}

function insertGenresToMoviesByYear(year) {
return getMoviesByYear(year).then(data => {
    return getGenres().then(genresList => {
    return data.map(movie => ({
        ...movie,
        release_date: movie.release_date.split('-')[0],
        genres: movie.genre_ids
        .map(id => genresList.genres.filter(el => el.id === id))
        .flat(),
    }))
    })
})
}

function markupMoviesByYear(year) {
    insertGenresToMoviesByYear(year).then(res => {
    res.map(element => {
    if (element.genres.length > 2) {
        const Obj = {name: "Other"};
        element.genres[2] = Obj;
        element.genres.length = 3
    }
    })
        renderMoviesList(res);
}).catch(error => {
    console.log(error.message)
})
}

function renderMoviesList(movies) {
    const markup = moviesListPatern(movies)
    refs.galleryEl.insertAdjacentHTML('beforeend', markup);
}



