import { getGenres, getMoviesByPopularity, getMoviesByYear, getMoviesByGenres } from './get-movies';
import { refs } from './refs';
import { clearGallery } from './basic';
import { genres, getMovieGenre, renderGenresList } from './genres';
import { startLoader, stopLoader } from './loader.js';
import {markupMovieList} from './markup-movie-list';
import Notiflix from 'notiflix';



let genresList = genres;

refs.formEl.addEventListener('change', (event) => {
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
            Notiflix.Notify.success(`Hooray! Here your ${formValue.value} movies!`);
            for (const el of genresList) {

                if (el.name === formValue.value) {
                    console.log(formValue.value);
                    genreId = el.id;
                    markupMoviesByGenres(genreId);
                    onClickSearchBtnClose();
                }
            }
            clearGallery();
            stopLoader()
        }
    }

    if (formValue.id === 'popularity') {

        if (formValue.value !== 'option') {
            startLoader();
            refs.searchBackdrop.classList.remove('is-open');

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


function insertGenresToMoviesByPopularity(param) {
return getMoviesByPopularity(param).then(data => {
    return data.map(movie => ({
        ...movie,
        release_date: movie.release_date.split('-')[0],
        genres: movie.genre_ids
        .map(id => genresList.filter(el => el.id === id))
        .flat(),
    }))
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
        markupMovieList(res);
}).catch(error => {
    console.log(error.message)
})
}
// ======search without fetch======



function insertGenresToMoviesByGenres(id) {
    return getMoviesByGenres(id).then(data => { 
    return data.map(movie => ({
        ...movie,
        release_date: movie.release_date.split('-')[0],
        genres: movie.genre_ids
        .map(id => genresList.filter(el => el.id === id))
        .flat(),
    }))
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
        return markupMovieList(res);
}).catch(error => {
    console.log(error.message)
})
}

function insertGenresToMoviesByYear(year) {
return getMoviesByYear(year).then(data => {
    return data.map(movie => ({
        ...movie,
        release_date: movie.release_date.split('-')[0],
        genres: movie.genre_ids
        .map(id => genresList.filter(el => el.id === id))
        .flat(),
    }))
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
        markupMovieList(res);
}).catch(error => {
    console.log(error.message)
})
}




