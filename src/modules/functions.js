import { displayMovieDetails } from './displayMovies.js';
import countLikes from './countLikes.js';
import updateLikesCount from './updateLikesCount.js';
import countElementsOnPage from './countElements.js';

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
        const likeButton = `<i class="bi bi-heart-fill like" data-movie-id="${movie.id}"></i>`;
        const likeCount = `<span class="count-likes" data-movie-id="${movie.id}">(0)</span>`;
        movies += `
          <div class="movie">
            <img class="poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">    
            <h6 class="title">${movie.title}</h6>
            <div class="flex-column">
              ${commentsButton}
              <div class="flex like-section">
                ${likeButton}
                ${likeCount}
              </div>
            </div>
          </div>
        `;
      });
      document.getElementById('movies-page').innerHTML = movies;
      const body = document.querySelector('.body');
      const commentsButtons = document.querySelectorAll('.comments-button');
      commentsButtons.forEach((button) => {
        button.addEventListener('click', () => {
          body.style.overflow = 'hidden';
          const { movieId } = button.dataset;
          displayMovieDetails(movieId);
        });
      });

      const likeButtons = document.querySelectorAll('.like');
      likeButtons.forEach((button) => {
        button.addEventListener('click', () => {
          const itemId = button.dataset.movieId;
          countLikes(itemId);
        });
      });

      updateLikesCount();
      countElementsOnPage();
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
