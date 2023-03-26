//API= "https://omdbapi.com/?apikey=d26d3960&s=fast"
const movieContainer = document.querySelector(".search__movies");
const inputVal = document.querySelector(".search--input");
const resultText = document.querySelector(".search-result");
function movieSearch () {
   const input = `${inputVal.value}`;
   resultText.innerHTML = input;
   movies(input);
    }
async function movies(input) {
     
    document.body.classList.add("movies__loading");
    const response = await fetch(`https://omdbapi.com/?apikey=d26d3960&s=${ input}`);
    document.body.classList.remove("movies__loading");
    const data = await response.json();
    console.log(data.Response)
    if (data.Response === 'True') {
        const movies = data.Search ;
  
        const moviesHTML = movies.map(movie => movieData(movie)).join("");
      
        movieContainer.innerHTML = moviesHTML;
    }
    else {
        movieContainer.innerHTML = movieFail ();
    }

}

movies('fast')

function movieData(movie) {
 return `<div class="search__movie">
 <figure class="movies__img--wrapper">
   <img
     src=${movie.Poster}
     class="movie__img"
   />
   <div class="movies__info">
                  <h3 class="movie--title arrow--title">SEE RESULTS</h3>
                  <h5 class="movie--subtitle arrow">&#10230;</h5>
                  
                </div>
 </figure>
 <div class="search__movie--info">
     <span class="search__movie--subtitle">${movie.Type}</span>
   <h3 class="search__movie--title">${movie.Title}</h3>
   <p>${movie.Year}</p>
 </div>
</div>`
}

function movieFail () {
    return `<div class="search__fail">
    <figure class="Search-fail__img--wrapper">
      <img
        src="./assets/undraw_set_preferences_kwia.svg"
        class="search-fail__img"
      />
    </figure>
    <div class="search__fail--info">
      <h3 class="search__fail--title">No Result Found!</h3>
      <p>Please Try Again </p>
    </div>
   </div>`
}

