import { addComment } from './addComment.js';
import { showComments } from './showComments.js';
import { updateCommentCount } from './updateCommentCount.js';

export const displayMovieDetails = (movieId) => {
  const appId = 'QQjOshxTvisitjLIZJus';
  const itemId = movieId;
  const overlay = document.createElement('div');
  overlay.classList.add('popup-overlay');
  document.body.appendChild(overlay);
  fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=f1d1819ff16bbb7177fc5279dc3acaef`)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      throw new Error('Movie details not found.');
    })
    .then((data) => {
      const popup = `
          <div class="popup">
            <button class="close-button">X</button>
            <h2>${data.title}</h2>
            <img src="https://image.tmdb.org/t/p/w500/${data.poster_path}">
            <p>${data.overview}</p>
            <p>Release date: ${data.release_date}</p>
            <div class="comments-section">
              <h3 class="comments_header">Comments:</h3>
              <ul class="comments-list"></ul>
              <h3>Comments <span class="comment-count">(0)</span>:</h3>
              <form class="comment-form">
                <input type="text" id="username-input" name="username" placeholder="Your name">
                <textarea id="comment-input" name="comment" placeholder="Your insights"></textarea>
                <button type="submit">Comment</button>
              </form>
            </div>
          </div>
        `;
      document.body.insertAdjacentHTML('beforeend', popup);
      const commentCountElement = document.querySelector('.popup .comment-count');
      const closeButton = document.querySelector('.popup .close-button');
      closeButton.addEventListener('click', () => {
        overlay.remove();
        document.querySelector('.popup').remove();
      });
      updateCommentCount(appId, movieId);
      const addButton = document.querySelector('.comment-form button[type="submit"]');
      addButton.addEventListener('click', (event) => {
        event.preventDefault();
        const usernameInput = document.querySelector('#username-input');
        const commentInput = document.querySelector('#comment-input');
        const username = usernameInput.value.trim();
        const comment = commentInput.value.trim();
        const date = new Date();
        const currentDay = String(date.getDate()).padStart(2, '0');
        const currentMonth = String(date.getMonth() + 1).padStart(2, '0');
        const currentYear = date.getFullYear();
        const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;

        if (username && comment) {
          addComment(appId, itemId, username, comment);
          const commentsList = document.querySelector('.comments-list');
          const commentItem = `<li><small>${currentDate} - ${username}:</small> <strong>${comment}</strong></li>`;
          commentsList.insertAdjacentHTML('beforeend', commentItem);
          usernameInput.value = '';
          commentInput.value = '';
        }
      });
      showComments(appId, data.id);
    })
    .catch((error) => {
      console.error(error);
    });
};

export default displayMovieDetails;