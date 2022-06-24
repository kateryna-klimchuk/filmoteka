export const refs = {
galleryEl: document.querySelector('.gallery'),
formBtnEl: document.querySelector('.header-btn'),
inputEl: document.querySelector('input'),
modalWindowEl: document.querySelector('.backdrop'),
formEl: document.querySelector('.genre-search'),
searchGenreEl: document.querySelector('#genres'),
searchBtnOpen: document.querySelector('.search-btn--open'),
searchBtnClose: document.querySelector('.search-btn--close'),

searchBackdrop: document.querySelector('.search-form__wrap'),

}
// =====serch-movies=======
//   localStorage.setItem(SEARCH_TYPE, "bySearch");
// ===========================


//============== insert movies

// const currentLocal = localStorage.getItem(SEARCH_TYPE)

//   if (currentLocal === 'bySearch') {
//     createSearchFetch(query, page)
//       .then(res => {

//         renderMoviesList(res); // how it renders HTML inside DOM?
//         stopLoader();
//       })
//   } else if (currentLocal === 'byYear') {
//     insertGenresToMoviesByYear(query, page)
//       .then(res => {

//         renderMoviesList(res); // how it renders HTML inside DOM?
//         stopLoader();
//       })
//   } else if (currentLocal === 'byGenres') {
//     insertGenresToMoviesByGenres(query, page)
//       .then(res => {

//         renderMoviesList(res); // how it renders HTML inside DOM?
//         stopLoader();
//       })
//   }
// ===============================

// export const SEARCH_TYPE = 'current-search-fetch';
//         localStorage.setItem(SEARCH_TYPE, "byYear");
//                     localStorage.setItem(SEARCH_TYPE, "byGenres");



//                     async function getMoviesByGenres(genreId, page = 1) {
//     const url = `${BASE_URL}api_key=${API_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}&with_genres=${genreId}`;
//     const response = await axios.get(url);
//     return response.data;
// };

// async function getMoviesByYear(year, page = 1) {
//     const url = `${BASE_URL}api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&primary_release_date.gte=${year}-01-01&primary_release_date.lte=${year}-12-31`;
//     const response = await axios.get(url);
//     return response.data;
// }

// async function getMoviesByPopularity( page = 1) {
//     const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&include_adult=false&page=${page}`;
//     const response = await axios.get(url);
//     return response.data;
// }


// export async function insertGenresToMoviesByPopularity(page) {
//     try {
//         const fetchTrendMovie = await getMoviesByPopularity(page);
//         const genresList = await getGenres(langCurrent());
//         renderButtons(fetchTrendMovie.page, 500, query); //// для Вадима ;) // paginationFunction(currentPage, totalPages, searchQuery)

//         const fetchRes = fetchTrendMovie.results.map(movie => ({
//             ...movie,
//             release_date: movie.release_date.split('-')[0],
//             genres: movie.genre_ids
//                 .map(id => genresList.genres.filter(el => el.id === id))
//                 .flat(),
//         }));
//         markupMoviesByPopularity(fetchRes);
//     }
//     catch (error) {
//         console.log(error.message);
// }
// }

// function markupMoviesByPopularity(res) {
//         res.map(element => {
//             if (element.genres.length > 2) {
//                 const Obj = { name: "Other" };
//                 element.genres[2] = Obj;
//                 element.genres.length = 3
//             }
//         })
//         return renderMoviesList(res);
//     }


// export async function insertGenresToMoviesByGenres(id, page) {
//     try {
//         const fetchedGenres = await getMoviesByGenres(id, page);
//     clearGallery();
//     const genresList = await getGenres(langCurrent());
//     renderButtons(fetchedGenres.page, 500, id); //// для Вадима ;) // paginationFunction(currentPage, totalPages, searchQuery)
//     const fetchRes = fetchedGenres.results.map(movie => ({
//         ...movie,
//         release_date: movie.release_date.split('-')[0],
//         genres: movie.genre_ids
//             .map(id_1 => genresList.genres.filter(el => el.id === id_1))
//             .flat(),
//     }));
//     markupMoviesByGenres(fetchRes);
//     }
//     catch (error) {
//         console.log(error);
//     }
// }

// function markupMoviesByGenres(id) {
//         id.map(element => {
//     if (element.genres.length > 2) {
//         const Obj = {name: "Other"};
//         element.genres[2] = Obj;
//         element.genres.length = 3
//     }
//     })
//         return renderMoviesList(id);
// }


// export async function insertGenresToMoviesByYear(year, page) {
//     try {
//         const fetchedYear = await getMoviesByYear(year, page);
//         clearGallery();
//         const genresList = await getGenres(langCurrent());
//         renderButtons(fetchedYear.page, 500, year); //// для Вадима ;) // paginationFunction(currentPage, totalPages, searchQuery)
//         const fetchRes = fetchedYear.results.map(movie => ({
//             ...movie,
//             release_date: movie.release_date.split('-')[0],
//             genres: movie.genre_ids
//                 .map(id => genresList.genres.filter(el => el.id === id))
//                 .flat(),
//         }));
//         markupMoviesByYear(fetchRes);
//     }
//     catch (error) {
//         console.log(error);
//     }
// }

// function markupMoviesByYear(year) {
//     year.map(element => {
//     if (element.genres.length > 2) {
//         const Obj = {name: "Other"};
//         element.genres[2] = Obj;
//         element.genres.length = 3
//     }
//     })
//         renderMoviesList(year);
// };
