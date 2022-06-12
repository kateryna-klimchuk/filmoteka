import { genres } from "./partials/movieGenre";

import axios from 'axios';

const galleryEl = document.querySelector('.gallery');
const formBtnEl = document.querySelector('.header-btn');
const inputEl = document.querySelector('input');
const modalWindowEl = document.querySelector('.backdrop');


// closeModalBtn.addEventListener('click', onCloseModal);

console.log(inputEl.value);



const API_KEY = '532c56a8c591a340308597d9f66fd331';

const BASE_URL = 'https://api.themoviedb.org/3/movie/550?api_key=532c56a8c591a340308597d9f66fd331';

let inputText = '';
formBtnEl.addEventListener('click', onFormBtnClick);
inputEl.addEventListener('input', onInputType)

function onInputType(event) {
    inputText = event.currentTarget.value;
    console.log(inputText);

}

function onFormBtnClick(event) {
    event.preventDefault();
    clearGallery();
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${inputText}`).then((response) => {
        return response.json();
    })
        .then(({ results }) => {
console.log(results);

            const film = results.map(({ title, poster_path, overview, release_date, genre_ids }) => {
            const dateOf = release_date.slice(0, 4);
            const genreName = [];
            for (const el of genres) {
                for (const gen of genre_ids) {
                    if (el.id === gen) {
                        genreName.push(el.name)
                    }
                }
            }
            return `<div class="gallery-item">
        <a class="gallery-link" href=""><img class="gallery-img" src="https://image.tmdb.org/t/p/w300${poster_path}" alt="${title}" /></a>
        <div class="gallery-info">
            <p class="gallery-name">${title}</p>
            <p class="gallery-about">${genreName} | ${dateOf}</p>
        </div>
    </div>`}).join('');

            return galleryEl.insertAdjacentHTML('beforeend', film)
        });
    
}


startPageWithTrendingMovies();



function startPageWithTrendingMovies() {
    fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`).then((res) => {
        return res.json()
    }).then(({ results } ) => {
// console.log(results);
        const film = results.map(({ title, poster_path, overview, release_date, genre_ids, vote_average, vote_count, popularity, id }) => {
            const releaseYear = release_date.slice(0, 4);

            const genresList = getMovieGenre(...genre_ids);
            
            return `<div class="gallery-item">
        <a class="gallery-link" href=""><img class="gallery-img" src="https://image.tmdb.org/t/p/w300${poster_path}" alt="${title}" id="${id}"/></a>
        <div class="gallery-info">
            <p class="gallery-name">${title}</p>
            <p class="gallery-about">${genresList} | ${releaseYear}</p>
        </div>
    </div>`}).join('');

        return galleryEl.insertAdjacentHTML('beforeend', film)
    })
}

function clearGallery() {
    galleryEl.innerHTML = '';
}

function clearModal() {
    modalWindowEl.innerHTML = '';
}


galleryEl.addEventListener('click', onFilmClick);

function onFilmClick(event) {
    event.preventDefault();
    clearModal();
    const item = event.target;
    if (item.nodeName !== 'IMG') {
        return;
    }
    console.log(item.id);

    onCloseModal()

    fetch(`https://api.themoviedb.org/3/movie/${item.id}?api_key=${API_KEY}&language=en-US`)
        .then(res => res.json()).then(({ id, original_title, poster_path, backdrop_path, overview, release_date, genre_ids, vote_average, vote_count, popularity }) => {
            console.log(original_title);
            
            const modalWindow = `<div class="modal-window">
        <div class="modal-img">
            <img class="modal-img" id=${id} src="https://image.tmdb.org/t/p/w500${poster_path}" alt=${original_title} width="370" height="470">
        </div>
        <div class="film-info">
        <button type="button" class="cross">+</button>

            <h2 class="film-name">${original_title}</h2>
            <div class="film-stats">
            <ul class="film-stats__list">
                <li class="film-stats__item">Vote / Votes</li>
                <li class="film-stats__item">Popularity</li>
                <li class="film-stats__item">Original Title</li>
                <li class="film-stats__item">Genre</li>
            </ul>
            <ul class="film-stats__list">
                <li class="film-stats__item">${vote_average}, ${vote_count}</li>
                <li class="film-stats__item">${popularity}</li>
                <li class="film-stats__item">${original_title}</li>
                <li class="film-stats__item">${genre_ids}</li>
            </ul>
            </div>
            <h3>About</h3>
            <p class="film-description">${overview}</p>
            <div class="modal-btn-wrap">
                <button type="button" class="modal-btn modal-btn--active">ADD TO WATCHED</button>
                <button type="button" class="modal-btn">ADD TO QUEUE</button>
            </div>
            
        </div>
    </div>`;

        return modalWindowEl.insertAdjacentHTML('beforeend', modalWindow);

    })
}

modalWindowEl.addEventListener('click', (e) => {
    console.log(e.target.nodeName);
    if (e.target.nodeName !== 'BUTTON') {
        return;
    }
    modalWindowEl.classList.toggle('visually-hidden')

})

function onCloseModal() {
    console.log('e');
    modalWindowEl.classList.toggle('visually-hidden')
}

function getMovieGenre(...num) {
    let genreName = [];

    // const datOfGenre = await genresFetch();

    // console.log(datOfGenre);
    // console.log(genres);

    for (const el of genres) {
                for (const gen of num) {
                    if (el.id === gen) {
                        genreName.push(el.name);   
                    }
                }
            }
            let genreAfterSlice = []
            genreAfterSlice = genreName.slice(0, 2);
            if (genreName.length > 2) {
                genreAfterSlice.push('other')
    }
    return genreAfterSlice;
}


async function genresFetch() {
    try {
        const {data} = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`)
        const filmGenres = data.genres;
        console.log(filmGenres);
        return filmGenres;
    } catch (error) {
        console.error(error);
    }
}

