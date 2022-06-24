import { getTrendingMovies } from './get-movies';
import {markupMovieList} from './markup-movie-list'
import { genres, getMovieGenre, renderGenresList } from './genres';
let genresList = genres;

export function insertGenresToMovies() {
return getTrendingMovies().then(data => {
    return data.results.map(movie => ({
        ...movie,
        release_date: movie.release_date.split('-')[0],
        genres: movie.genre_ids
        .map(id => genresList.filter(el => el.id === id))
        .flat(),
    }))
    })
}

export function markupPopularMovies() {
insertGenresToMovies().then(res => {
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

markupPopularMovies()