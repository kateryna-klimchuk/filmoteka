import movieList from '../handlebars/movie-item.hbs'
import {refs} from './refs'

export function markupMovieList(movies) {
    const markup = movieList(movies)
    refs.galleryEl.insertAdjacentHTML('beforeend', markup);
}