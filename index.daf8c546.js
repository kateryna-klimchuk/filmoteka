var galleryEl=document.querySelector(".gallery"),formBtnEl=document.querySelector(".header-btn"),inputEl=document.querySelector("input");console.log(inputEl.value);var genres=[],API_KEY="532c56a8c591a340308597d9f66fd331",BASE_URL="https://api.themoviedb.org/3/movie/550?api_key=532c56a8c591a340308597d9f66fd331",inputText="";function onInputType(e){inputText=inputEl.value}function onFormBtnClick(e){e.preventDefault(),fetch("https://api.themoviedb.org/3/trending/movie/day?api_key=".concat(API_KEY)).then((function(e){return e.json()})).then((function(e){var n=e.results;console.log(n);var t=n.map((function(e){var n=e.title,t=e.backdrop_path,a=(e.overview,e.release_date),r=e.genre_ids;return'<div class="gallery-item">\n        <img class="gallery-img" src='.concat(t,' alt="').concat(n,'">\n        <div class="gallery-info">\n            <p class="gallery-name">').concat(n,'</p>\n            <p class="gallery-about">').concat(a,", ").concat(r,"</p>\n        </div>\n    </div>")})).join("");return console.log(t),galleryEl.insertAdjacentHTML("beforeend",t)}))}function startPageWithTrendingMovies(){fetch("https://api.themoviedb.org/3/trending/movie/day?api_key=".concat(API_KEY)).then((function(e){return e.json()})).then((function(e){var n=e.results;console.log(n);var t=n.map((function(e){var n=e.title,t=e.poster_path,a=(e.overview,e.release_date),r=e.genre_ids,o=a.slice(0,4),i=searchGenresName(r);return'<div class="gallery-item">\n        <img class="gallery-img" src="https://image.tmdb.org/t/p/w300'.concat(t,'" alt="').concat(n,'" />\n        <div class="gallery-info">\n            <p class="gallery-name">').concat(n,'</p>\n            <p class="gallery-about">').concat(o,", ").concat(i,"</p>\n        </div>\n    </div>")})).join("");return galleryEl.insertAdjacentHTML("beforeend",t)}))}function searchGenresName(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=".concat(API_KEY,"&language=en-US")).then((function(e){return e.json()})).then((function(e){e.genres.forEach((function(e){for(var t=0;t<n.length;t++){var a=n[t];if(e.id===a){genres.push(e.name);var r=genres.filter((function(e,n,t){return t.indexOf(e)===n}));console.log(r)}}}))}))}formBtnEl.addEventListener("click",onFormBtnClick),inputEl.addEventListener("input",onInputType),startPageWithTrendingMovies(),console.log(searchGenresName(35,18));
//# sourceMappingURL=index.daf8c546.js.map
