import { getGenres, getMoviesByName } from './get-movies';
import {refs} from './refs'
import {markupMovieList} from './markup-movie-list'

let inputText = '';

refs.formBtnEl.addEventListener('click', onFormBtnClick);
refs.inputEl.addEventListener('change', onInputType)


function onInputType(event) {
    inputText = event.currentTarget.value;
}


function clearGallery() {
    refs.galleryEl.innerHTML = '';
}

function insertGenresToMovies(keyword) {
    return getMoviesByName(keyword).then(data => {
    return getGenres().then(genresList => {
    return data.results.map(movie => ({
        ...movie,
        release_date: movie.release_date.split('-')[0],
        genres: movie.genre_ids
        .map(id => genresList.genres.filter(el => el.id === id))
        .flat(),
    }))
    })
})
}

function markupKeawordSearchMovies(keyword) {
    insertGenresToMovies(keyword).then(res => {
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
    markupKeawordSearchMovies(inputText)
}