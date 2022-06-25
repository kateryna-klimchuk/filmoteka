import { getMoviesByPopularity, getMoviesByYear, getMoviesByGenres } from './get-movies';
import { refs } from './refs';
import { SEARCH_KEY, clearGallery } from './basic';
import { genres, getMovieGenre, renderGenresList } from './genres';
import { startLoader, stopLoader } from './loader.js';
import {markupMovieList} from './markup-movie-list';
import Notiflix from 'notiflix';



let genresList = genres;

refs.formEl.addEventListener('change', (event) => {
    const formValue = event.target;
    event.preventDefault();

if (formValue.id === 'years') {
        localStorage.clear()

    if (formValue.value !== 'year') {
        startLoader();
        onClickSearchBtnClose();
        Notiflix.Notify.success(`Hooray! Here your films by ${formValue.value} year!`);
        clearGallery();
        markupMoviesByYear(formValue.value, page); 
        localStorage.setItem('inputValue', formValue.value);
        localStorage.setItem(SEARCH_KEY, 'byYearSearch');
        stopLoader();

    }}

    
    if (formValue.id === 'genres') {
    localStorage.clear()

        let genreId;

        if (formValue.value !== 'genres') {
            startLoader();
            Notiflix.Notify.success(`Hooray! Here your ${formValue.value} movies!`);
            for (const el of genresList) {

                if (el.name === formValue.value) {
                    genreId = el.id;
                    markupMoviesByGenres(genreId, page);
                    localStorage.setItem('inputValue', genreId);
                    localStorage.setItem(SEARCH_KEY, 'byGenreSearch');

                    onClickSearchBtnClose();
                }
            }
            clearGallery();
            stopLoader()
        }
    }

    if (formValue.id === 'popularity') {
    localStorage.clear()

        if (formValue.value !== 'option') {
            startLoader();
            refs.searchBackdrop.classList.remove('is-open');

            onClickSearchBtnClose();
            Notiflix.Notify.success(`Hooray! We found most popular movies!`);
            clearGallery();
            markupMoviesByPopularity(formValue.value, page);
            localStorage.setItem('inputValue', formValue.value);
            localStorage.setItem(SEARCH_KEY, 'byPopularitySearch');
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


function insertGenresToMoviesByPopularity(param, page) {
return getMoviesByPopularity(param, page).then(data => {
    return data.map(movie => ({
        ...movie,
        release_date: movie.release_date.split('-')[0],
        genres: movie.genre_ids
        .map(id => genresList.filter(el => el.id === id))
        .flat(),
    }))
    })
}

export function markupMoviesByPopularity(param, page) {
    insertGenresToMoviesByPopularity(param, page).then(res => {
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


function insertGenresToMoviesByGenres(id, page) {
    return getMoviesByGenres(id, page).then(data => { 
    return data.map(movie => ({
        ...movie,
        release_date: movie.release_date.split('-')[0],
        genres: movie.genre_ids
        .map(id => genresList.filter(el => el.id === id))
        .flat(),
    }))
    })
}

export function markupMoviesByGenres(id, page) {
    insertGenresToMoviesByGenres(id, page).then(res => {
        res.map(element => {
    if (element.genres.length > 2) {
        const Obj = {name: "Other"};
        element.genres[2] = Obj;
        element.genres.length = 3
    }
    })
        return markupMovieList(res);
}).catch(error => {
    console.log(error.message)
})
}

function insertGenresToMoviesByYear(year, page) {
return getMoviesByYear(year, page).then(data => {
    return data.map(movie => ({
        ...movie,
        release_date: movie.release_date.split('-')[0],
        genres: movie.genre_ids
        .map(id => genresList.filter(el => el.id === id))
        .flat(),
    }))
    })
}

export function markupMoviesByYear(year, page) {
    insertGenresToMoviesByYear(year, page).then(res => {
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




