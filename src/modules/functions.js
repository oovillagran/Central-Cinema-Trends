import { displayMovieDetails } from './displayMovies.js';

let page = 1;

const loadMovies = () => new Promise((resolve, reject) => {
  fetch(`https://api.themoviedb.org/3/movie/popular?api_key=f1d1819ff16bbb7177fc5279dc3acaef&page=${page}`)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return reject(new Error('Movie can\'t load.'));
    })
    .then((data) => {
      let movies = '';
      data.results.forEach((movie) => {
        const commentsButton = `<button class="comments-button" data-movie-id="${movie.id}">Comments</button>`;
        movies += `
          <div class="movie">
            <img class="poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">    
            <h4 class="title">${movie.title}</h4>
            ${commentsButton}
          </div>
        `;
      });
      document.getElementById('movies-page').innerHTML = movies;
      const commentsButtons = document.querySelectorAll('.comments-button');
      commentsButtons.forEach((button) => {
        button.addEventListener('click', () => {
          const { movieId } = button.dataset;
          displayMovieDetails(movieId);
        });
      });

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
