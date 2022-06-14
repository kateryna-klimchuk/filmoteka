import axios from 'axios';


export const API_KEY = '532c56a8c591a340308597d9f66fd331';
const BASE_URL = "https://api.themoviedb.org/3";


export async function getGenres() {
    const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`;
    const response = await axios.get(url);
    return response.data;
};


const genres = [
{id: 28, name: "Action"},
{id: 12, name: "Adventure"},
{id: 16, name: "Animation"},
{id: 35, name: "Comedy"},
{id: 80, name: "Crime"},
{id: 99, name: "Documentary"},
{id: 18, name: "Drama"},
{id: 10751, name: "Family"},
{id: 14, name: "Fantasy"},
{id: 36, name: "History"},
{id: 27, name:  "Horror"},
{id: 10402, name: "Music"},
{id: 9648, name: "Mystery"},
{id: 10749, name: "Romance"},
{id: 878, name: "Science Fiction"},
{id: 10770, name: "TV Movie"},
{id: 53, name: "Thriller"},
{id: 10752, name: "War"},
{id: 37, name: "Western"},
]


export function getMovieGenre(...num) {
    let genreName = [];

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