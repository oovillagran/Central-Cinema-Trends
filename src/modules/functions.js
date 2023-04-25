let page = 1;

const loadMovies = () => new Promise((resolve, reject) => {
  fetch(`https://api.themoviedb.org/3/movie/popular?api_key=f1d1819ff16bbb7177fc5279dc3acaef&page=${page}`)
    .then((response) => {
    // if response is ok
      if (response.status === 200) {
        return response.json();
      }
    })
    .then((data) => {
      let movies = '';
      data.results.forEach((movie) => {
        movies += `
          <div class="movie">
            <img class="poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">    
            <h4 class="title">${movie.title}</h4>
          </div>
        `;
      });
      document.getElementById('movies-page').innerHTML = movies;
      resolve();
    })
    .catch((error) => {
      reject(error);
    });
});

const previousButton = document.getElementById('previous');
const nextButton = document.getElementById('next');

nextButton.addEventListener('click', () => {
  if (page < 3) {
    page += 1;
    loadMovies();
  }
});

previousButton.addEventListener('click', () => {
  if (page > 1) {
    page -= 1;
    loadMovies();
  }
});

export default loadMovies;
