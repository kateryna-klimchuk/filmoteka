const e=[{id:28,name:"Action"},{id:12,name:"Adventure"},{id:16,name:"Animation"},{id:35,name:"Comedy"},{id:80,name:"Crime"},{id:99,name:"Documentary"},{id:18,name:"Drama"},{id:10751,name:"Family"},{id:14,name:"Fantasy"},{id:36,name:"History"},{id:27,name:"Horror"},{id:10402,name:"Music"},{id:9648,name:"Mystery"},{id:10749,name:"Romance"},{id:878,name:"Science Fiction"},{id:10770,name:"TV Movie"},{id:53,name:"Thriller"},{id:10752,name:"War"},{id:37,name:"Western"}],n=document.querySelector(".gallery"),a=document.querySelector(".header-btn"),t=document.querySelector("input");console.log(t.value);let i="";a.addEventListener("click",(function(a){a.preventDefault(),n.innerHTML="",fetch(`https://api.themoviedb.org/3/search/movie?api_key=532c56a8c591a340308597d9f66fd331&language=en-US&page=1&include_adult=false&query=${i}`).then((e=>e.json())).then((({results:a})=>{console.log(a);const t=a.map((({title:n,poster_path:a,overview:t,release_date:i,genre_ids:r})=>{const l=i.slice(0,4),s=[];for(const n of e)for(const e of r)n.id===e&&s.push(n.name);return`<div class="gallery-item">\n        <a class="gallery-link" href=""><img class="gallery-img" src="https://image.tmdb.org/t/p/w300${a}" alt="${n}" /></a>\n        <div class="gallery-info">\n            <p class="gallery-name">${n}</p>\n            <p class="gallery-about">${s} | ${l}</p>\n        </div>\n    </div>`})).join("");return n.insertAdjacentHTML("beforeend",t)}))})),t.addEventListener("input",(function(e){i=t.value,console.log(i)})),fetch("https://api.themoviedb.org/3/trending/movie/day?api_key=532c56a8c591a340308597d9f66fd331").then((e=>e.json())).then((({results:a})=>{const t=a.map((({title:n,poster_path:a,overview:t,release_date:i,genre_ids:r})=>{const l=i.slice(0,4),s=[];for(const n of e)for(const e of r)n.id===e&&s.push(n.name);return`<div class="gallery-item">\n        <a class="gallery-link" href=""><img class="gallery-img" src="https://image.tmdb.org/t/p/w300${a}" alt="${n}" /></a>\n        <div class="gallery-info">\n            <p class="gallery-name">${n}</p>\n            <p class="gallery-about">${s} | ${l}</p>\n        </div>\n    </div>`})).join("");return n.insertAdjacentHTML("beforeend",t)}));
//# sourceMappingURL=index.35983dee.js.map
