import { getTrendingMovies, getGenres } from './get-movies';
import {markupMovieList} from './markup-movie-list'

export function insertGenresToMovies() {
return getTrendingMovies().then(data => {
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