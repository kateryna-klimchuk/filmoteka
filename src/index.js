import { getMovieGenre } from "./partials/movieGenre";
import { genres } from "./partials/movieGenre";

import axios from 'axios';

const API_KEY = '532c56a8c591a340308597d9f66fd331';


const galleryEl = document.querySelector('.gallery');
const formBtnEl = document.querySelector('.header-btn');
const inputEl = document.querySelector('input');
const modalWindowEl = document.querySelector('.backdrop');

const searchGenreEl = document.querySelector('#genres');
const searchYearEl = document.querySelector('#years');
const searchPopularityEl = document.querySelector('#popularity');


searchPopularityEl.addEventListener('click', (event) => {
    event.preventDefault();
    const searchPopularity = searchPopularityEl.value;

    if (searchPopularity !== 'option') {
        clearGallery();

        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=${searchPopularity}.desc`).then((response) => {
            return response.json();
        })
            .then(({ results }) => {

                const film = results.map(({ id, title, poster_path, popularity, release_date, genre_ids, vote_average, vote_count }) => {
                    const dateOf = release_date.slice(0, 4);
                
                    const genresList = getMovieGenre(...genre_ids);

                    return `<li class="gallery-item">
        <div class="gallery-poster" href=""><img class="gallery-img" src="https://image.tmdb.org/t/p/w300${poster_path}" alt="${title}" id="${id}"/>
        </div>
        <div class="gallery-info">
            <p class="gallery-name">${title}</p>
            <p class="gallery-about">${genresList} | ${dateOf}</p>
        </div>
    </li>`}).join('');

                return galleryEl.insertAdjacentHTML('beforeend', film)
            });
    }
    
})



searchYearEl.addEventListener('click', (event) => {
    event.preventDefault();
    const searchYear = searchYearEl.value;

    if (searchYearEl.value !== 'year') {
        clearGallery();

        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=${searchYear}-01-01&primary_release_date.lte=${searchYear}-12-31`).then((response) => {
            return response.json();
        })
            .then(({ results }) => {

                console.log(results);

                const film = results.map(({ id, title, poster_path, overview, release_date, genre_ids }) => {
                    const dateOf = release_date.slice(0, 4);
                
                    const genresList = getMovieGenre(...genre_ids);

                    const genreName = [];
                    for (const el of genresList) {
                        for (const gen of genre_ids) {
                            if (el.id === gen) {
                                genreName.push(el.name)
                            }
                        }
                    }
                    return `<li class="gallery-item">
        <div class="gallery-poster" href=""><img class="gallery-img" src="https://image.tmdb.org/t/p/w300${poster_path}" alt="${title}" id="${id}"/>
        </div>
        <div class="gallery-info">
            <p class="gallery-name">${title}</p>
            <p class="gallery-about">${genresList} | ${dateOf}</p>
        </div>
    </li>`}).join('');

                return galleryEl.insertAdjacentHTML('beforeend', film)
            });
    }
    
})


searchGenreEl.addEventListener('click', (event) => {
    event.preventDefault();
    const searchGenre = searchGenreEl.value;
    let genreId;

    if (searchGenreEl.value !== 'genres') {
        console.log(searchGenre);
        console.log(genres);
        for (const el of genres) {

            if (el.name === searchGenre) {
                console.log(el.id);
                genreId = el.id;

            }
        }

        clearGallery();

        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&include_adult=false&include_video=false&page=1&with_genres=${genreId}`).then((response) => {
            return response.json();
        })
            .then(({ results }) => {

                console.log(results);

                const film = results.map(({ id, title, poster_path, overview, release_date, genre_ids }) => {
                    const dateOf = release_date.slice(0, 4);
                
                    const genresList = getMovieGenre(...genre_ids);

                    const genreName = [];
                    for (const el of genresList) {
                        for (const gen of genre_ids) {
                            if (el.id === gen) {
                                genreName.push(el.name)
                            }
                        }
                    }
                    return `<li class="gallery-item">
        <div class="gallery-poster" href=""><img class="gallery-img" src="https://image.tmdb.org/t/p/w300${poster_path}" alt="${title}" id="${id}"/>
        </div>
        <div class="gallery-info">
            <p class="gallery-name">${title}</p>
            <p class="gallery-about">${genresList} | ${dateOf}</p>
        </div>
    </li>`}).join('');

                return galleryEl.insertAdjacentHTML('beforeend', film)
            });
    }
    
})




const BASE_URL = 'https://api.themoviedb.org/3/movie/550?api_key=532c56a8c591a340308597d9f66fd331';

let inputText = '';
formBtnEl.addEventListener('click', onFormBtnClick);
inputEl.addEventListener('input', onInputType)

function onInputType(event) {
    inputText = event.currentTarget.value;

}

function onFormBtnClick(event) {
    event.preventDefault();
    clearGallery();
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${inputText}`).then((response) => {
        return response.json();
    })
        .then(({ results }) => {

            const film = results.map(({ title, poster_path, overview, release_date, genre_ids }) => {
                const dateOf = release_date.slice(0, 4);
                
                const genresList = getMovieGenre(...genre_ids);

            const genreName = [];
            for (const el of genresList) {
                for (const gen of genre_ids) {
                    if (el.id === gen) {
                        genreName.push(el.name)
                    }
                }
            }
            return `<li class="gallery-item">
        <div class="gallery-poster" href=""><img class="gallery-img" src="https://image.tmdb.org/t/p/w300${poster_path}" alt="${title}" id="${id}"/>
        </div>
        <div class="gallery-info">
            <p class="gallery-name">${title}</p>
            <p class="gallery-about">${genresList} | ${dateOf}</p>
        </div>
    </li>`}).join('');

            return galleryEl.insertAdjacentHTML('beforeend', film)
        });
    
}


startPageWithTrendingMovies();



function startPageWithTrendingMovies() {
    fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`).then((res) => {
        return res.json()
    }).then(({ results }) => {
        
        const film = results.map(({ title, poster_path, overview, release_date, genre_ids, vote_average, vote_count, popularity, id }) => {
            const releaseYear = release_date.slice(0, 4);

            const genresList = getMovieGenre(...genre_ids);
            
            return `<li class="gallery-item">
        <div class="gallery-poster" href=""><img class="gallery-img" src="https://image.tmdb.org/t/p/w300${poster_path}" alt="${title}" id="${id}"/>
        </div>
        <div class="gallery-info">
            <p class="gallery-name">${title}</p>
            <p class="gallery-about">${genresList} | ${releaseYear}</p>
        </div>
    </li>`}).join('');

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

