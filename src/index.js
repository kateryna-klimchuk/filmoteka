import {getGenres, getMovieGenre, renderGenresList } from './js/genres';
import { markupPopularMovies } from './js/trending-movie'
import './js/keaword-search';
import './js/trending-movie';
import './js/search-form';
import './js/genres';


const API_KEY = '532c56a8c591a340308597d9f66fd331';


const galleryEl = document.querySelector('.gallery');
const modalWindowEl = document.querySelector('.backdrop');




// galleryEl.addEventListener('click', onFilmClick);

// function onFilmClick(event) {
//     event.preventDefault();
//     clearModal();
//     const item = event.target;
//     if (item.nodeName !== 'IMG') {
//         return;
//     }
//     console.log(item.id);

//     onCloseModal()

//     fetch(`https://api.themoviedb.org/3/movie/${item.id}?api_key=${API_KEY}&language=en-US`)
//         .then(res => res.json()).then(({ id, original_title, poster_path, backdrop_path, overview, release_date, genre_ids, vote_average, vote_count, popularity }) => {
//             console.log(original_title);
            
//             const modalWindow = `<div class="modal-window">
//         <div class="modal-img">
//             <img class="modal-img" id=${id} src="https://image.tmdb.org/t/p/w500${poster_path}" alt=${original_title} width="370" height="470">
//         </div>
//         <div class="film-info">
//         <button type="button" class="cross">+</button>

//             <h2 class="film-name">${original_title}</h2>
//             <div class="film-stats">
//             <ul class="film-stats__list">
//                 <li class="film-stats__item">Vote / Votes</li>
//                 <li class="film-stats__item">Popularity</li>
//                 <li class="film-stats__item">Original Title</li>
//                 <li class="film-stats__item">Genre</li>
//             </ul>
//             <ul class="film-stats__list">
//                 <li class="film-stats__item">${vote_average}, ${vote_count}</li>
//                 <li class="film-stats__item">${popularity}</li>
//                 <li class="film-stats__item">${original_title}</li>
//                 <li class="film-stats__item">${genre_ids}</li>
//             </ul>
//             </div>
//             <h3>About</h3>
//             <p class="film-description">${overview}</p>
//             <div class="modal-btn-wrap">
//                 <button type="button" class="modal-btn modal-btn--active">ADD TO WATCHED</button>
//                 <button type="button" class="modal-btn">ADD TO QUEUE</button>
//             </div>
            
//         </div>
//     </div>`;

//         return modalWindowEl.insertAdjacentHTML('beforeend', modalWindow);

//     })
// }

// modalWindowEl.addEventListener('click', (e) => {
//     console.log(e.target.nodeName);
//     if (e.target.nodeName !== 'BUTTON') {
//         return;
//     }
//     modalWindowEl.classList.toggle('visually-hidden')

// })

// function onCloseModal() {
//     console.log('e');
//     modalWindowEl.classList.toggle('visually-hidden')
// }



