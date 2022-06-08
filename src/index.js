import { genres } from "./partials/movieGenre";

const galleryEl = document.querySelector('.gallery');
const formBtnEl = document.querySelector('.header-btn');
const inputEl = document.querySelector('input')
console.log(inputEl.value);



const API_KEY = '532c56a8c591a340308597d9f66fd331';

const BASE_URL = 'https://api.themoviedb.org/3/movie/550?api_key=532c56a8c591a340308597d9f66fd331';

let inputText = '';
formBtnEl.addEventListener('click', onFormBtnClick);
inputEl.addEventListener('input', onInputType)

function onInputType(event) {
    inputText = inputEl.value;
    console.log(inputText);
    // const inputText = event.currentTarget.searchQuery.value.trim();
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
    })
}

function clearGallery() {
    galleryEl.innerHTML = '';
}